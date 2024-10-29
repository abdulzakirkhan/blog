import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBlogForm from './pages/AddBlogForm';
import Footer from './components/Footer';
import AllBlogs from './pages/AllBlogs';
import BlogDetails from './pages/BlogDetails';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const trackingId = "G-41K386CDGC"; // Your GA4 tracking ID
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize(trackingId);

    // Track the initial page view
    ReactGA.send("pageview", location.pathname + location.search);
  }, [trackingId, location]);

  useEffect(() => {
    // Track page views on route changes
    ReactGA.send("pageview", location.pathname + location.search);
  }, [location]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-blog' element={<AddBlogForm />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
