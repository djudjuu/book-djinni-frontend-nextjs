import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";
import BookTable from "components/BookTable";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ book, error, categories, categoryNames }) {
  // if error, render error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <AddEdit
        book={book}
        categories={categories}
        // categoryNames={categoryNames}
      />
    </Layout>
  );
}

export default Book;

export async function getServerSideProps({ req, res, query }) {
  // 1) get all categories from api
  let props = { error: false, book: null, categories: [] };
  // define categories_url as base_url + api/v1/categories
  const categories_url = `${baseUrl}/api/v1/categories`;
  const res1 = await fetch(categories_url);
  const categoriesWithBooks = await res1.json();
  // remove key "books" from all objects in categoriesWithBooks
  const categories = categoriesWithBooks
    .map((category) => {
      delete category.books;
      return category;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  // get unique names from the categories array
  // const categoryNames = [
  //   ...new Set(categoriesWithBooks.map((item) => item.name)),
  // ];
  props.categories = categories;

  // 2) if id is in query, get book by id
  // define book_url as base_url + api/v1/books
  const book_url = `${baseUrl}/api/v1/books/${query.id}`;
  if (query.id) {
    // add id as query param to book_url
    const book_url_with_id = `${book_url}?id=${query.id}`;
    const res2 = await fetch(book_url_with_id);
    // if status is 200 then return the book in the props
    if (res2.status === 200) {
      props.book = await res2.json();
    }
    // if status is 404 then return a 404 error
    else if (res2.status === 404) {
      props.error = { status: 404, message: "Book not found" };
    }
  }
  return { props };
}
