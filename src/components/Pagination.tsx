import React, { useState } from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

    const handlePageChange = (page: number) => {
        onPageChange(page);
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button className={`${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} inline-block mx-1 px-3 py-2 rounded-md cursor-pointer`} onClick={() => handlePageChange(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="my-10">
            <ul className="flex list-none justify-center">
                <li className="mr-2">
                    <button className={`${currentPage === 1 ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"} px-3 py-2 rounded-md`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                </li>
                {renderPageNumbers()}
                <li className="ml-2">
                    <button className={`${currentPage === totalPages ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"} px-3 py-2 rounded-md`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
