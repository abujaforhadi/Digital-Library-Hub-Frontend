import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useCreateBookMutation } from '@/redux/features/book/booksSlice';

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });

  const [formError, setFormError] = useState('');
  const isDisabled =
    !formData.title ||
    !formData.author ||
    !formData.genre ||
    !formData.isbn ||
    formData.copies < 0;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : type === 'number' ? +value : value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (formData.copies < 0) {
      setFormError('Copies cannot be negative');
      return;
    }

    try {
      await createBook(formData).unwrap();
      alert('Book added successfully!');
      navigate('/books');
    } catch (err) {
      setFormError('Failed to add book.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">📚 Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Optional description about the book..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Copies</label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            min={0}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Available Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Available for Borrow</label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-center">
          {formError && (
            <p className="text-red-600 mb-2 font-medium">{formError}</p>
          )}
          <Button
            type="submit"
            disabled={isDisabled || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            {isLoading ? 'Saving...' : 'Add Book'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
