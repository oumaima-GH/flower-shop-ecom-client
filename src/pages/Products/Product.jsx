import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

// Mapping of category names to their corresponding IDs
const categoryMapping = {
    'Flower': 1,
    'Rose': 2,
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

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === 'file' ? files[0] : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataForApi = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'categoryId') {
                const categoryId = categoryMapping[formData[key]];
                formDataForApi.append('categoryId', categoryId);
            } else {
                formDataForApi.append(key, formData[key]);
            }
        });

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataForApi
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server response:', errorResponse);
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Product added successfully:', result);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className='dashboard-title' onClick={navigateToDashboard}>Dashboard</h2>
                <nav>
                    <ul>
                        <li>Products</li>
                        <li>Categories</li>
                        <li>Profile</li>
                        <li>Sign Out</li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <h2 className='add-product-title'>Add Product</h2>
                <form className="add-product-form" onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Enter product name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <input 
                            type="file" 
                            name="image"
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            placeholder="Enter product description" 
                            value={formData.description} 
                            onChange={handleInputChange} 
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
                        />
                    </div>
                    <div className="form-group price-stock-categ">
                        <label>Category</label>
                        <select 
                            name="categoryId" 
                            value={formData.categoryId} 
                            onChange={handleInputChange}
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