import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userRole = useSelector(state => state.auth.role);
    const [products, setProducts] = useState([]);

    const handleAddProduct = () => {
        navigate('/products');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    const navigateToCategories = () => {
        navigate('/categories');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Token is missing');
                }

                const response = await fetch('/api/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

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
                        <li onClick={navigateToCategories}>Categories</li>
                        <li>Profile</li>
                        { isAuthenticated && <li onClick={handleLogout}>Sign Out</li> }
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
                        {/* <span>Image</span> */}
                        <span>Product</span>
                        {/* <span>Description</span> */}
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Category</span>
                        <span>Actions</span>
                    </li>
                    
                {Array.isArray(products) && products.map(product => (
                    <li key={product.id}>
                     {/* <span className='prod-image'> */}
                       {/* <img src={`/uploads/${product.image}`} alt={product.name} className="product-image"/> */}
                     {/* </span> */}
                     <span className='prod prod-name'>{product.name}</span>
                     {/* <span className='prod-desc'>{product.description}</span> */}
                     <span className='prod'>${product.price}</span>
                     <span className='prod'>{product.stock}</span>
                     <span className='prod'>{product.category.name}</span>
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
