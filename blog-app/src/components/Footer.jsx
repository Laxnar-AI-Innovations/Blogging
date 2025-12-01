import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-ink-900 font-serif font-bold text-lg">I</span>
              </div>
              <span className="font-serif text-xl font-semibold text-white">
                Inkwell
              </span>
            </Link>
            <p className="text-ink-400 max-w-md leading-relaxed">
              A sanctuary for thoughtful writing. Where ideas flow freely and stories 
              find their readers. Join our community of curious minds.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="p-2 hover:bg-ink-800 rounded-lg transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 hover:bg-ink-800 rounded-lg transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 hover:bg-ink-800 rounded-lg transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/topics" className="hover:text-white transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/write" className="hover:text-white transition-colors">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-500">
            © {currentYear} Inkwell. All rights reserved.
          </p>
          <p className="text-sm text-ink-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-accent fill-accent" /> for writers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
