'use client';
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const loadCart = async () => {
            const userId = localStorage.getItem('userId');
            
            if (!userId) return; 

            try {
                // Try to fetch the user's specific file
                const res = await fetch(`/UserCartDataFolder/cartdatauser${userId}.json`);
                
                if (res.ok) {
                    // File exists: Load data
                    const data = await res.json();
                    setCartItems(data);
                    
                    const totalCost = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                    setTotal(totalCost);
                } else {
                    // File does NOT exist (404): Set cart to empty
                    // This happens when a user logs in but hasn't added anything yet
                    console.log("Cart is empty (file not found)");
                    setCartItems([]); 
                    setTotal(0);
                }
            } catch (error) {
                console.error("Failed to load cart", error);
                setCartItems([]); // Fallback to empty
            }
        };

        loadCart();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <div className="font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    
                    <div className="text-right pt-4">
                        <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}