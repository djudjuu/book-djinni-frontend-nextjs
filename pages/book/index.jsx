import BookTable from "components/BookTable";
import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "../_error";
import { useBooks } from "utils/hooks";
import useSWR, { useSWRConfig } from "swr";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;

const ListBooks = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  // function to push to edit page
  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
    mutate("/books");
  };

  // function to deleteBook by making a delete request to the api
  const deleteBook = async (book) => {
    const url = `${baseUrl}/books/${book.id}`;
    const res = await axios.delete(url);

    // trigger refetch of books
    mutate("/books");
    if (res.status === 200) {
      // redirect to /book
      router.push("/book");
    }
  };

  return (
    <Layout>
      {/* <Link as={"/add"} href="/book/edit"> */}
      <Link href="/book/edit">
        <a>Add a new book</a>
      </Link>
      <BookTable editBook={editBook} deleteBook={deleteBook} />
    </Layout>
  );
};

export default ListBooks;
