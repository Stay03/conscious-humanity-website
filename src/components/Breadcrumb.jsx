import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, onNavigate }) => {
  return (
    <div className="w-full bg-gradient-to-r from-green-900 to-yellow-800 pt-36 pb-20 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white  mb-2">{items[items.length - 1].label}</h1>
        <nav className="flex justify-center" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <li className="text-white">
                    <span className="mx-1">&gt;</span>
                  </li>
                )}
                <li>
                  {index === items.length - 1 ? (
                    <span className="text-white">{item.label}</span>
                  ) : (
                    <button
                      onClick={() => onNavigate(item.path)}
                      className="text-white"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;