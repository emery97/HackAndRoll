import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-10 px-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div className="flex-grow">
            <h4 className="text-title-lg font-bold text-black dark:text-white mb-2">
              {total}
            </h4>
            <span className="text-md font-medium leading-none block w-40">{title}</span>
        </div>
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
