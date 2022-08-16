import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";
import { useCategories, useBook, removeBooksFromCategories } from "utils/hooks";
import { backendFetcher } from "utils/fetcher";
import { SWRConfig } from "swr";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ bookId, book, categories, fallback, error }) {
  // function Book({ fallback, error }) {
  return (
    <Layout>
      <AddEdit bookId={bookId} book={book} categories={categories} />
    </Layout>
  );
}

export default Book;

// fallback for categories loaded with SWR-hook
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
