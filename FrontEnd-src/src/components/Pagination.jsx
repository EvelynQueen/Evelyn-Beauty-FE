import { memo } from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-3 py-1 mx-1 border rounded transition ${
          page === 1 ? "opacity-50" : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Prev
      </button>

      <span className="px-3 py-1 mx-1 font-medium">
        {page} / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-3 py-1 mx-1 border rounded transition ${
          page === totalPages
            ? "opacity-50"
            : "hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default memo(Pagination);
