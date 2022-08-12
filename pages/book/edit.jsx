import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";
import { useCategories, useBook } from "utils/hooks";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ bookId }) {
  const { categories, categoriesError, categoriesLoading } = useCategories();
  const { book, bookError, bookLoading } = useBook(bookId);

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
    </Layout>
  );
}

export default Book;

export async function getServerSideProps({ req, res, query }) {
  // 1) get all categories from api
  let props = { bookId: query.id || null };
  return { props };
}
