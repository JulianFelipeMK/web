import React, { Component } from 'react'

const Pagination = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {

    const pagesNumbers = []

    for (let index = 1; index <= Math.ceil(totalRecords / recordsPerPage); index++) {
        pagesNumbers.push(index)
    }

    console.log(currentPage)
    return (
        <ul class="pagination">
            {pagesNumbers.map(item => (
                <li className={currentPage === item ? "active" : ""}><a href="#!" onClick={() => paginate(item)}>{item}</a></li>
            ))}
        </ul>
    )
}

export default Pagination
