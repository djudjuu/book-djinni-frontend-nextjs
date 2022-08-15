import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import { backendFetcher } from "utils/fetcher";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";
import { useCategories, useBook } from "utils/hooks";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ bookId, book }) {
  const { categories, categoriesError, categoriesLoading } = useCategories();
  // const { book, error: bookError, isLoading: bookLoading } = useBook(bookId);
  const bookLoading = false;
  const bookError = false;

  // if categories are loading, show loading message
  if (categoriesLoading || bookLoading) {
    return <div>Loading...</div>;
  }

  // if error, render error message
  if (bookError || categoriesError) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <AddEdit bookId={bookId} book={book} categories={categories} />
      {/* <AddEdit bookId={bookId} categories={categories} /> */}
    </Layout>
  );
}

export default Book;

export async function getServerSideProps({ req, res, query }) {
  const bookId = query.id;
  if (!bookId) {
    return { props: { book: null, bookId: null } };
  }
  try {
    const book = await backendFetcher.get(`/books/${bookId}`);
    return {
      props: {
        book,
        bookId,
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
