import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/features/book/booksSlice';
import { Link } from 'react-router';

const BooksList = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data || [];

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as any)?.message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Link to="/create-book">
          <Button>Add New Book</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.copies > 0 ? (
                  <span className="text-green-600 font-semibold">Available</span>
                ) : (
                  <span className="text-red-600 font-semibold">Unavailable</span>
                )}
              </TableCell>
              <TableCell className="space-x-2">
                <Link to={`/books/${book._id}`}>
                  <Button variant="secondary" size="sm">Details</Button>
                </Link>
                <Link to={`/edit-book/${book._id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
                <Link to={`/borrow/${book._id}`}>
                  <Button size="sm">Borrow</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BooksList;
