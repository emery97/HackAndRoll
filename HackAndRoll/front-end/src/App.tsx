import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Dashboards from './pages/Dashboards/Dashboards';
import Dashboard from './pages/Dashboards/Dashboard';
import DashboardTestCases from './pages/Dashboards/DashboardTestCases';
import DashboardHistory from './pages/Dashboards/DashboardHistory';
import Settings from './pages/Settings';
import AllTestCases from './pages/AllTestCases';
import AllHistory from './pages/AllHistory';
import AllApplication from './pages/AllApplications';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import Credits from './pages/Credits';
import Help from './pages/Help';
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar/index';
import NoCode from './pages/NoCode';

// Dummy data for applications
const dummyApplications = [
  { 
    id: 1, 
    title: 'XYZ Bank', 
    imageSrc: './XYZ_icon.png', 
    description: 'Keep track of your spending and create budgets to save money.', 
    category: 'Finance' 
  },
  { 
    id: 2, 
    title: 'Dashboard 1', 
    imageSrc: './dashboard.png', 
    description: 'Keep track and manage your applications in real-time.', 
    category: 'Analytics' 
  },
];
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboards'); // Redirect to the home page after login
  };

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | CobaltTest - OCBC Automated Testing" />
                <SignIn onLogin={handleLogin} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        </>
      ) : (
        <Route
          path="*"
          element={
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {/* <!-- ===== Page Wrapper Start ===== --> */}
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}
        
                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  {/* <!-- ===== Header Start ===== --> */}
                  <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  {/* <!-- ===== Header End ===== --> */}
        
                  {/* <!-- ===== Main Content Start ===== --> */}
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      <Routes>
                        <Route
                          path = "/dashboards"
                          element={
                            <>
                              <PageTitle title="Dashboard | CobaltTest - OCBC Automated Testing" />
                              <Dashboards />
                            </>
                          }
                        />
                    {dummyApplications.map((app) => (
                    <React.Fragment key={app.id}>
                      <Route
                        path={`/dashboards/${encodeURIComponent(app.title)}`}
                        element={
                          <>
                            <Dashboard />
                          </>
                        }
                      />
                      <Route
                        path={`/dashboards/${encodeURIComponent(app.title)}/:id`}
                        element={
                          <>
                            <Dashboard />
                          </>
                        }
                      />
                      <Route
                        path={`/dashboards/${encodeURIComponent(app.title)}/dashboard-testcases`}
                        element={
                          <>
                            <DashboardTestCases />
                          </>
                        }
                      />
                      <Route
                        path={`/dashboards/${encodeURIComponent(app.title)}/dashboard-history`}
                        element={
                          <>
                            <DashboardHistory />
                          </>
                        }
                      />
                    </React.Fragment>
                  ))}
                  <Route
                    path="/dashboards/:appTitle"
                    element={
                      <>
                        <Dashboard />
                      </>
                    }
                  />
                  <Route 
                    path="/dashboards/:appTitle/:id"
                    element={
                      <>
                        <Dashboard />
                      </>
                    }
                  />
                  <Route
                    path="/dashboards/:appTitle/dashboard-testcases"
                    element={
                      <>
                        <DashboardTestCases />
                      </>
                    }
                  />
                  <Route
                    path="/dashboards/:appTitle/dashboard-history"
                    element={
                      <>
                        <DashboardHistory />
                      </>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <>
                        <PageTitle title="Settings | CobaltTest - OCBC Automated Testing" />
                        <Settings />
                      </>
                    }
                  />
                  <Route
                    path="/all-test-cases"
                    element={
                      <>
                        <PageTitle title="All Test Cases | CobaltTest - OCBC Automated Testing" />
                        <AllTestCases />
                      </>
                    }
                  />
                  <Route 
                    path="/all-applications"
                    element={
                      <>
                        <PageTitle title="All Applications | CobaltTest - OCBC Automated Testing" />
                        <AllApplication />
                      </>
                    }
                  />
                  <Route 
                    path="/all-applications/:id" 
                    element={
                      <>
                        <PageTitle title = "Application Details | CobaltTest - OCBC Automated Testing" />
                        <ApplicationDetailPage />
                      </> 
                    }
                    />
                  
                  <Route
                    path="/all-history"
                    element={
                      <>
                        <PageTitle title="All History | CobaltTest - OCBC Automated Testing" />
                        <AllHistory />
                      </>
                    }
                  />
                  <Route
                    path="/no-code"
                    element={
                      <>
                        <PageTitle title="No Code | CobaltTest - OCBC Automated Testing" />
                        <NoCode />
                      </>
                    }
                  />
                  <Route
                    path="/credits"
                    element={
                      <>
                        <PageTitle title="Credits | CobaltTest - OCBC Automated Testing" />
                        <Credits />
                      </>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <>
                        <PageTitle title="Help | CobaltTest - OCBC Automated Testing" />
                        <Help />
                      </>
                    }
                  />
                  <Route path="/auth/signin" element={<Navigate to="/dashboard" />} />
                </Routes>
                </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
          }
        />
      )}
    </Routes>
  );
}

export default App;
