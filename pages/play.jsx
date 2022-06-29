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
        <div>{categories}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      categories: ["sdsf", "sdfsdf", "sdfsdf"],
    },
  };
}

export default Play;
