import Table from "rc-table";
import router from "next/router";
import { useBooks } from "utils/hooks";
import { useSWRConfig } from "swr";

// component to present all books in a table
const BookTable = () => {
  const { books, error, isLoading } = useBooks();
  const { mutate } = useSWRConfig();

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div> loading...</div>;
  }

  // function to push to edit page
  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
  };

  // function to deleteBook by making a delete request to the api
  const deleteBook = async (book) => {
    const res = await axios.delete(`/api/books/${book.id}`);

    // trigger refetch of books
    mutate("/api/books");
    if (res.status === 200) {
      // redirect to /book
      router.push("/book");
    }
  };

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
