import Table from "rc-table";
import router from "next/router";
import { useBooks } from "utils/hooks";

// component to present all books in a table
const BookTable = ({ deleteBook, editBook }) => {
  const { books, error, isLoading } = useBooks();

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div> loading...</div>;
  }

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    { title: "Categories", dataIndex: "categories", key: "categories" },
    { title: "Actions", dataIndex: "actions", key: "actions" },
  ];
  // log books to console for debugging
  // console.log("books", books);

  const data = books.map((book) => ({
    key: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    categories: book.categories.map((category) => category.value).join(", "),
    actions: (
      <div>
        <button onClick={() => editBook(book)}>Edit</button>
        <button onClick={() => deleteBook(book)}>Delete</button>
      </div>
    ),
  }));

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default BookTable;
