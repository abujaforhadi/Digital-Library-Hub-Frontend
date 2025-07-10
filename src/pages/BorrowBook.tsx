import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "@/redux/features/book/booksSlice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BorrowBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  console.log(id)

  const { data: bookData, isLoading } = useGetBookByIdQuery(id!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (bookData?.data) {
      setQuantity(1);
    }
  }, [bookData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData?.data) return;

    if (quantity > bookData.data.copies) {
      alert("Quantity cannot exceed available copies.");
      return;
    }

    try {
      await borrowBook({
        book: id!, // ✅ FIXED: used id instead of bookId
        quantity,
        dueDate,
      }).unwrap();

      alert("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      console.error(err);
      alert("Failed to borrow book.");
    }
  };

  if (isLoading || !bookData?.data) {
    return <p className="text-center mt-6">Loading book information...</p>;
  }

  const { title, copies } = bookData.data;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Borrow Book: <span className="text-blue-600">{title}</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="quantity">Quantity (Max {copies})</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={copies}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isBorrowing}>
          {isBorrowing ? "Processing..." : "Borrow"}
        </Button>
      </form>
    </div>
  );
};

export default BorrowBook;
