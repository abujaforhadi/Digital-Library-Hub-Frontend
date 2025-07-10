import BooksList from "@/pages/BooksList";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";
import AddBook from "@/pages/CreateBook";
import Home from "@/pages/Home";
import UpdateBook from "@/pages/UpdateBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <BooksList />,
  },
  {
    path: "/create-book",
    element: <AddBook />,
  },
  {
    path: "/edit-book/:id",
    element: <UpdateBook/>

  },
  {
    path: "/borrow/:bookId",
    element: <BorrowBook />,
  },
  {
    path:"/borrow-summary",
    element: <BorrowSummary />
  }

]);