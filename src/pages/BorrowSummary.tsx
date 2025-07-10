import { useGetBorrowSummaryQuery } from "@/redux/features/book/booksSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

const BorrowSummary = () => {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;
  if (isError)
    return (
      <p className="text-red-600">
        Error: {(error as any)?.message || "Failed to load borrow summary."}
      </p>
    );

  const summary = data?.data || [];

  return (
    <Card className="max-w-4xl mx-auto p-6 mt-10">
      <Heading size="lg" className="mb-6">
        Borrow Summary
      </Heading>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity Borrowed</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {summary.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No borrow data available.
              </TableCell>
            </TableRow>
          )}

          {summary.map((item: any) => (
            <TableRow key={item.bookId}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default BorrowSummary;
