import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Credits: React.FC = () => {
  return (
    <>
    <Breadcrumb pageName = "Credits"/>
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full flex flex-col cursor-pointer">
      <div className="flex flex-col flex-grow">
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          This application aims to enable cross-platform browser automation for regression testing of various bank applications, 
          including consumer internet banking and internal HR systems. Our solution provides a scalable, user-friendly platform that automates the entire testing process without manual intervention.
        </p>

        <div className="flex justify-between w-full mb-1 mt-5">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            Credits
          </h4>
        </div>
        <h6 className="text-md font-bold text-black dark:text-white">
          This project was developed using the following technologies:
        </h6>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://tailadmin.com/react" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">TailAdmin React Admin Template</a> - A modern admin dashboard template that is built with React, Tailwind CSS, and Redux.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://reactjs.org/" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">React.js</a> - A JavaScript library for building user interfaces.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://nodejs.org/" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">Node.js</a> - A JavaScript runtime built on Chrome's V8 JavaScript engine.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://expressjs.com/" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">Express.js</a> - A minimal and flexible Node.js web application framework.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">MongoDB Atlas</a> - A fully-managed cloud database service.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://www.jenkins.io/" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">Jenkins</a> - An open-source automation server.
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          <a href="https://testcafe.io/" target="_blank" rel="noopener" className="text-primary underline placeholder:underline">TestCafe</a> - An automation tool for cross-platform web testing.
        </p>

        <div className="flex justify-between w-full mb-1 mt-5">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            Team Members
          </h4>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Wu Enjia - Project Lead & Front End Developer
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Jayme Chua - Project Manager & Automation Engineer
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Timothy Chai - Automation Engineer
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Joseph Wan - Back end Developer
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Shin Thant Aung - Back end Developer
        </p>
      </div>
    </div>
    </>
  );
};

export default Credits;
