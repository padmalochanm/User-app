import React from 'react'

const Pagination = ({currPage, paginate}) => {
    const handlePrevClick = () => {
        if (currPage > 1) {
            paginate(currPage - 1);
        }
    };

    const handleNextClick = () => {
        paginate(currPage + 1);
    };

    return (
        <div>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <button onClick={handlePrevClick} class="page-link">Previous</button>
                    </li>
                    <li class="page-item"><button class="page-link" onClick={()=>paginate(currPage)}>{currPage}</button></li>                   
                    <li class="page-item">
                        <button onClick={handleNextClick} class="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
