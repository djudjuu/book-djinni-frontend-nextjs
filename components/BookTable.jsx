import Table from "rc-table";
import router from "next/router";
import { useBooks } from "utils/hooks";
import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";

const BookTable = ({ books }) => {
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];

  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
  };

  // function to deleteBook by making a delete request to the api
  const deleteBook = async (book) => {
    const res = await axios.delete(`/api/books/${book.id}`);

    if (res.status === 200) {
      // redirect to /book
      router.push("/book");
    }
  };

  const data = books.map((book) => ({
    key: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    categories: book.categories.map((category) => category.value).join(", "),
    actions: (
      <Box>
        <Button onClick={() => editBook(book)}>Edit</Button>
        <Button onClick={() => deleteBook(book)}>Delete</Button>
      </Box>
    ),
  }));

  return (
    <Box>
      <Table columns={columns} data={data} />
    </Box>
  );
};

export default BookTable;
