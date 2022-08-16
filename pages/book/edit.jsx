import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";
import { removeBooksFromCategories } from "utils/hooks";
import { backendFetcher } from "utils/fetcher";

// component that adds a book by making a post request to the api
function Book({ bookId, book, categories }) {
  // TODO some loading indication somewhere e.g. in Layout
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // trick to refetch the props taken from
  // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const refreshData = () => {
    router.replace(router.asPath);
    // router.replace("/book");
    setIsRefreshing(true);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [book]);

  const updateBook = async (data) => {
    await axios.put(`/api/books/${bookId}`, data);
    refreshData();
  };

  return (
    <Layout>
      <AddEdit
        bookId={bookId}
        book={book}
        categories={categories}
        updateBook={updateBook}
      />
    </Layout>
  );
}

export default Book;

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3, stale-while-revalidate=59"
  );

  const bookId = query.id;
  if (!bookId) {
    return { props: { book: null, bookId: null } };
  }
  try {
    const book = await backendFetcher.get(`/books/${bookId}`);
    const categories = await backendFetcher.get(`/categories`);
    return {
      props: {
        book,
        bookId,
        categories: removeBooksFromCategories(categories),
        error: false,
      },
    };
  } catch (error) {
    // console.log("err", error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}
