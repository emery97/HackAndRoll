import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown} from 'react-icons/fa';
import DropdownSortBy from '../Dropdowns/DropdownSortBy';

interface TestCaseResult {
  id: number;
  browser: string;
  timeTaken: string;
  name: string;
  description: string;
  status: 'Passed' | 'Failed' | 'Pending';
}

interface ApplicationResult {
  id: number;
  title: string;
  dateTime: string;
  status: 'Passed' | 'Failed' | 'Pending';
  testCases: TestCaseResult[];
}

const applicationResults: ApplicationResult[] = [
  {
    id: 1,
    title: "User Authentication",
    dateTime: "2024-10-30 10:00 AM",
    status: "Failed",
    testCases: [
      { id: 101, browser: "Chrome", timeTaken: "12s", name: "Login Test", description: "Tests user login functionality", status: "Passed" },
      { id: 102, browser: "Firefox", timeTaken: "15s", name: "Password Reset", description: "Checks password reset flow", status: "Failed" },
      { id: 103, browser: "Safari", timeTaken: "10s", name: "Session Timeout", description: "Validates session timeout", status: "Failed" },
    ],
  },
  {
    id: 2,
    title: "Payment Processing",
    dateTime: "2024-10-29 02:30 PM",
    status: "Passed",
    testCases: [
      { id: 201, browser: "Chrome", timeTaken: "30s", name: "Card Payment", description: "Tests credit card payment", status: "Passed" },
      { id: 202, browser: "Edge", timeTaken: "25s", name: "Wallet Payment", description: "Validates wallet integration", status: "Passed" },
      { id: 203, browser: "Firefox", timeTaken: "28s", name: "Refund Process", description: "Tests refund process", status: "Passed" },
    ],
  },
  {
    id: 3,
    title: "Profile Management",
    dateTime: "2024-10-28 09:00 AM",
    status: "Pending",
    testCases: [
      { id: 301, browser: "Safari", timeTaken: "18s", name: "Edit Profile", description: "Validates profile editing", status: "Pending" },
      { id: 302, browser: "Chrome", timeTaken: "22s", name: "Profile Picture Upload", description: "Tests image upload", status: "Pending" },
    ],
  },
  {
    id: 4,
    title: "Order History",
    dateTime: "2024-10-27 11:45 AM",
    status: "Failed",
    testCases: [
      { id: 401, browser: "Chrome", timeTaken: "14s", name: "View Orders", description: "Tests order history page", status: "Failed" },
      { id: 402, browser: "Firefox", timeTaken: "16s", name: "Order Filters", description: "Validates filters on orders", status: "Passed" },
    ],
  },
  {
    id: 5,
    title: "Notification System",
    dateTime: "2024-10-26 03:00 PM",
    status: "Passed",
    testCases: [
      { id: 501, browser: "Edge", timeTaken: "9s", name: "Email Notification", description: "Tests email notifications", status: "Passed" },
      { id: 502, browser: "Safari", timeTaken: "12s", name: "SMS Notification", description: "Tests SMS sending functionality", status: "Passed" },
      { id: 503, browser: "Chrome", timeTaken: "11s", name: "Push Notification", description: "Tests push notifications", status: "Passed" },
    ],
  },
];

const HistoryTableByApplication = () => {
  const applicationTitle = "XYZ Bank";
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);
  const [filter, setFilter] = useState<
  'id-asc' | 'id-desc' | 'dateTime-asc' | 'dateTime-desc' | 'status-passed' | 'status-failed' | 'passed-asc' | 'passed-desc'
  >('id-asc');  
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const navigate = useNavigate();

  const toggleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const getPassFailCounts = (testCases: TestCaseResult[]) => {
    const passed = testCases.filter((testCase) => testCase.status === 'Passed').length;
    const failed = testCases.filter((testCase) => testCase.status === 'Failed').length;
    return { passed, failed };
  };

  const goToDashboard = (applicationName: string, id: number) => {
    navigate(`/dashboards/${applicationName}/${id}`);
  };

  const sortedResults = useMemo(() => {
    const resultsCopy = [...applicationResults]; // Copy the array to avoid direct mutation
    switch (filter) {
      case 'id-asc':
        return resultsCopy.sort((a, b) => a.id - b.id);
      case 'id-desc':
        return resultsCopy.sort((a, b) => b.id - a.id);
      case 'dateTime-asc':
        return resultsCopy.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      case 'dateTime-desc':
        return resultsCopy.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
      case 'passed-asc':
        return resultsCopy.sort((a, b) => {
          const aFailed = a.testCases.filter((testCase) => testCase.status === 'Failed').length;
          const bFailed = b.testCases.filter((testCase) => testCase.status === 'Failed').length;
          return bFailed - aFailed;
        });
      case 'passed-desc':
        return resultsCopy.sort((a, b) => {
          const aPassed = a.testCases.filter((testCase) => testCase.status === 'Passed').length;
          const bPassed = b.testCases.filter((testCase) => testCase.status === 'Passed').length;
          return bPassed - aPassed;
        });
      case 'status-passed':
        return resultsCopy.sort((a, b) => {
          const aFailed = a.testCases.filter((testCase) => testCase.status === 'Failed').length;
          const bFailed = b.testCases.filter((testCase) => testCase.status === 'Failed').length;
          return aFailed - bFailed;
        });
      case 'status-failed':
        return resultsCopy.sort((a, b) => {
          const aPassed = a.testCases.filter((testCase) => testCase.status === 'Passed').length;
          const bPassed = b.testCases.filter((testCase) => testCase.status === 'Passed').length;
          return aPassed - bPassed;
        });
      default:
        return resultsCopy;
    }
  }, [filter]);

  const showTooltip = (event: React.MouseEvent<HTMLElement>, content: string) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    setTooltipContent(content);
    setTooltipVisible(true);
    
    // Position the tooltip right above the text and centered horizontally
    setTooltipPosition({
      top: rect.top + window.scrollY - 20, 
      left: rect.left + window.scrollX + rect.width / 2 - 400, // Adjusted to center the tooltip
    });
  };
  
  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <DropdownSortBy 
            value={filter}
            onChange={(value) => setFilter(value as 'id-asc' | 'id-desc' | 'dateTime-asc' | 'dateTime-desc' | 'status-passed' | 'status-failed' | 'passed-asc' | 'passed-desc')}
            options={[
              { label: 'ID (asc)', value: 'id-asc' },
              { label: 'ID (desc)', value: 'id-desc' },
              { label: 'Date/Time (asc)', value: 'dateTime-asc' },
              { label: 'Date/Time (desc)', value: 'dateTime-desc' },
              { label: 'Status (Failed)', value: 'sttus-failed' },
              { label: 'Status (Passed)', value: 'status-passed' },
              { label: 'Passed (asc)', value: 'passed-asc' },
              { label: 'Passed (failed)', value: 'passed-desc' },
            ]}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">ID</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Date/Time</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Passed</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Failed</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => {
              const { passed, failed } = getPassFailCounts(result.testCases);
              const overallStatus = failed > 0 ? 'Failed' : 'Passed';
              return (
                <>
                  <tr
                    key={result.id}
                    className="border-b border-stroke dark:border-strokedark hover:bg-gray-2 dark:hover:bg-meta-4"
                  >
                    <td className="py-4 px-4 text-black dark:text-white">{result.id}</td>
                    <td className="py-4 px-4 text-black dark:text-white">{result.dateTime}</td>
                    <td className="py-4 px-4">
                      <div
                        className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${overallStatus === 'Passed' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}
                      >
                        {overallStatus}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-black dark:text-white">{passed}</td>
                    <td className="py-4 px-4 text-black dark:text-white">{failed}</td>
                    <td className="py-4 px-4 text-black dark:text-white">
                      <div className="flex space-x-8">
                        <button
                          onClick={(e) => {
                          e.stopPropagation();
                          goToDashboard(applicationTitle, result.id);
                          }}
                          className="flex items-center text-primary font-bold"
                        >
                          <span>View Dashboard</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goToDashboard(applicationTitle, result.id);
                            setTimeout(() => window.print(), 1000);
                          }}
                          className="flex items-center text-primary font-bold"
                        >
                          <span>Print</span>
                        </button>
                        {failed > 0 && (
                          <>
                          <button
                            onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(result.id);
                            }}
                            className="flex items-center text-gray-600 dark:text-white"
                          >
                            <FaChevronDown />
                          </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Render the expanded row here */}
                  {openDropdown === result.id && (
                    <tr>
                      <td colSpan={6} className="py-2 px-4 w-full">
                        <div className="text-sm text-gray-600">
                          <h3 className="font-semibold">Failed Test Cases</h3>
                          <table className="mt-2 w-full table-auto">
                            <thead>
                              <tr className="bg-gray-100 dark:bg-meta-4">
                                <th className="py-2 px-4 text-left text-black dark:text-white">Test Case ID</th>
                                <th className="py-2 px-4 text-left text-black dark:text-white">Name</th>
                                <th className="py-2 px-4 text-left text-black dark:text-white">Description</th>
                                <th className="py-2 px-4 text-left text-black dark:text-white">Browser Type</th>
                                <th className="py-2 px-4 text-left text-black dark:text-white">Time Taken (s)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.testCases
                                .filter((testCase) => testCase.status === 'Failed')
                                .map((testCase) => (
                                  <tr key={testCase.id}>
                                    <td className="py-2 px-4 dark:text-white">{testCase.id}</td>
                                    <td className="py-2 px-4 dark:text-white">{testCase.name}</td>
                                    <td
                                    className="border-b border-[#eee] py-2 px-4 dark:border-strokedark cursor-pointer dark:text-white"
                                    onMouseEnter={(e) => showTooltip(e, testCase.description)}
                                    onMouseLeave={hideTooltip}
                                  >
                                    <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      {testCase.description.length > 50
                                        ? `${testCase.description.substring(0, 50)}...`
                                        : testCase.description}
                                    </div>
                                  </td>
                                    <td className="py-2 px-4 dark:text-white">{testCase.browser}</td>
                                    <td className="py-2 px-4 dark:text-white">{testCase.timeTaken}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
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

export default HistoryTableByApplication;

