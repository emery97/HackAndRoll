import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';

const Settings = () => {
  // Define user data as a JSON object
  const userData = {
    fullName: "Devid Jhon",
    username: "devidjhon24",
    email: "devidjond45@ocbc.com"
  };

  // State for the notification toggle
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Handle notification toggle
  const handleToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Handle logout button click
  const handleLogout = () => {
    // Logout functionality here
    console.log("User logged out");
  };

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-21">
        <Breadcrumb pageName="Settings" />

        <div className="max-w-7xl mx-auto">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Personal Information
          </h3>
        </div>
        <div className="p-7">
          <form action="#">
            {/* Full Name */}
            <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Full Name
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
            type="text"
            value={userData.fullName}
            disabled
          />
            </div>

            {/* Username */}
            <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Username
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
            type="text"
            value={userData.username}
            disabled
          />
            </div>

            {/* Email */}
            <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
            type="email"
            value={userData.email}
            disabled
          />
            </div>

            {/* Notifications Toggle */}
            <div className="mb-5 flex items-center gap-5">
          <label className="block text-sm font-medium text-black dark:text-white">
            Notifications
          </label>
          <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={notificationsEnabled}
              onChange={handleToggle}
              className="toggle-checkbox sr-only" // Hide the checkbox itself, only show the slider
            />
            <label
              htmlFor="toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
            notificationsEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
            className={`dot absolute left-0 top-0 mt-0.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
              notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
              ></span>
            </label>
          </div>
            </div>

            {/* Conditional Notification Settings UI */}
            {notificationsEnabled && (
          <div className="mt-4 p-4 border border-dashed border-gray-300 rounded dark:border-gray-600">
            <h4 className="mb-2 text-sm font-semibold text-black dark:text-white">
              Notification Settings
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize your notification preferences.
            </p>
            <ul className="mt-2 space-y-2">
              <li>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary"
              />
              <span className="text-sm text-black dark:text-white">
                Email Notifications
              </span>
            </label>
              </li>
              <li>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary"
              />
              <span className="text-sm text-black dark:text-white">
                SMS Notifications
              </span>
            </label>
              </li>
            </ul>
          </div>
            )}

            {/* Help Desk Message */}
            <div className="mt-10">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            To change your credentials or password, please contact the OCBC Helpdesk for assistance.
          </p>
            </div>

            {/* Logout Button */}
            <div className="mt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-20 rounded bg-primary-600 py-2 px-3 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Logout
          </button>
            </div>
            
          </form>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
