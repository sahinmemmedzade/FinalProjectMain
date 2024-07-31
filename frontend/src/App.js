import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet, ScrollRestoration } from 'react-router-dom';
import './App.css';
import PrivateRoute from './admin/PrivateRoute.jsx';
import SignupForm from './auth/signup';
import Home from './Home';
import Login from './auth/login';
import ResendPassword from './auth/ResendPassword';
import NewsTicker from './homepage/newsticker';
import BottomDiv from './homepage/advertisiment';
import Sidebar from './sidebar.jsx';
import Footer from './footer.jsx';
import AboutUs from './About.jsx';
import CarouselHome from './homepage/carousel.jsx';
import Menu from './homepage/menu.jsx';
import Article from './article/Article.jsx';
import AdComponent from './anouncement.jsx';
import CardPagination from './pages/sport.jsx';
import ErrorPage from './error.jsx';
import LoadingPage from './loadingpage.jsx';
import AdminPanel from './admin/admin.jsx';
import Advertisiment from '../src/advertisiment/advertisiment.jsx';
import Sidebararticle from './article/sidebararticle.jsx';
import VideoDisplay from './video/videodisplay.jsx';
import LiveVideo from './pages/livevideo.jsx';
import AdminLogin from './admin/adminlogi.jsx';

function Layout() {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const hideMenuAndSidebar = ['/signup', '/login', '/login/resend-password', '/adminim'].includes(pathname);
  const hideNewsTicker = ['/signup', '/login', '/login/resend-password', '/adminim'].includes(pathname);
  const hideFooter = ['/signup', '/login', '/login/resend-password', '/adminim'].includes(pathname);


  return (
    <div className="App">
      {!hideNewsTicker && <NewsTicker />}
      {!hideMenuAndSidebar && <Menu />}
      {!hideMenuAndSidebar && <Sidebar className="Sidebar" />}
      <main>
        <Outlet /> {/* Placeholder for route components */}
      </main>
      {!hideFooter && <Footer />}

      {/* Footer should be always visible at the bottom */}
    </div>
  );
}


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 second loading time
  }, []);




  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/news/:id" element={<Article />} />
          <Route path='/anounce' element={<Advertisiment />} />
          <Route path="/api/newssidebar/sidebar-news/:id" element={<Sidebararticle />} /> {/* Sidebar üçün route */}
          <Route path="/videolar" element={<VideoDisplay />} /> {/* Sidebar üçün route */}
          <Route path="/livevideo" element={<LiveVideo />} /> {/* Sidebar üçün route */}

          <Route
            path="/adminim"
            element={<PrivateRoute element={<AdminPanel />} />}
          />
            <Route path="/adminlogin" element={<AdminLogin />} />

          <Route path='/anouncement' element={<AdComponent />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/resend-password" element={<ResendPassword />} />
          <Route path='/category/:id' element={<CardPagination />} />

          <Route path='*' element={<ErrorPage />} />

          {/* Add other routes as needed */}
        </Route>
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
