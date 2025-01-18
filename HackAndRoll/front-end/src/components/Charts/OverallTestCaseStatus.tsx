import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const testCaseStatusData = {
  statuses: [
    { name: 'Passed', value: 90, color: '#28a745' },    // Green for Passed
    //{ name: 'Pending', value: 15, color: '#ffc107' },   // Yellow for Pending
    { name: 'Failed', value: 10, color: '#dc3545' },    // Red for Failed
  ],
};

interface OverallTestCaseStatusState {
  series: number[];
}

const options: ApexOptions = {
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
  labels: testCaseStatusData.statuses.map(status => status.name),
  colors: testCaseStatusData.statuses.map(status => status.color),
  legend: {
    show: false, // Disable the built-in legend
  },
  tooltip: {
    enabled: true,
    shared: false,
    y: {
      formatter: (value: number, { seriesIndex }) => {
        const total = testCaseStatusData.statuses[seriesIndex].value;
        return `${total} cases (${value}%)`;
      },
    },
  },
  dataLabels: {
    enabled: false, // Disable data labels on the chart
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
  const [state] = useState<OverallTestCaseStatusState>({
    series: testCaseStatusData.statuses.map(status => status.value),
  });

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
      <ReactApexChart
        options={options}
        series={state.series}
        type="pie"
      />
      </div>

      {/* Custom Legend below the chart, centered */}
      <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 pb-2">
      {testCaseStatusData.statuses.map((status, index) => (
        <div
        key={index}
        className="flex items-center rounded-sm bg-slate-200 dark:bg-slate-700 py-1 px-3"
        >
        <span
          className="mr-2 block h-3 w-3 rounded-full"
          style={{ backgroundColor: status.color }}
        ></span>
        <p className="text-sm font-medium text-black dark:text-white">
          {status.name} [{status.value}%]
        </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default OverallTestCaseStatus;
