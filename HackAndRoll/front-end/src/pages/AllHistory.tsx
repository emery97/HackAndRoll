import React from 'react';
import HistoryTable from '../components/Tables/HistoryTableByApplication';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const AllHistory: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName = "All History"/>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <HistoryTable/>
      </div>
    </>
  );
};

export default AllHistory;
