import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const testCaseStatusData = {
  statuses: [
    { name: 'Passed', value: 75, color: '#28a745' },    // Green for Passed
    { name: 'Pending', value: 15, color: '#ffc107' },   // Yellow for Pending
    { name: 'Failed', value: 10, color: '#dc3545' },    // Red for Failed
  ],
};

// Browser types as per your request
const browserTypes = [
  { name: 'Chromium', key: 'chromium' },
  { name: 'Google Chrome', key: 'chrome' },
  { name: 'Google Chrome Canary', key: 'chrome-canary' },
  { name: 'Microsoft Edge', key: 'edge' },
  { name: 'Mozilla Firefox', key: 'firefox' },
  { name: 'Opera', key: 'opera' },
  { name: 'Safari', key: 'safari' },
];

// Define a type for the browser data
type BrowserData = {
  [key in 'chromium' | 'chrome' | 'chrome-canary' | 'edge' | 'firefox' | 'opera' | 'safari']: number[];
};

// Sample data for each browser type
const browserData: BrowserData = {
  chromium: [60, 20, 20], // Passed, Pending, Failed
  chrome: [70, 15, 15],
  'chrome-canary': [80, 10, 10],
  edge: [50, 30, 20],
  firefox: [90, 5, 5],
  opera: [75, 20, 5],
  safari: [85, 10, 5],
};

interface OverallTestCaseStatusByBrowserTypesState {
  series: { name: string; data: number[] }[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
  },
  colors: testCaseStatusData.statuses.map(status => status.color),
  xaxis: {
    categories: browserTypes.map(browser => browser.name),
  },
  legend: {
    position: 'bottom',
    show: true,
  },
  tooltip: {
    y: {
      formatter: (value: number, { seriesIndex }) => {
        const total = testCaseStatusData.statuses[seriesIndex].value;
        return `${value}% (${total} cases)`;
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

const OverallTestCaseStatusByBrowserTypes: React.FC = () => {
  const [state] = useState<OverallTestCaseStatusByBrowserTypesState>({
    series: testCaseStatusData.statuses.map((status, index) => ({
      name: status.name,
      data: browserTypes.map(browser => browserData[browser.key as keyof BrowserData][index]),
    })),
  });

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 flex justify-between items-center">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Overall Test Case Status by Browser Types
        </h5>
      </div>

      {/* Bar chart at the top */}
      <div id="chartBrowserTypes" className="mx-auto">
        <ReactApexChart
          options={options}
          series={state.series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default OverallTestCaseStatusByBrowserTypes;
