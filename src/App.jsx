
import './App.css'
import About from './components/About/About'
import BestSelling from './components/BestSelling/BestSelling'
import CallToAction from './components/CallToAction/CallToAction'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Testimonials from './components/Tesimonials/Testimonials'
function App() {


  return (
    <div className='App'>
      <Header />
      <Hero />
      <Features />
      <About />
      <BestSelling />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default App
