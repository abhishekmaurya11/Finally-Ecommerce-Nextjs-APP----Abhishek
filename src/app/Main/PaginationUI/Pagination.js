import styles from "./pagination.module.css"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // onPageChange = (page) => {
    //     console.log(`Page changed to: ${page}`);

    // };

         



    return (
        <div className={`${styles.pagination} flex justify-center my-4`}>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`${styles.pageButton} mx-1 px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>       

            ))}
        </div>
    );
}

