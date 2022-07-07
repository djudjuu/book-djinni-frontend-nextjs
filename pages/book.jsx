import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

// component that adds a book by making a post request to the api
function Book({ book, error }) {
  // if error, render error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <AddEdit book={book} />
    </Layout>
  );
}

export default Book;

export async function getServerSideProps({ req, res, query }) {
  // log "running" to console with query
  console.log("running", query);

  // define book_url as base_url + api/v1/books
  const book_url = `${baseUrl}/api/v1/books/${query.id}`;
  // if id is defined, then get the book with the id
  if (query.id) {
    // log id to console
    console.log("id", query.id);
    // add id as query param to book_url
    const book_url_with_id = `${book_url}?id=${query.id}`;
    const res1 = await fetch(book_url_with_id);
    // log res1 to console
    console.log("res1", res1);
    // if status is 200 then return the book in the props
    return { props: { book: await res1.json() } };
    // if status is 404 then return a 404 error
    return { error: { status: 404, message: "Book not found" } };
  } else if (query.id === undefined) {
    // log "no id" to console
    console.log("no id");
    return {};
  }
}
