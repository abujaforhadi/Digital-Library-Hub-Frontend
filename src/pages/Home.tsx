import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Home = () => {
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book List</h2>

      <div className="flex justify-end mb-4">
        <Button onClick={() => console.log('Add New Book')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
          Add New Book
        </Button>
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
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
              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleEdit(book.id)} variant="outline" className="px-2 py-1 text-sm">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(book.id)} variant="destructive" className="px-2 py-1 text-sm">
                  Delete
                </Button>
                <Button
                  onClick={() => handleBorrow(book.id)}
                  disabled={book.copies === 0}
                  variant="success"
                  className={`px-2 py-1 text-sm ${book.copies === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Borrow
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
};

export default Home;