import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LibraryHub</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A modern library management system designed to streamline book management, 
              borrowing, and tracking. Built with React, TypeScript, and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/books" className="hover:text-white transition-colors">
                  Browse Books
                </a>
              </li>
              <li>
                <a href="/create-book" className="hover:text-white transition-colors">
                  Add New Book
                </a>
              </li>
              <li>
                <a href="/borrow-summary" className="hover:text-white transition-colors">
                  Borrow Summary
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Book Management</li>
              <li>Borrow Tracking</li>
              <li>Inventory Control</li>
              <li>Real-time Updates</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 LibraryHub. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center space-x-1 mt-2 md:mt-0">
            <span>Made with</span>
            <span>by the LibraryHub Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;