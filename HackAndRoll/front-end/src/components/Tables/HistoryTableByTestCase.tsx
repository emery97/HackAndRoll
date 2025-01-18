import React, { useState, useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import DropdownSortBy from '../Dropdowns/DropdownSortBy';

interface TestCase {
  id: number;
  name: string;
  browser: string;
  description: string;
  history: { dateTime: string; timeTaken: string; status: 'Passed' | 'Failed' | 'Pending'; }[];
  successRate?: number;
  passedTests?: number;
  failedTests?: number;
}

const testCases: TestCase[] = [
  {
    id: 1,
    name: "Login Test",
    description: "Tests user login functionality",
    browser: "Google Chrome",
    history: [
      { dateTime: "2024-10-30 10:00 AM", timeTaken: "12s", status: "Passed" },
      { dateTime: "2024-10-31 09:30 AM", timeTaken: "13s", status: "Failed" },
      { dateTime: "2024-10-31 10:15 AM", timeTaken: "11s", status: "Passed" }
    ],
  },
  {
    id: 2,
    name: "Password Reset",
    description: "Checks password reset flow",
    browser: "Mozilla Firefox",
    history: [
      { dateTime: "2024-10-30 10:20 AM", timeTaken: "10s", status: "Failed" },
      { dateTime: "2024-10-31 10:25 AM", timeTaken: "12s", status: "Passed" }
    ],
  },
  {
    id: 3,
    name: "Session Timeout",
    description: "Validates session timeout",
    browser: "Safari",
    history: [
      { dateTime: "2024-10-30 10:30 AM", timeTaken: "10s", status: "Failed" },
      { dateTime: "2024-10-31 10:35 AM", timeTaken: "11s", status: "Passed" }
    ],
  }
];

// Function to calculate success rate, passed, and failed tests for each test case
testCases.forEach(testCase => {
  const passedCount = testCase.history.filter(run => run.status === "Passed").length;
  const failedCount = testCase.history.filter(run => run.status === "Failed").length;
  const successRate = ((passedCount / testCase.history.length) * 100).toFixed(2);
  testCase.successRate = parseFloat(successRate);
  testCase.passedTests = passedCount;
  testCase.failedTests = failedCount;
});

const HistoryTableByTestCase = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<
  'id-asc' | 'id-desc' | 'dateTime-asc' | 'dateTime-desc' | 'passed-asc' | 'passed-desc' | 'status-passed' | 'status-failed'
  >('id-asc'); 
  const [browserFilter, setBrowserFilter] = useState<'Chromium' | 'Google Chrome' | 'Google Chrome Canary' | 'Microsoft Edge' | 'Mozilla Firefox' | 'Opera' | 'Safari'| 'All'>('All');

  const toggleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const showTooltip = (event: React.MouseEvent<HTMLElement>, content: string) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    setTooltipContent(content);
    setTooltipVisible(true);
    
    // Position the tooltip right above the text and centered horizontally
    setTooltipPosition({
      top: rect.top + window.scrollY - 25, 
      left: rect.left + window.scrollX + rect.width / 2 - 400, // Adjusted to center the tooltip
    });
  };
  
  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  const filteredTestCases = testCases.filter(testCase =>
    testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (browserFilter === 'All' || testCase.browser === browserFilter)
  );

  const sortedResults = useMemo(() => {
    const resultsCopy = [...filteredTestCases]; // Copy the array to avoid direct mutation
    switch (filter) {
      case 'id-asc':
        return resultsCopy.sort((a, b) => a.id - b.id);
      case 'id-desc':
        return resultsCopy.sort((a, b) => b.id - a.id);
      case 'passed-asc':
        return resultsCopy.sort((a, b) => {
          if (a.passedTests === b.passedTests) {
            return 0;
          }
          return (a.passedTests ?? 0) > (b.passedTests ?? 0) ? 1 : -1;
        });
      case 'passed-desc':
        return resultsCopy.sort((a, b) => {
          if (a.passedTests === b.passedTests) {
            return 0;
          }
          return (a.passedTests ?? 0) < (b.passedTests ?? 0) ? 1 : -1;
        });
      default:
        return resultsCopy;
    }
  }, [filter, filteredTestCases]);

  return (
    <div>
      <div className="flex justify-end items-center mb-5 gap-2">
        <div className="relative mr-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Test Cases..."
            className="border border-gray-400 rounded p-2 pl-10 pr-15 dark:bg-black dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownSortBy 
          value={filter}
          onChange={(value) => setFilter(value as 'id-asc' | 'id-desc' | 'dateTime-asc' | 'dateTime-desc' | 'status-passed' | 'status-failed' | 'passed-asc' | 'passed-desc')}
          options={[
            { label: 'ID (asc)', value: 'id-asc' },
            { label: 'ID (desc)', value: 'id-desc' },
            { label: 'Name (asc)', value: 'title-asc' },
            { label: 'Name (desc)', value: 'title-desc' },
            { label: 'Success Rate (asc)', value: 'successRate-asc' },
            { label: 'Success Rate (desc)', value: 'successRate-desc' },
            { label: 'Passed Tests (asc)', value: 'passed-asc' },
            { label: 'Passed Tests (desc)', value: 'passed-desc' },
            { label: 'Failed Tests (asc)', value: 'failed-asc' },
            { label: 'Failed Tests (desc)', value: 'failed-desc' },
          ]}
        />
        <DropdownSortBy 
          value={browserFilter}
          onChange={(value) => setBrowserFilter(value as 'Chromium' | 'Google Chrome' | 'Google Chrome Canary' | 'Microsoft Edge' | 'Mozilla Firefox' | 'Opera' | 'Safari' | 'All')}
          options={[
            { label: 'All Browsers', value: 'All' },
            { label: 'Chromium', value: 'Chromium' },
            { label: 'Google Chrome', value: 'Google Chrome' },
            { label: 'Google Chrome Canary', value: 'Google Chrome Canary' },
            { label: 'Microsoft Edge', value: 'Microsoft Edge' },
            { label: 'Mozilla Firefox', value: 'Mozilla Firefox' },
            { label: 'Opera', value: 'Opera' },
            { label: 'Safari', value: 'Safari' },
          ]}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">ID</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Name</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Browser</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Description</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Passed Tests</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Failed Tests</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Success Rate</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">See More</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result) => (
            <React.Fragment key={result.id}>
              <tr
                className="border-b border-stroke dark:border-strokedark hover:bg-gray-2 dark:hover:bg-meta-4"
              >
                <td className="py-4 px-4 text-black dark:text-white">{result.id}</td>
                <td className="py-4 px-4 text-black dark:text-white">{result.name}</td>
                <td className="py-4 px-4 text-black dark:text-white">{result.browser}</td>
                <td
                  className="border-b border-[#eee] py-5 px-4 dark:border-strokedark cursor-pointer"
                  onMouseEnter={(e) => showTooltip(e, result.description)}
                  onMouseLeave={hideTooltip}
                >
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {result.description.length > 50
                      ? `${result.description.substring(0, 50)}...`
                      : result.description}
                  </div>
                </td>
                <td className="py-4 px-4 text-black dark:text-white">{result.passedTests}</td>
                <td className="py-4 px-4 text-black dark:text-white">{result.failedTests}</td>
                <td className="py-4 px-4 text-black dark:text-white">{result.successRate}%</td>
                <td className="py-4 px-4 text-black dark:text-white">
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => toggleDropdown(result.id)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <FaChevronDown />
                    </button>
                  </div>
                </td>
              </tr>

              {openDropdown === result.id && (
                <tr>
                  <td colSpan={8} className="py-2 px-4 w-full"> 
                    <div className="text-sm text-gray-600">
                      <h3 className="font-semibold">Failed Test Cases</h3>
                      <table className="mt-2 w-full table-auto">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-meta-4">
                            <th className="py-2 px-4 text-left text-black dark:text-white">Date/Time</th>
                            <th className="py-2 px-4 text-left text-black dark:text-white">Time Taken (s)</th>
                            <th className="py-2 px-4 text-left text-black dark:text-white">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.history
                            .map((testCase) => (
                              <tr key={testCase.dateTime}>
                                <td className="py-2 px-4 dark:text-white">{testCase.dateTime}</td>
                                <td className="py-2 px-4 dark:text-white">{testCase.timeTaken}</td>
                                <td className="py-4 px-4">
                                  <div
                                    className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                                      testCase.status === 'Passed'
                                        ? 'bg-green-200 text-green-600'
                                        : 'bg-red-200 text-red-600'
                                    }`}
                                  >
                                    {testCase.status}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>

       {/* Tooltip */}
       {tooltipVisible && tooltipContent && (
        <div
          className="absolute bg-black text-white text-sm rounded p-2 dark:bg-slate-500 dark:border-strokedark"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default HistoryTableByTestCase;
