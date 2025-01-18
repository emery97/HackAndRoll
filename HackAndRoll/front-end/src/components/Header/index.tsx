import { Link, useLocation } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DarkModeSwitcher from './DarkModeSwitcher';
import Logo from '../../images/logo/logo-icon.png';
import React from 'react';

const Header: React.FC<{
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  appTitle?: string; 
}> = (props) => {
  const isDashboardPath = window.location.pathname.includes('/dashboards/') || window.location.pathname.includes('/dashboard-testcases/') || window.location.pathname.includes('/dashboard-history/');

  const location = useLocation();
  const path = location.pathname;

  // Extract appTitle from the path (assuming the format is /dashboards/:appTitle)
  const match = path.match(/\/dashboards\/([^/]+)/);  // Matches the appTitle after '/dashboards/'
  const appTitle = match ? match[1] : undefined;  // Extract appTitle or use undefined

  const decodedAppTitle = appTitle ? decodeURIComponent(appTitle) : 'Loading...';

  return (
    <header className="sticky top-0 z-999 flex w-full bg-gray drop-shadow-1 dark:bg-black dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle Button */}

          {isDashboardPath ? (
            <>
              <span className="text-md font-bold">{decodedAppTitle || 'Loading...'}</span> {/* Dynamic appName or fallback */}
              <Link className="text-button text-sm ml-5" to={`/dashboards/${appTitle}`}>
                Dashboard
              </Link>
              <Link className="text-button text-sm ml-2" to={`/dashboards/${appTitle}/dashboard-testcases`}>
                Test Cases
              </Link>
              <Link className="text-button text-sm ml-2" to={`/dashboards/${appTitle}/dashboard-history`}>
                History
              </Link>
            </>
          ) : (
            <Link className="block flex-shrink-0 lg:hidden max-w-20" to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggler */}
            <DarkModeSwitcher />
            {/* Notification Menu Area */}
            <DropdownNotification />
            {/* Notification Menu Area */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
