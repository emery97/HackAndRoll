import React, { useState, useEffect } from 'react';
import '../../css/general.css';
import DropdownSortBy from '../Dropdowns/DropdownSortBy';
import UploadCard from '../UploadCard';
import { runSelectedTestRequest } from '../../../../back-end/runTestRequest';

interface TestCase {
  id: number;
  title: string;
  description: string;
  timeTaken: number;
  successRate: number;
  dateAdded: string;
  reporter: string;
}

const AllTestCasesTable = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [modalContent, setModalContent] = useState<{ title: string; description: string; timeTaken: number } | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'id-asc' | 'id-desc' | 'title-asc' | 'title-desc' | 'successRate-asc' | 'successRate-desc' | 'dateAdded-asc' | 'dateAdded-desc' | 'reporter-asc' | 'reporter-desc'>('id-asc');
  const [selectedTestCases, setSelectedTestCases] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch test cases from the backend
  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await fetch('http://localhost:3000/alltestcases'); // Adjust this endpoint to match your backend
        const data = await response.json();
        setTestCases(data);
      } catch (error) {
        console.error('Error fetching test cases:', error);
      }
    };
    fetchTestCases();
  }, []);

  const filteredTestCases = testCases.filter(testCase =>
    testCase.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTestCase = (id: number) => {
    setSelectedTestCases(prev =>
      prev.includes(id) ? prev.filter(testCaseId => testCaseId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedTestCases(selectAll ? [] : testCases.map(testCase => testCase.id));
  };

  const handleTestButtonClick = () => {
    const selectedTestCaseTitles = testCases
      .filter((testCase) => selectedTestCases.includes(testCase.id))
      .map((testCase) => testCase.title);

    console.log('Testing selected test cases:', selectedTestCaseTitles);
    
    // Call the API endpoint to run the selected tests
    runSelectedTestRequest(selectedTestCaseTitles);
  };

  const sortedTestCases = filteredTestCases.sort((a, b) => {
    switch (filter) {
      case 'id-asc':
        return a.id - b.id;
      case 'id-desc':
        return b.id - a.id;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'successRate-asc':
        return a.successRate - b.successRate;
      case 'successRate-desc':
        return b.successRate - a.successRate;
      case 'dateAdded-asc':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'dateAdded-desc':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'reporter-asc':
        return a.reporter.localeCompare(b.reporter);
      case 'reporter-desc':
        return b.reporter.localeCompare(a.reporter);
      default:
        return 0;
    }
  });

  const showTooltip = (event: React.MouseEvent<HTMLElement>, content: string) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    setTooltipContent(content);
    setTooltipVisible(true);
    
    // Position the tooltip right above the text and centered horizontally
    setTooltipPosition({
      top: rect.top + window.scrollY + 430, 
      left: rect.left + window.scrollX + rect.width / 2 - 400, // Adjusted to center the tooltip
    });
  };
  
  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  // Open the modal to edit a test case
  const openModal = (testCase: TestCase) => {
    setModalContent(testCase);
  };

  const handleTestCaseTitleClick = (testCase: TestCase) => {
    // Redirect to the source control link when a test case title is clicked
    const filePath = `https://github.com/enjiawu/OCBC_Applications/blob/main/XYZBank/${testCase.title}`;  // Replace with your actual source control path
    window.open(filePath, '_blank'); 
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">All Test Cases</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
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
            onChange={(value) => setFilter(value as 'id-asc' | 'id-desc' | 'title-asc' | 'title-desc' | 'successRate-asc' | 'successRate-desc' | 'dateAdded-asc' | 'dateAdded-desc' | 'reporter-asc' | 'reporter-desc')}
            options={[
              { label: 'ID (asc)', value: 'id-asc' },
              { label: 'ID (desc)', value: 'id-desc' },
              { label: 'Title (asc)', value: 'title-asc' },
              { label: 'Title (desc)', value: 'title-desc' },
              { label: 'Success Rate (asc)', value: 'successRate-asc' },
              { label: 'Success Rate (desc)', value: 'successRate-desc' },
              { label: 'Date Added (asc)', value: 'dateAdded-asc' },
              { label: 'Date Added (desc)', value: 'dateAdded-desc' },
              { label: 'Reporter (asc)', value: 'reporter-asc' },
              { label: 'Reporter (desc)', value: 'reporter-desc' },
            ]}
          />
        </div>
      </div>

      <button 
        onClick={handleTestButtonClick}
        className="mt-4 mb-5 bg-primary hover:bg-secondary text-white font-bold disabled:bg-gray-300 px-6 py-2 rounded-md"
      >
        Test Selected
      </button>

      <div className="max-w-full overflow-x-auto h-100">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                <input 
                  type="checkbox" 
                  checked={selectAll} 
                  onChange={handleSelectAll} 
                />
              </th>
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">ID</th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">Test Case</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Time Taken (s)</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Success Rate (%)</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Date Added</th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Reporter</th>
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {sortedTestCases.map((testCase) => (
              <tr key={testCase.id} className="border-b dark:border-strokedark">
                <td className="py-4 px-4">
                  <input 
                    type="checkbox" 
                    checked={selectedTestCases.includes(testCase.id)} 
                    onChange={() => handleSelectTestCase(testCase.id)} 
                  />
                </td>
                <td className="py-4 px-4">{testCase.id}</td>
                <td className="py-4 px-4 cursor-pointer text-primary underline" onClick={() => handleTestCaseTitleClick(testCase)}>{testCase.title}</td>
                <td className="py-4 px-4" onMouseEnter={(e) => showTooltip(e, testCase.description)} onMouseLeave={hideTooltip}>
                  {testCase.description}
                </td>
                <td className="py-4 px-4 ">{testCase.timeTaken}</td>
                <td className="py-4 px-4">{testCase.successRate}</td>
                <td className="py-4 px-4">{testCase.dateAdded}</td>
                <td className="py-4 px-4">{testCase.reporter}</td>
                <td className="py-4 px-4">
                  <button onClick={() => openModal(testCase)} className="text-blue-500">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tooltipVisible && tooltipContent && (
        <div 
          className="tooltip-content"
          style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default AllTestCasesTable;
