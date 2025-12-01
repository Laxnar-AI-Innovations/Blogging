import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Article from './pages/Article';
import Write from './pages/Write';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without standard layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
        
        {/* Pages with standard layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/article/:id" element={<Layout><Article /></Layout>} />
        <Route path="/profile/:username" element={<Layout><Profile /></Layout>} />
        <Route path="/bookmarks" element={<Layout><Bookmarks /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
