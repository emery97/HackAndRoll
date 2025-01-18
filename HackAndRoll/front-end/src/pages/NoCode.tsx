import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import NoCodeTestCaseInput from '../components/NoCode/NoCodeTestCaseInput';
import NoCodeTestCaseOutput from '../components/NoCode/NoCodeTestCaseOutput';

const NoCode: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [generatedTestCase, setGeneratedTestCase] = useState<string>("");

  // Callback to enable Step 2 once the test case is generated
  const handleGenerated = (testCase: string) => {
    setGeneratedTestCase(testCase);
    setIsGenerated(true);
    setShowOtherComponent(true); // Navigate to the other component
    setActiveStep(2); // Optionally move to Step 2 immediately upon generation
  };

  return (
    <>
      <Breadcrumb pageName="No Code Test Case Creation" />

      {/* Navigation Section */}
      <div className="flex w-full bg-gray-100 border-b border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-t-lg">
        <button
          className={`rounded-tl-lg flex-1 text-center py-4 ${
            activeStep === 1
              ? 'bg-primary text-white font-bold'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
          }`}
          onClick={() => setActiveStep(1)}
        >
          Step 1: Generate Test Case
        </button>
        <button
          className={`rounded-tr-lg flex-1 text-center py-4 ${
            activeStep === 2
              ? 'bg-primary text-white font-bold'
              : 'bg-gray-200 dark:bg-gray-600'
          } ${isGenerated ? '' : 'cursor-not-allowed'}`}
          onClick={() => isGenerated && setActiveStep(2)}
          disabled={!isGenerated}
        >
          Step 2: Refine Test Case
        </button>
      </div>

      {/* Parent Container */}
      <div className="flex flex-col w-full h-full p-6 bg-white border border-gray-300 rounded-b-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        {activeStep === 1 || !showOtherComponent ? (
          <NoCodeTestCaseInput setGeneratedTestCase={handleGenerated} />
        ) : (
          <NoCodeTestCaseOutput generatedTestCase={generatedTestCase} />
        )}
      </div>
    </>
  );
};

export default NoCode;
