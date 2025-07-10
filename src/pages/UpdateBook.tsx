import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/booksSlice";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const GENRE_OPTIONS = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const UpdateBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
    available: true,
  });

  useEffect(() => {
    if (data?.data) {
      const book = data.data;
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
        available: book.available ?? true,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBook({
        id: id!,
        data: { ...formData, copies: Number(formData.copies) },
      }).unwrap();
      alert("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update book.");
    }
  };

  if (isLoading || !formData.genre) {
    return <p className="text-center mt-6">Loading book data...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-6 text-red-500">
        Error loading book: {(error as any)?.message}
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="genre">Genre</Label>
          <Select
            value={formData.genre}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, genre: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRE_OPTIONS.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>

        <div>
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            name="copies"
            type="number"
            min={0}
            value={formData.copies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={formData.available}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                available: checked as boolean,
              }))
            }
          />
          <Label htmlFor="available">Available</Label>
        </div>

        <Button type="submit" disabled={isUpdating} className="w-full">
          {isUpdating ? "Updating..." : "Update Book"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateBook;
