import React from 'react';

import AllTestCasesTable from '../../components/Tables/AllTestCasesTable-d';
import UploadCard from '../../components/UploadCard';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const Dashboard: React.FC = () => {
  const { appTitle } = useParams();  
  const decodedAppTitle = decodeURIComponent(appTitle || '')

  return (
    <>
    <PageTitle title={`${decodedAppTitle} | Dashboard Test Cases | CobaltTest - OCBC Automated Testing`} />
    <Breadcrumb pageName = {decodedAppTitle}/>
    
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
