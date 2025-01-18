import { FaEye, FaRedo } from 'react-icons/fa'; 

// Define the interface for an application result
interface ApplicationResult {
  id: number; 
  title: string; 
  dateTime: string; 
  status: 'Passed' | 'Failed' | 'Pending'; 
}

const applicationResults: ApplicationResult[] = [
  {
    id: 1,
    title: 'Banking Application',
    dateTime: 'Jan 13, 2024 10:00 AM',
    status: 'Passed',
  },
  {
    id: 2,
    title: 'Banking Application',
    dateTime: 'Jan 14, 2024 11:30 AM',
    status: 'Failed',
  },
  {
    id: 3,
    title: 'Banking Application',
    dateTime: 'Jan 15, 2024 02:15 PM',
    status: 'Passed',
  },
  {
    id: 4,
    title: 'Banking Application',
    dateTime: 'Jan 16, 2024 09:45 AM',
    status: 'Pending',
  },
];

const ApplicationTestedTable = () => {
  const handleReset = (applicationResultId: number) => {
    // TODO:: Reset the application result
    console.log("Resetting application result:", applicationResultId);
  };

  const handleView = (applicationResult: ApplicationResult) => {
    // TODO:: View the application result
    console.log("Viewing application result:", applicationResult);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Date/Time
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Application Tested
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applicationResults.map((applicationResult) => (
              <tr key={applicationResult.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {applicationResult.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {applicationResult.dateTime}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {applicationResult.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      applicationResult.status === 'Passed'
                        ? 'bg-success text-success'
                        : applicationResult.status === 'Failed'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {applicationResult.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => handleView(applicationResult)}>
                      <FaEye size={20} />
                    </button>
                    <button className="hover:text-primary" onClick={() => handleReset(applicationResult.id)}>
                      <FaRedo size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTestedTable;
