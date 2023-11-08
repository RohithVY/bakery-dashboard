import { ChevronFirstIcon, ChevronLastIcon } from "lucide-react";
import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, total }) => {
  const pageRange = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageRange.push(i);
  }

  return (
    <div className="flex items-center justify-between bg-[#1E293B] px-4 py-3 sm:px-6 mt-4 rounded-lg mx-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-primary"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-primary"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-md text-white">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * 10, totalPages * 10, total)}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {total}
            </span>{" "}
            results
          </p>
        </div>
        <div>
          <nav className="join" aria-label="Pagination">
            <button
              onClick={() => onPageChange(1)}
              className="btn btn-outline join-item"
              disabled={currentPage === 1}
            >
              <span className="sr-only">First</span>
              <ChevronFirstIcon className="h-5 w-5" />
            </button>
            {pageRange.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`btn join-item btn-primary transition-none ${
                  page === currentPage ? "" : "btn-outline"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(totalPages)}
              className="btn btn-outline join-item"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Last</span>
              <ChevronLastIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
