'use client'; // 1. THIS IS REQUIRED
import styles from './ProductCard.module.css';
import Image from "next/image";
import { useState } from "react"; // 2. Import useState

export default function ProductCard({ items }) {
    const [status, setStatus] = useState(""); // To show "Added!" message

    // 3. This function sends the product to the API
    const handleAddToCart = async (product) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert("Please login first!");
            return;
        }

        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, product }),
            });

            if (res.ok) {
                setStatus("Added to Cart!");
                setTimeout(() => setStatus(""), 2000); // Clear message after 2s
            } else {
                setStatus("Failed to add");
            }
        } catch (error) {
            console.error(error);
            setStatus("Error adding to cart");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Product List</h1>
            <div className="grid grid-cols-2 gap-4">
                {items?.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow flex flex-col">
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-blue-600 mb-2">${product.price}</p>
                        
                        <div className="mt-auto">
                            {/* 4. Add the onClick handler here */}
                            <button 
                                onClick={() => handleAddToCart(product)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                            >
                                Add to Cart
                            </button>
                            <p className="text-xs text-green-700 text-center mt-1 h-4">{status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}