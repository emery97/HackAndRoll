import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Help: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [faqInput, setFaqInput] = useState<string>('');

  const toggleQuestion = (question: string) => {
    setActiveQuestion(prev => (prev === question ? null : question));
  };

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faqInput) {
      alert(`Your question: "${faqInput}" has been submitted!`);
      setFaqInput('');
    }
  };

  return (
    <>
      <Breadcrumb pageName = "Help"/>
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full flex flex-col">
        <div className="flex flex-col flex-grow">
          {/* FAQ Items */}
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-boxdark cursor-pointer" onClick={() => toggleQuestion('dashboardPurpose')}>
              <div className="flex justify-between items-center">
                <h5 className="text-md font-bold text-black dark:text-white">What is the purpose of the dashboard?</h5>
                {activeQuestion === 'dashboardPurpose' ? (
                  <FaChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {activeQuestion === 'dashboardPurpose' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  This dashboard provides a shared platform for testing applications. Users can favorite applications, view test cases, and track testing history across all applications. Test cases can be managed individually or for all applications.
                </p>
              )}
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-boxdark cursor-pointer" onClick={() => toggleQuestion('favoriteApps')}>
              <div className="flex justify-between items-center">
                <h5 className="text-md font-bold text-black dark:text-white">How do I favorite an application?</h5>
                {activeQuestion === 'favoriteApps' ? (
                  <FaChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {activeQuestion === 'favoriteApps' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  To favorite an application, simply click on the star icon next to the application's name. The application will be added to your list of favorites.
                </p>
              )}
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-boxdark cursor-pointer" onClick={() => toggleQuestion('viewTestCases')}>
              <div className="flex justify-between items-center">
                <h5 className="text-md font-bold text-black dark:text-white">How can I view test cases?</h5>
                {activeQuestion === 'viewTestCases' ? (
                  <FaChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {activeQuestion === 'viewTestCases' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  To view test cases, click on the "Test Cases" tab for the selected application. You will be able to see a list of all test cases related to that application.
                </p>
              )}
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-boxdark cursor-pointer" onClick={() => toggleQuestion('trackHistory')}>
              <div className="flex justify-between items-center">
                <h5 className="text-md font-bold text-black dark:text-white">How can I track the testing history?</h5>
                {activeQuestion === 'trackHistory' ? (
                  <FaChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {activeQuestion === 'trackHistory' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  You can track your testing history by navigating to the "History" tab. This will show you past testing activities and results.
                </p>
              )}
            </div>

            <div className="rounded-lg border p-4 bg-gray-50 dark:bg-boxdark cursor-pointer" onClick={() => toggleQuestion('manageTestCases')}>
              <div className="flex justify-between items-center">
                <h5 className="text-md font-bold text-black dark:text-white">How do I manage test cases?</h5>
                {activeQuestion === 'manageTestCases' ? (
                  <FaChevronUp className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {activeQuestion === 'manageTestCases' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Test cases can be managed individually or for all applications. Click the "Manage" button to edit, delete, or add new test cases.
                </p>
              )}
            </div>

            {/* Add more questions here in the same format */}

          </div>

          {/* FAQ Submission Section */}
          <div className="mt-8 rounded-lg border p-4 bg-gray-50 dark:bg-boxdark">
            <h5 className="text-md font-bold text-black dark:text-white mb-3">Have a question? Ask us!</h5>
            <form onSubmit={handleFaqSubmit} className="flex flex-col">
              <textarea
              value={faqInput}
              onChange={(e) => setFaqInput(e.target.value)}
              className="border p-2 rounded-lg mb-3 text-sm text-gray-600 dark:text-gray-300 dark:bg-gray-700"
              rows={4}
              placeholder="Type your question here..."
              />
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>  
    </>
  );
};

export default Help;
