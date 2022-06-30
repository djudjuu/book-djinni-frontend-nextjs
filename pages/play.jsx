// write component called Play extending from react.component that fetches some server side props
// and renders a simple div with those props
import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
// import { useEffect, useState } from "react";

function Play({ categories }) {
  console.log("hsdf", JSON.stringify(categories));
  const [filters, setFilters] = useState([]);

  return (
    <Layout>
      <div>
        <div>Engaged Djinni image </div>
        <div>{JSON.stringify(categories)}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const url = "http:localhost:8000/api/v1/categories";
  const res = await fetch(url);
  const categories = await res.json();
  // get unique names from the categories array
  const uniqueNames = [...new Set(categories.map((item) => item.name))];
  get;

  console.log("fetched", categories);
  return {
    props: {
      categories,
    },
  };
}

export default Play;
