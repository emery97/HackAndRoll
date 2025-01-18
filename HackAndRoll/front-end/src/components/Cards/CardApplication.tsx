import React from 'react';
import { useNavigate } from 'react-router-dom';
interface CardApplicationProps {
  title: string;
  imageSrc: string;
  description: string;
  category: string; 
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CardApplication: React.FC<CardApplicationProps> = ({
  title,
  imageSrc,
  description,
  category, 
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboards/${title}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark w-full h-full flex flex-col cursor-pointer" onClick = {handleCardClick}>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between w-full mb-2">
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {title}
          </h4>
        </div>

        {/* Bottom section for category and description */}
        <div className="flex flex-col mt-auto">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded-md mb-2"
          />
          <div className="flex justify-between w-full">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{category}</span>
          </div>
          
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Add to Favourites button */}
          <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }} className="flex items-center justify-center mt-2 bg-primary text-white text-sm font-bold py-2 rounded-md hover:bg-primary-600 transition hover:bg-secondary">
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 stroke-current"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardApplication;
