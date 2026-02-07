'use client';
import styles from "./main.module.css";
import ProductCard from "./Our Products/ProductCard";
// import productImg from '../images/img.jpg';
import Pagination from "./PaginationUI/Pagination";
import { useState, useEffect } from "react";

export default function Main() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Optional: scroll to top on page change
    };


    useEffect(() => {
        fetch(`/OurPublic%20Product/ProductJsonFile/product_page${currentPage}.json`)
            .then((response) => response.json())
            .then((data) => {
                // Ensure data.products is an array before setting state
                if (data && data.products) {
                    setItems(data.products);
                    setTotalPages(data.metadata?.totalPages || 1);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [currentPage]);

    

    // Safety check: Don't render if items is empty/null (optional, prevents layout shift)
    if (items.length === 0) {
        return <div className="p-4 text-center">Loading products...</div>;
    }

    return (
        <main>
            <h2 className="p-4 bg-blue-500 text-xl text-white">Our Products</h2>
            <p className="text-center p-3 bg-pink-100">Explore our wide range of products and find the perfect items for you!</p>

            {/* FIX: Change 'product' to 'items' to match the variable name used in ProductCard.js */}
            <ProductCard items={items} />
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </main>
    )
}