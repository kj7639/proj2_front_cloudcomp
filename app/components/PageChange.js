'use client';

import React from 'react';
import { useRecipeData } from '../context/RecipeContext';

export default function Pagination() {
  const { recipeData, setCurrentPage, loading } = useRecipeData();
  const totalPages = Math.ceil(recipeData.total / recipeData.pageSize);
  const currentPage = recipeData.page;

  const handlePageClick = (page) => {
    if (!loading) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 2; // pages to show around current page
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    const pages = [];
    let last = 0;

    for (const page of range) {
      if (page - last > 1) {
        pages.push('…');
      }
      pages.push(page);
      last = page;
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`px-3 py-1 rounded ${
          currentPage === 1 || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '…' ? (
          <span key={idx} className="px-2">
            {page}
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageClick(page)}
            disabled={loading}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
}