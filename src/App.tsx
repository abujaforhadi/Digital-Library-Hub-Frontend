import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BorrowSummary from './pages/BorrowSummary';
import BooksList from './pages/BooksList';
import CreateBook from './pages/CreateBook';
import UpdateBook from './pages/UpdateBook';
import BorrowBook from './pages/BorrowBook';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/borrow-summary" element={<BorrowSummary />} />
            <Route path="/edit-book/:id" element={<UpdateBook />} />
            <Route path="/borrow/:id" element={<BorrowBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;