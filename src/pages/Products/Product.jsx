import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const categoryMapping = {
    'Flower': 4,
    'Rose': 5,
};

const Products = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        categoryId: '', 
        description: '',
        image: null
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === 'file' ? files[0] : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('categoryId', categoryMapping[formData.categoryId]);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server response error:', errorResponse);
                throw new Error(errorResponse.message || 'Network response was not ok');
            }

            const result = await response.json();
            console.log('Product added successfully:', result);

            setSuccessMessage('Product added successfully!');
            setFormData({
                name: '',
                price: '',
                stock: '',
                categoryId: '', 
                description: '',
                image: null
            });
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/dashboard');
            }, 1000); 
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    const navigateToCategories = () => {
        navigate('/categories');
    };

    const navigateToOrders = () => {
        navigate('/orders');
    };

    const navigateToShop = () => {
        navigate('/shop');
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className='dashboard-title' onClick={navigateToDashboard}>Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/products')}>Products</li>
                        <li onClick={navigateToCategories}>Categories</li>
                        <li onClick={navigateToOrders}>Orders</li>
                        <li onClick={navigateToShop}>My Shop</li>
                        <li>Profile</li>
                        <li onClick={handleSignOut}>Sign Out</li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <h2 className='add-product-title'>Add Product</h2>
                <form className="add-product-form" method="POST" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Enter product name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <input 
                            type="file" 
                            name="image"
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            placeholder="Enter product description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    <div className="form-group price-stock-categ">
                        <label>Price</label>
                        <input 
                            type="number" 
                            name="price"
                            placeholder="Enter price" 
                            value={formData.price} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    <div className="form-group price-stock-categ">
                        <label>Stock</label>
                        <input 
                            type="number" 
                            name="stock"
                            placeholder="Enter stock quantity" 
                            value={formData.stock} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    <div className="form-group price-stock-categ">
                        <label>Category</label>
                        <select 
                            name="categoryId" 
                            value={formData.categoryId} 
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="Flower">Flower</option>
                            <option value="Rose">Rose</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default Products;
