import React, { useState } from 'react';
import HistoryByTestCaseTable from '../../components/Tables/HistoryTableByTestCase';
import HistoryByApplicationTable from '../../components/Tables/HistoryTableByApplication';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const DashboardHistory: React.FC = () => {
  const [viewBy, setViewBy] = useState<'application' | 'testcase'>('application');

  const handleToggle = () => {
    setViewBy((prev) => (prev === 'application' ? 'testcase' : 'application'));
  };

  const { appTitle } = useParams();  
  const decodedAppTitle = decodeURIComponent(appTitle || '')

  return (
    <>
    <PageTitle title={`${decodedAppTitle} | Dashboard History | CobaltTest - OCBC Automated Testing`} />
    <Breadcrumb pageName = {decodedAppTitle}/>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">History</h2>
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">By Application</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={viewBy === 'testcase'} onChange={handleToggle} />
            <div className="block bg-gray-600 w-14 h-8 rounded-full transition-all duration-300"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${viewBy === 'testcase' ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <span className="ml-2">By Test Case</span>
        </label>
      </div>
      <div className="transition-opacity duration-300">
        {viewBy === 'application' ? <HistoryByApplicationTable /> : <HistoryByTestCaseTable />}
      </div>
    </div>
    </>
  );
};

export default DashboardHistory;