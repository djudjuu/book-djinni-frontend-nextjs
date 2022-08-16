// write component called Play extending from react.component that fetches some server side props
// and renders a simple div with those props
import React, { Fragment, useState } from "react";
import { backendFetcher } from "utils/fetcher";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import FilterCard from "components/FilterCard";
// import { useEffect, useState } from "react";
import {
  useBooks,
  useCategoriesWithBooks,
  getUniqueCategoryValues,
  removeBooksFromCategories,
} from "utils/hooks";
import { SWRConfig } from "swr";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

function Play({ books, error, isLoading, categories }) {
  const [filters, setFilters] = useState([]);

  // if categories are loading, show loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if error, render error message
  if (error) {
    return <div>Error</div>;
  }

  const toggleSelection = (categoryName) => {
    const newFilters = [...filters];
    if (isSelected(categoryName)) {
      // remove the object from the filters array that has name=categoryName
      newFilters.splice(
        newFilters.findIndex((f) => f.name === categoryName),
        1
      );
    } else {
      newFilters.push(categories[categoryName]);
    }
    setFilters(newFilters);
  };

  const isSelected = (categoryName) => {
    // check if any of the objects in the filters array has a the given category as a value for the key name
    return filters.some((f) => f.name === categoryName);
  };

  // function to sort categories. first whether it is selected or not, breaking the tie by which occurs first in the filters array
  const sortCategories = (a, b) => {
    if (isSelected(a.name) && !isSelected(b.name)) {
      return -1;
    } else if (!isSelected(a.name) && isSelected(b.name)) {
      return 1;
    } else {
      return filters.indexOf(a) - filters.indexOf(b);
    }
  };

  return (
    // <SWRConfig value={{ fallback }}>
    <Layout>
      <div>
        <div>Engaged Djinni image </div>
        {/* Step1: Select Filter Category */}
        <Fragment>
          <h2>What categories would you like to filter for?</h2>
          <span>(order matters too)</span>
          <ul>
            {categories &&
              Object.values(categories)
                .sort(sortCategories)
                .map((category) => (
                  <li key={category.name}>
                    <button
                      onClick={() => toggleSelection(category.name)}
                      //{isSelected(category) ? "red" : "green"}
                    >
                      {" "}
                      {category.name} {isSelected(category.name) ? "✅" : ""}
                    </button>
                  </li>
                ))}
          </ul>
        </Fragment>
        {filters.length > 0 && (
          <Fragment>
            <span>
              If you want to change the order, just click the toggle the buttons
              above to remove and add the categories again.
            </span>
          </Fragment>
        )}
        {/* Step2: Choose Filter Values */}
        <FilterCard categories={filters} allBooks={books} />
      </div>
    </Layout>
    // </SWRConfig>
  );
}

export default Play;

export async function getServerSideProps() {
  // get books and categories from backend and inject into props
  try {
    const books = await backendFetcher.get(`/books`);
    const categories = await backendFetcher.get(`/categories`);
    return {
      props: {
        books,
        error: false,
        isLoading: !books || !categories,
        // pass only names and possible values of categories to client side
        categories: getUniqueCategoryValues(categories),
      },
    };
    // catch error and return error props
  } catch (error) {
    return {
      props: {
        error: true,
        isLoading: !books || !categories,
      },
    };
  }
}
