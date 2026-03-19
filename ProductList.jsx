import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();
    
    // Sub Question 7 & 8: Dynamic cart count from Redux
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores from the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air.", cost: "$20" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283036_1280.jpg", description: "Purifies air and heals skin.", cost: "$10" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Large leaves absorb toxins.", cost: "$25" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?m", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma, used in cooking.", cost: "$15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/20/mint-1126282_1280.jpg", description: "Refreshing aroma, used in beverages.", cost: "$12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress.", cost: "$14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Sweet fragrance, vibrant flowers.", cost: "$22" },
                { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/08/18/09/01/jasmine-2654255_1280.jpg", description: "Exotic scent, blooms at night.", cost: "$26" }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?m", description: "Thrives in low light.", cost: "$25" },
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816941_1280.jpg", description: "Easy to propagate and grow.", cost: "$10" },
                { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Succulent with thick leaves.", cost: "$15" },
                { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/16/15/41/aspidistra-2071721_1280.jpg", description: "Extremely durable.", cost: "$20" },
                { name: "Succulent", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Requires minimal watering.", cost: "$8" },
                { name: "Cactus", image: "https://cdn.pixabay.com/photo/2015/04/10/00/41/cactus-715713_1280.jpg", description: "Perfect for sunny windowsills.", cost: "$12" }
            ]
        }
    ];

    // Sub Question 3 & 4: Dispatch and Disable logic
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true,
        }));
    };

    return (
        <div>
            {/* Sub Question 5 & 6: Navbar implementation */}
            <nav className="navbar">
                <div className="nav-logo">Paradise Nursery</div>
                <div className="nav-links">
                    <a href="#" onClick={() => window.location.reload()}>Home</a>
                    <a href="#" onClick={() => setShowCart(false)}>Plants</a>
                    <a href="#" onClick={() => setShowCart(true)} className="cart-icon">
                        <svg width="30" height="30" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                        <span className="cart-count">{totalQuantity}</span>
                    </a>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            {/* Sub Question 2: Category Heading */}
                            <h1 className="category-title">{category.category}</h1>
                            <div className="plant-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="plant-card" key={plantIndex}>
                                        <img className="plant-image" src={plant.image} alt={plant.name} />
                                        <div className="plant-name">{plant.name}</div>
                                        <div className="plant-cost">{plant.cost}</div>
                                        <div className="plant-desc">{plant.description}</div>
                                        {/* Sub Question 4: Disabled prop linked to addedToCart */}
                                        <button 
                                            className={`add-to-cart-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
