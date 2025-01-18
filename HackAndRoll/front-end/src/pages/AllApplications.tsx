import React from 'react';
import AllApplicationTable from '../components/Tables/AllApplicationTable';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


const AllApplication: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName = "All Applications"/>
      <AllApplicationTable />
    </>
  );
};

export default AllApplication;
