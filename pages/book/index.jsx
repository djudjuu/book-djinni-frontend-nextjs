import BookTable from "components/BookTable";
import Layout from "components/Layout";
import Link from "next/link";
import { backendFetcher } from "utils/fetcher";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "../_error";
import { useBooks } from "utils/hooks";
import useSWR, { useSWRConfig, SWRConfig } from "swr";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;

const ListBooks = ({ fallback }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

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

  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        {/* <Link as={"/add"} href="/book/edit"> */}
        <Link href="/book/edit">
          <a>Add a new book</a>
        </Link>
        <BookTable editBook={editBook} deleteBook={deleteBook} />
      </Layout>
    </SWRConfig>
  );
};

export default ListBooks;

// is executed on the server side.
// preload the books that will be used inside the booktable
export async function getStaticProps() {
  const books = await backendFetcher.get(`/books`);
  return {
    props: {
      fallback: {
        "/api/books": books,
      },
    },
  };
}
