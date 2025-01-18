import React from 'react';

import AllTestCasesTable from '../components/Tables/AllTestCasesTable-d';
import UploadCard from '../components/UploadCard';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Dashboard: React.FC = () => {
  return (
    <>
    <Breadcrumb pageName = "All Test Cases"/>
    {/* Test Application Card */}
    <div className="rounded-md border sm:px-7.5 border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h5 className="text-xl font-semibold text-black dark:text-white mb-4">
        Add New Test Case
      </h5>
      <UploadCard />
    </div>

    <div className = "mt-5">
        <AllTestCasesTable />
    </div>
    </>
  );
};

export default Dashboard;
