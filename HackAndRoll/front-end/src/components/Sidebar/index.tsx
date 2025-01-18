import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo-transparent.png';

interface SidebarProps {
  sidebarOpen: boolean; // Sidebar open state passed down from parent
  setSidebarOpen: (arg: boolean) => void; // Function to set sidebar state
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // Store sidebar expanded state in local storage
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // Close sidebar on 'esc' key press
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  // Sync sidebar expanded state with local storage
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-7.5">
        <NavLink to="/dashboards" className="flex-grow-0 mr-18">
          <img src={Logo} alt="Logo"/>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-4 lg:mt-0 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-3">
              {/* <!-- Menu Item Scan your clothes --> */}
              <li>
              <NavLink
                to="/scan-your-clothes"
                className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-black duration-300 ease-in-out 
                  ${pathname.includes('/scan-your-clothes') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} 
                  dark:text-white dark:hover:bg-primary`}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5H16.83L15.41 3.59C15.21 3.39 14.95 3.25 14.66 3.18C14.37 3.1 14.05 3 13.75 3H10.25C9.95 3 9.63 3.1 9.34 3.18C9.05 3.25 8.79 3.39 8.59 3.59L7.17 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                    fill="currentColor"
                  />
                </svg>
                Scan Your Clothes
              </NavLink>
              </li>
              {/* <!-- Menu Item Scan your clothes --> */}

              {/* <!-- Menu Item Your Closet --> */}
              <li>
              <NavLink
                to="/your-closet"
                className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-black duration-300 ease-in-out 
                  ${pathname.includes('/your-closet') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} 
                  dark:text-white dark:hover:bg-primary`}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 2C3.45 2 3 2.45 3 3V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V3C21 2.45 20.55 2 20 2H4ZM10 4H11V8H10V4ZM5 4H8V8H5V4ZM8 20H5V10H8V20ZM19 20H16V10H19V20ZM13 4H15V8H13V4Z"
                    fill="currentColor"
                  />
                </svg>
                Your Closet
              </NavLink>
              </li>
              {/* <!-- Menu Item Your Closet --> */}

              {/* <!-- Menu Item OOTD --> */}
              <li>
              <NavLink
                to="/ootd"
                className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-black duration-300 ease-in-out 
                  ${pathname.includes('/ootd') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} 
                  dark:text-white dark:hover:bg-primary`}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.34 2 9 3.34 9 5C9 5.78 9.3 6.47 9.8 6.93L3.5 16C3.18 16.54 3 17.21 3 18C3 19.65 4.35 21 6 21H18C19.65 21 21 19.65 21 18C21 17.21 20.82 16.54 20.5 16L14.2 6.93C14.7 6.47 15 5.78 15 5C15 3.34 13.66 2 12 2ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4ZM6 19C5.45 19 5 18.55 5 18C5 17.84 5.05 17.69 5.12 17.56L9.68 10.1L11 12.06V14H13V12.06L14.32 10.1L18.88 17.56C18.95 17.69 19 17.84 19 18C19 18.55 18.55 19 18 19H6Z"
                    fill="currentColor"
                  />
                </svg>
                Outfit Of The Day
              </NavLink>
              </li>
              {/* <!-- Menu Item OOTD --> */}

              {/* <!-- Menu Item Credits --> */}
              <li>
            <NavLink
              to="/credits"
              className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-black duration-300 ease-in-out 
                ${pathname.includes('/credits') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} 
                dark:text-white dark:hover:bg-primary`}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Arial, sans-serif">C</text>
              </svg>
              Credits
            </NavLink>
          </li>
          {/* <!-- Menu Item Credits --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
