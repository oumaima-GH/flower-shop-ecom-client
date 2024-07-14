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
    const [categoryFilter, setCategoryFilter] = useState('All Products'); 
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3; 

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

    const navigateToShop = () => {
        navigate('/shop');
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

    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter === 'All Products' || product.category.name === categoryFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className='dashboard-title' onClick={navigateToDashboard}>Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={handleAddProduct}>Products</li>
                        <li onClick={navigateToCategories}>Categories</li>
                        <li>Orders</li>
                        <li onClick={navigateToShop}>My Shop</li>
                        <li>Profile</li>
                        { isAuthenticated && <li onClick={handleLogout}>Sign Out</li> }
                    </ul>
                </nav>
            </aside>
            <div className="main-content">
                <h2 className='list-product-title'>List of Products</h2>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search Item..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="All Products">All Products</option>
                        <option value="Flower">Flower</option>
                        <option value="Rose">Rose</option>
                    </select>
                    <button className="add-product-button" onClick={handleAddProduct}>Add</button>
                </div>
                <ul className="product-list">
                    <li className="product-list-header">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Category</span>
                        <span>Actions</span>
                    </li>
                    {currentProducts.map(product => (
                        <li key={product.id}>
                            <span className='prod prod-name'>{product.name}</span>
                            <span className='prod'>${product.price.toFixed(2)}</span>
                            <span className='prod'>{product.stock}</span>
                            <span className='prod'>{product.category.name}</span>
                            <div>
                                <button>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => goToPage(index + 1)} className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
