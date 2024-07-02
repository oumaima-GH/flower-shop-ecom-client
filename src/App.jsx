import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import './App.css';
import About from './components/About/About';
import BestSelling from './components/BestSelling/BestSelling';
import CallToAction from './components/CallToAction/CallToAction';
import Features from './components/Features/Features';
import Hero from './components/Hero/Hero';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import LoginPage from './pages/LoginPage/LoginPage';
import Testimonials from './components/Tesimonials/Testimonials';
import MainLayout from './components/Layout';
import Register from './pages/Register/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <Features />
                      <BestSelling />
                      <Testimonials />
                      <CallToAction />
                    </>
                  } />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
