import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import './Category.css';

const categoryMapping = {
    'Flower': 1,
    'Rose': 2,
};

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [editing, setEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        if (token) {
            fetchCategories();
        }
    }, [token]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.data); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newCategory }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            const data = await response.json();
            setCategories([...categories, data.data]); 
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = (category) => {
        setEditing(true);
        setCurrentCategory(category);
        setNewCategory(category.name);
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await fetch(`/api/categories/${currentCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newCategory }),
            });
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            const data = await response.json();
            setCategories(categories.map(cat => (cat.id === currentCategory.id ? data.data : cat)));
            setEditing(false);
            setNewCategory('');
            setCurrentCategory({});
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this category?');
            if (!confirmed) {
                return;
            }

            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const navigateToDashboard = () => {
        navigate('/dashboard');
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
                        <li>Categories</li>
                        <li>Orders</li>
                        <li onClick={navigateToShop}>My Shop</li>
                        <li>Profile</li>
                        <li onClick={handleLogout}>Sign Out</li>
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <div className="category-container">
                    <h2>List of Categories</h2>
                    <div className="category-actions">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category name"
                        />
                        {editing ? (
                            <button onClick={handleUpdateCategory}>Update</button>
                        ) : (
                            <button onClick={handleAddCategory}>Add</button>
                        )}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Category;
