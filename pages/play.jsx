// write component called Play extending from react.component that fetches some server side props
// and renders a simple div with those props
import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import FilterCard from "components/FilterCard";
// import { useEffect, useState } from "react";
import { useBooks, useCategoriesWithBooks } from "utils/hooks";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

function Play() {
  const { books, error: booksError, isLoading: booksLoading } = useBooks();
  const { categories, categoriesError, categoriesLoading } =
    useCategoriesWithBooks();

  const [filters, setFilters] = useState([]);

  // if categories are loading, show loading message
  if (categoriesLoading || booksLoading) {
    return <div>Loading...</div>;
  }

  // if error, render error message
  if (booksError || categoriesError) {
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
    <Layout>
      <div>
        <div>Engaged Djinni image </div>
        {/* Step1: Select Filter Category */}
        <Fragment>
          <h2>What categories would you like to filter for?</h2>
          <span>(order matters too)</span>
          <ul>
            {Object.values(categories)
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
  );
}

export default Play;
