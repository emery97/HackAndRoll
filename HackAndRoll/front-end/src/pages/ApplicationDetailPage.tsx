import React from "react";
import { useParams } from "react-router-dom";
import AllTestCasesTable from "../components/Tables/AllTestCasesTable";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

interface AllApplicationResult {
  id: number;
  title: string;
  totalTestCases: number;
  successRate: number;
}

const allApplicationTable: AllApplicationResult[] = [
  {
    id: 1,
    title: 'Nura Bank',
    totalTestCases: 8,
    successRate: 98,
  },
  {
    id: 2,
    title: 'XYZ Bank',
    totalTestCases: 14,
    successRate: 90,
  },
];

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams();
  const application = allApplicationTable.find((app) => app.id === parseInt(id || ''));

  if (!application) {
    return <div>Application not found</div>;
  }


  return (
    <>
     <Breadcrumb pageName = "Application Details"/>
     <div className="p-4">
      <h1>{application.title}</h1>
      <p><strong>ID:</strong> {application.id}</p>
      <p><strong>Total Test Cases:</strong> {application.totalTestCases}</p>
      <p><strong>Success Rate:</strong> {application.successRate}%</p>

        {/*TO DO: Filter the table based on the selected app*/}
        <AllTestCasesTable />
    </div>
    </>
  );
};

export default ApplicationDetailPage;
