import React, { useState } from 'react';
import LessonCard from './LessonCard';
import QuizCard from './QuizCard';

/**
 * LessonGrid Component
 * Displays all course lessons in a grid layout
 * Now with progression support
 */
const LessonGrid = ({ 
  sections, 
  onLessonSelect,
  onQuizSelect,
  availableLessons = [],
  progressionEnabled = false 
}) => {
  const [filterSection, setFilterSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get filtered and searched lessons and quizzes
  const getFilteredContent = () => {
    // Start with all sections
    let filteredSections = sections;
    
    // Filter by section if needed
    if (filterSection !== 'all') {
      filteredSections = sections.filter(section => section.id.toString() === filterSection);
    }
    
    // Build lessons with section info and availability status
    const lessonsWithSections = filteredSections.flatMap(section => 
      (section.lessons || []).map(lesson => ({
        ...lesson,
        type: 'lesson',
        sectionTitle: section.title,
        sectionId: section.id,
        section: section,
        // Check if lesson is available based on progression
        isAvailable: !progressionEnabled || availableLessons.some(l => l.id === lesson.id)
      }))
    );

    // Build quizzes with section info
    const quizzesWithSections = filteredSections.flatMap(section => 
      (section.quizzes || []).map(quiz => ({
        ...quiz,
        type: 'quiz',
        sectionTitle: section.title,
        sectionId: section.id,
        section: section,
        // For now, all quizzes are available (can add progression logic later)
        isAvailable: true
      }))
    );

    // Combine lessons and quizzes
    const allContent = [...lessonsWithSections, ...quizzesWithSections];
    
    // Apply search term filter if provided
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return allContent.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.description?.toLowerCase().includes(term)
      );
    }
    
    return allContent;
  };
  
  const filteredContent = getFilteredContent();
  
  // Show all content (lessons and quizzes), including locked ones, in the grid view
  const visibleContent = filteredContent;
  
  return (
    <div>
      
    
      {/* Filters and search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <label htmlFor="section-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Section
          </label>
          <select
            id="section-filter"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="all">All Sections</option>
            {sections.map(section => (
              <option key={section.id} value={section.id.toString()}>
                {section.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="lesson-search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Lessons
          </label>
          <div className="relative">
            <input
              id="lesson-search"
              type="text"
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {visibleContent.length} items
        {filterSection !== 'all' && ' in this section'}
        {searchTerm && ` matching "${searchTerm}"`}
        {progressionEnabled && ` (${visibleContent.filter(item => item.isAvailable).length} available, ${visibleContent.filter(item => !item.isAvailable).length} locked)`}
      </div>
      
      {/* Grid layout */}
      {visibleContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleContent.map(item => (
            item.type === 'lesson' ? (
              <LessonCard
                key={`lesson-${item.id}`}
                lesson={item}
                sectionTitle={item.sectionTitle}
                onClick={() => onLessonSelect(item, item.section)}
                isComplete={item.complete}
                isAvailable={item.isAvailable}
              />
            ) : (
              <QuizCard
                key={`quiz-${item.id}`}
                quiz={item}
                sectionTitle={item.sectionTitle}
                onClick={() => onQuizSelect && onQuizSelect(item, item.section)}
                isComplete={item.complete}
                isAvailable={item.isAvailable}
              />
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter to find lessons or quizzes.
          </p>
          {(filterSection !== 'all' || searchTerm) && (
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => {
                  setFilterSection('all');
                  setSearchTerm('');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonGrid;