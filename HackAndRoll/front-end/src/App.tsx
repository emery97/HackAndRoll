import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Camera from './components/Camera/Camera';
import PageTitle from './components/PageTitle';
import Sidebar from './components/Sidebar/index';
import Header from './components/Header';
import Credits from './pages/Credits';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Routes>
                <Route
                  path="/credits"
                  element={
                    <>
                      <PageTitle title="Credits | Chioset" />
                      <Credits />
                    </>
                  }
                />
                <Route
                  path="/scan-your-outfit"
                  element={
                    <>
                      <PageTitle title="Scan Your Outfit | Chioset" />
                      <Camera />
                    </>
                  }
                />
                <Route
                  path="/your-closet"
                  element={
                    <>
                      <PageTitle title="Your Closet | Chioset" />
                      <Credits />
                    </>
                  }
                />
                <Route
                  path="/ootd"
                  element={
                    <>
                      <PageTitle title="Outfit Of The Day | Chioset" />
                      <Credits />
                    </>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
