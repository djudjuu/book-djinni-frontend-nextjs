import { Fragment, useEffect, useState } from "react";

const FilterCard = ({ allBooks, categories }) => {
  // if categories is empty, return null
  if (Object.keys(categories).length === 0) {
    return null;
  }
  const categoryToShow = categories[0];
  const nextCategories = categories.slice(1);
  // save all chosen values in an array in state
  const [choices, setChoices] = useState([]);
  const [books, setBooks] = useState(allBooks);

  // every time a filter is added or removed, we need to update the matching books
  useEffect(() => {
    // function to filter books based on the choices
    const updateBooks = () => {
      const newBooks = [];
      allBooks.forEach((book) => {
        if (bookMatchesSelectedChoices(book, choices)) {
          newBooks.push(book);
        }
      });
      setBooks(newBooks);
    };
    updateBooks();
  }, [choices]);

  const bookIsOfCategory = (book, categoryName, categoryValue) => {
    return book.categories.some(
      (c) => c.name === categoryName && c.value === categoryValue
    );
  };

  const bookMatchesSelectedChoices = (book, selectedValues) => {
    return book.categories.some(
      (c) => c.name === categoryToShow.name && selectedValues.includes(c.value)
    );
  };

  const toggleSelection = (value) => {
    if (choices.includes(value)) {
      setChoices(choices.filter((f) => f !== value));
    } else {
      setChoices([...choices, value]);
    }
  };

  // function to return a count how many books are of a given category value
  const countBooksOfCategory = (name, value) => {
    return allBooks.filter((book) => bookIsOfCategory(book, name, value))
      .length;
  };

  // return a list of buttons for each value in the categoryToShow
  const buttons = categoryToShow.values.map((value) => (
    <button
      key={value}
      onClick={() => toggleSelection(value)}
      style={{
        backgroundColor: choices.includes(value) ? "green" : "white",
        color: choices.includes(value) ? "white" : "black",
      }}
    >
      {value} ({countBooksOfCategory(categoryToShow.name, value)})
    </button>
  ));
  return (
    <div>
      <h3>Select by {categoryToShow.name}</h3>
      <span>You are down to {allBooks.length} books to choose from. </span>
      <span>So which kind of {categoryToShow.name} would you like? </span>
      <span>(Choosing more than one is possible too)</span>
      <div>{buttons}</div>
      {choices.length > 0 && (
        <div>
          {" "}
          {/* // if nextCategories is empty, we are done */}
          {nextCategories.length === 0 && (
            <div>
              <span>You have selected all the books you'd like.</span>
              <span>Here they are TODO</span>
            </div>
          )}
          {/* // if nextCategories is not empty, we need to show the next category */}
          {nextCategories.length > 0 && (
            <FilterCard allBooks={books} categories={nextCategories} />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterCard;
