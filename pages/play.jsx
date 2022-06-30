// write component called Play extending from react.component that fetches some server side props
// and renders a simple div with those props
import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
// import { useEffect, useState } from "react";

function Play({ categories, categoriesWithBooks }) {
  console.log("hsdf", JSON.stringify(categories));
  const [filters, setFilters] = useState([]);
  const [choices, setChoices] = useState({});
  console.log("filters", filters);

  const toggleSelection = (category) => {
    const newFilters = [...filters];
    if (isSelected(category)) {
      newFilters.splice(newFilters.indexOf(category), 1);
    } else {
      newFilters.push(category);
    }
    setFilters(newFilters);
  };

  const isSelected = (category) => {
    return filters.includes(category);
  };

  return (
    <Layout>
      <div>
        <div>Engaged Djinni image </div>
        <Fragment>
          <h2>What categories would you like to filter for?</h2>
          <ul>
            {Object.keys(categories).map((category) => (
              <li>
                <button
                  onClick={() => toggleSelection(category)}
                  //{isSelected(category) ? "red" : "green"}
                >
                  {" "}
                  {category} {!isSelected(category) ? "✅" : "❌"}
                </button>
              </li>
            ))}
          </ul>
        </Fragment>
        {filters.length > 0 && (
          <Fragment>
            <span>You chose to select for {filters.join(", ")}</span>
          </Fragment>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const url = "http:localhost:8000/api/v1/categories";
  const res = await fetch(url);
  const categoriesWithBooks = await res.json();
  // get unique names from the categories array
  const categoryNames = [
    ...new Set(categoriesWithBooks.map((item) => item.name)),
  ];
  // for name in categoryNames ad all unique values for that name to categories object
  let categories = {};
  categoryNames.forEach((name) => {
    categories[name] = categoriesWithBooks
      .filter((item) => item.name === name)
      .map((item) => item.value);
  });
  console.log(categories);

  return {
    props: {
      categoriesWithBooks,
      categories,
    },
  };
}

export default Play;
