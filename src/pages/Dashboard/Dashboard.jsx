import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const handleAddProduct = () => {
        navigate('/products');
    };

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                // console.log('Token:', token);

                if (!token) {
                    throw new Error('Token is missing');
                }

                const response = await fetch('/api/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // console.log('Response:', response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                // console.log('Result:', result);

                if (result.status === 'success' && Array.isArray(result.data)) {
                    setProducts(result.data);
                } else {
                    console.error('Expected an array but got:', result.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');
        if (!isConfirmed) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token is missing');
            }

            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.status === 'success') {
                setProducts(products.filter(product => product.id !== productId));
            } else {
                console.error('Failed to delete the product:', result.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className='dashboard-title' onClick={navigateToDashboard}>Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={handleAddProduct}>Products</li>
                        <li>Categories</li>
                        <li>Profile</li>
                        <li>Sign Out</li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <h2 className='list-product-title'>List of Products</h2>
                <div className="filters">
                    <input type="text" placeholder="Search Item..." />
                    <select>
                        <option>All Products</option>
                        <option>Flower</option>
                        <option>Rose</option>
                    </select>
                    <button className="add-product-button" onClick={handleAddProduct}>Add</button>
                </div>
                <ul className="product-list">
                    <li className="product-list-header">
                        <span>Image</span>
                        <span>Product Name</span>
                        <span>Description</span>
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Category</span>
                        <span>Actions</span>
                    </li>
                    {Array.isArray(products) && products.map(product => (
                        <li key={product.id}>
                            <span className='prod-image'>{product.image}</span>
                            <span className='prod-name'>{product.name}</span>
                            <span className='prod-desc'>{product.description}</span>
                            <span className='prod-price'>${product.price}</span>
                            <span className='prod-stock'>{product.stock}</span>
                            <span className='prod-categ'>{product.category.name}</span>
                            <div>
                                <button>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
