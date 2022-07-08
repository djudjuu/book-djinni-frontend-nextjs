import BookTable from "components/BookTable";
import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

const ListBooks = ({ books }) => {
  const router = useRouter();

  // function to push to edit page
  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
  };

  // function to deleteBook by making a delete request to the api
  const deleteBook = async (book) => {
    const url = `${baseUrl}/api/v1/books/${book.id}`;
    const res = await axios.delete(url);
    if (res.status === 200) {
      // redirect to /book
      router.push("/book");
    }
  };

  return (
    <Layout>
      <Link as={"/add"} href="/book/edit">
        <a>Add a new book</a>
      </Link>
      <BookTable books={books} editBook={editBook} deleteBook={deleteBook} />
    </Layout>
  );
};

export default ListBooks;

export async function getServerSideProps({ req, res, query }) {
  const book_url = `${baseUrl}/api/v1/books`;
  // fetch data from book_url and save it to books
  const books = await fetch(book_url).then((res) => res.json());
  // return the books in the props
  return { props: { books } };
}
