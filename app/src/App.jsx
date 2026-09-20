import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import SignIn from './pages/auth/SignIn';
import UserProfile from './pages/auth/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import Contact from './pages/contact/Contact';
import Fixtures from './pages/fixtures/Fixtures';
import Results from './pages/results/Results';
import Standings from './pages/standings/Standings';

function App() {
  return (
    <Routes>
      {/* // ~Layouts */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* // ?Auth */}
        <Route path="/signin" element={<SignIn />} />
        {/* // *Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        {/* // *Public Routes */}
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        {/* // *Contact */}
        <Route path="/contact" element={<Contact />} />
        {/* //*Fixtures */}
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/results" element={<Results />} />
        <Route path="/standings" element={<Standings />} />
      </Route>
        {/* // !Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;