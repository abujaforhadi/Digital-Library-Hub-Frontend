import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  BookOpen, User, Hash, Tag, FileText, Copy, Calendar,
  Edit3, Trash2, ArrowLeft, CheckCircle, XCircle,
  AlertTriangle, Share2, Heart, Bookmark
} from 'lucide-react';
import { useGetBookByIdQuery, useDeleteBookMutation } from '@/redux/features/book/booksSlice';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const [deleteBook] = useDeleteBookMutation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const book = data?.data;

  const handleDelete = async () => {
    await deleteBook(book._id);
    setShowDeleteModal(false);
    navigate('/books');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBorrow = () => navigate(`/borrow/${book._id}`);

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Failed to load book details.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back */}
        <div className="mb-6">
          <Link to="/books" className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Books
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
              <p className="text-gray-500 text-lg">by {book.author}</p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-full ${isFavorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full ${isBookmarked ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleShare} className="p-2 rounded-full bg-gray-200 text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Sidebar */}
            <div>
              <div className="mb-6">
                <img
                  src={book.coverImage || 'https://via.placeholder.com/150x220.png?text=No+Cover'}
                  alt={book.title}
                  className="w-full h-auto object-cover rounded-md shadow-md"
                />
              </div>
              <div className="text-center space-y-2">
                {book.available ? (
                  <p className="text-green-600 font-semibold flex justify-center items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Available
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold flex justify-center items-center gap-2">
                    <XCircle className="w-5 h-5" /> Not Available
                  </p>
                )}
                <p className="text-gray-600">{book.copies} copies in stock</p>
              </div>
              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleBorrow}
                  disabled={!book.available}
                  className={`w-full py-2 rounded-md font-medium ${
                    book.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Borrow
                </button>
                <Link
                  to={`/edit-book/${book._id}`}
                  className="block w-full text-center py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  <Edit3 className="inline w-4 h-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>

            {/* Description + Metadata */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Description
                </h2>
                <p className="text-gray-700 mt-2">{book.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<User className="w-5 h-5 text-blue-500" />} label="Author" value={book.author} />
                <InfoItem icon={<Tag className="w-5 h-5 text-green-500" />} label="Genre" value={book.genre} />
                <InfoItem icon={<Hash className="w-5 h-5 text-purple-500" />} label="ISBN" value={book.isbn} />
                <InfoItem icon={<Copy className="w-5 h-5 text-yellow-500" />} label="Copies" value={book.copies} />
                {book.publishedDate && (
                  <InfoItem
                    icon={<Calendar className="w-5 h-5 text-red-500" />}
                    label="Published"
                    value={new Date(book.publishedDate).toLocaleDateString()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Book</h3>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <strong>{book.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Info Item
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: any }) => (
  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export default BookDetails;
