import React from 'react';

/**
 * QuizCard Component
 * Displays a section-level quiz as a card in the grid view
 */
const QuizCard = ({ 
  quiz, 
  sectionTitle, 
  onClick,
  isComplete = false,
  isAvailable = true 
}) => {
  return (
    <div 
      className={`group relative rounded-lg border overflow-hidden shadow-sm transition-all duration-200 ${
        !isAvailable 
          ? 'bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed' 
          : isComplete
            ? 'bg-white border-green-200 hover:shadow-md cursor-pointer'
            : 'bg-white border-green-200 hover:shadow-md cursor-pointer'
      }`}
      onClick={() => isAvailable && onClick()}
    >
      {/* Quiz thumbnail/icon */}
      <div className="relative h-36 bg-green-50">
        <div className="w-full h-full flex items-center justify-center">
          <svg 
            className="h-16 w-16 text-green-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        {/* Locked overlay for unavailable quizzes */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-full p-3">
              <svg className="h-8 w-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Completion indicator */}
        {isComplete && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Quiz content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{sectionTitle}</p>
            <h3 className={`font-medium line-clamp-2 ${isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
              {quiz.title}
            </h3>
          </div>
        </div>
        
        {/* Quiz description - truncated */}
        {quiz.description && (
          <p className={`mt-2 text-sm line-clamp-2 ${isAvailable ? 'text-gray-600' : 'text-gray-400'}`}>
            {quiz.description}
          </p>
        )}
        
        {/* Quiz badges/tags */}
        <div className="mt-3 flex items-center space-x-2">
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            isAvailable ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}>
            Section Quiz
          </span>
          
          {quiz.questions && (
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              isAvailable ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {quiz.questions.length} Question{quiz.questions.length !== 1 ? 's' : ''}
            </span>
          )}
          
          {isComplete ? (
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-600">
              Completed
            </span>
          ) : !isAvailable ? (
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">
              Locked
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-600">
              Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;