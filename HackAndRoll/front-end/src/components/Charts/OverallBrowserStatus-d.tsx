import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BrowserTestData {
  passed: number;
  pending: number;
  failed: number;
}

type BrowserData = {
  [browser: string]: number[];
};

const OverallTestCaseStatusByBrowserTypes = () => {
  const [browserData, setBrowserData] = useState<BrowserData | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/statusbybrowser')
      .then((response) => response.json())
      .then((data: BrowserData) => {
        console.log('Fetched data:', data); // Ensure the data structure is correct
        setBrowserData(data); // Set the state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching test case status:', error);
      });
  }, []);

  if (!browserData) {
    return <div>Loading...</div>;
  }

  // Calculate total cases per browser
  const totalCasesPerBrowser = Object.keys(browserData).reduce((acc, browser) => {
    const [passed, pending, failed] = browserData[browser];
    acc[browser] = passed + pending + failed;
    return acc;
  }, {} as Record<string, number>);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
    },
    colors: ['#28a745', '#ffc107', '#dc3545'], // Colors for Passed, Pending, Failed
    xaxis: {
      categories: Object.keys(browserData), // Use browser names as categories
    },
    legend: {
      position: 'bottom',
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number, { seriesIndex, dataPointIndex }: { seriesIndex: number, dataPointIndex: number }) => {
          const browser = Object.keys(browserData)[dataPointIndex];
          const totalCases = totalCasesPerBrowser[browser];
          const percentage = ((value / totalCases) * 100).toFixed(2);
          return `${percentage}% (${value} cases)`;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 1,
      },
    },
  };

  const series = [
    {
      name: 'Passed',
      data: Object.values(browserData).map(browser => browser[0]), // First value is Passed
    },
    {
      name: 'Pending',
      data: Object.values(browserData).map(browser => browser[1]), // Second value is Pending
    },
    {
      name: 'Failed',
      data: Object.values(browserData).map(browser => browser[2]), // Third value is Failed
    },
  ];

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 flex justify-between items-center">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Overall Test Case Status by Browser Types
        </h5>
      </div>

      {/* Bar chart */}
      <div id="chartBrowserTypes" className="mx-auto">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default OverallTestCaseStatusByBrowserTypes;
