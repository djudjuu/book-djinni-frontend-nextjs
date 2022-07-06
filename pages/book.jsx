import React, { useState, useEffect } from "react";
import AddEdit from "components/AddEdit";
import Layout from "components/Layout";

// component that adds a book by making a post request to the api
function Book() {
  return (
    <Layout>
      <AddEdit />
    </Layout>
  );
}

export default Book;
