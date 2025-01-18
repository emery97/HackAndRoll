import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Define your initial chart options
const initialOptions: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'pie',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
      },
    },
  },
  labels: [], // Initially empty, will be updated with data
  colors: [], // Initially empty, will be updated with data
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    shared: false,
    y: {
      formatter: (value: number, { seriesIndex }) => {
        return `${value}%`; // Modify this as needed
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 250,
        },
      },
    },
  ],
};

const OverallTestCaseStatus: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>(initialOptions);
  const [series, setSeries] = useState<number[]>([]);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchTestCaseStatusData = async () => {
      try {
        const response = await fetch('http://localhost:3000/testcasestatus'); // Update with your backend API URL
        const data = await response.json();

        // Update chart labels and series
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          labels: data.map((status: { name: string }) => status.name),
          colors: data.map((status: { color: string }) => status.color),
        }));
        setSeries(data.map((status: { value: string }) => parseFloat(status.value)));
      } catch (error) {
        console.error('Error fetching test case status data:', error);
      }
    };

    fetchTestCaseStatusData();
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Overall Test Case Status
          </h5>
        </div>
      </div>

      {/* Chart at the top, centered */}
      <div id="overallTestCaseStatusChart" className="mx-auto mb-4 flex justify-center">
        <ReactApexChart options={chartOptions} series={series} type="pie" />
      </div>

      {/* Custom Legend below the chart, centered */}
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 pb-2">
        {chartOptions.labels?.map((label, index) => (
          <div
            key={index}
            className="flex items-center rounded-sm bg-slate-200 dark:bg-slate-700 py-1 px-3"
          >
            <span
              className="mr-2 block h-3 w-3 rounded-full"
              style={{ backgroundColor: chartOptions.colors?.[index] }}
            ></span>
            <p className="text-sm font-medium text-black dark:text-white">
              {label} [{series[index]}%]
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallTestCaseStatus;
