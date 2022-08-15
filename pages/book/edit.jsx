import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";
import { useCategories, useBook } from "utils/hooks";
import { backendFetcher } from "utils/fetcher";
import { SWRConfig } from "swr";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ bookId, book, fallback, error }) {
  // function Book({ fallback, error }) {
  const { categories, categoriesError, categoriesLoading } = useCategories();
  // const bookError = false;

  // if categories are loading, show loading message
  // if (categoriesLoading || bookLoading) {
  // if (categoriesLoading) {
  //   return <div>Loading...</div>;
  // }

  // if error, render error message
  if (categoriesError) {
    // if (error) {
    return <div>Error</div>;
  }

  return (
    // <SWRConfig value={{ fallback }}>
    <Layout>
      <AddEdit bookId={bookId} book={book} categories={categories} />
      {/* <AddEdit bookId={bookId} categories={categories} /> */}
      {/* <AddEdit categories={categories} /> */}
    </Layout>
    // </SWRConfig>
  );
}

export default Book;

// pre-load categories
// export async function getStaticProps() {
//   const categories = await backendFetcher.get(`/categories`);
//   return {
//     props: {
//       fallback: {
//         "/api/categories": categories,
//       },
//     },
//   };
// }

// alternative: instead of using the bookHook, use serverside props....not sure which is faster
export async function getServerSideProps({ req, res, query }) {
  const bookId = query.id;
  if (!bookId) {
    return { props: { book: null, bookId: null } };
  }
  try {
    const book = await backendFetcher.get(`/books/${bookId}`);
    // const categories = await backendFetcher.get(`/categories`);
    return {
      props: {
        book,
        // categories,
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
