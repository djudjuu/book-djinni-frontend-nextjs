import { Fragment, useEffect, useState } from "react";
import BookCard from "./BookCard";
import {
  Button,
  Box,
  HStack,
  Text,
  Flex,
  Center,
  Heading,
} from "@chakra-ui/react";

const FinalBooks = ({ books }) => {
  return (
    <Box>
      <Text>
        Aha! Check out {books.length > 1 ? "these books" : "this book"}:
      </Text>
      <HStack justify="center" flex={["auto"]}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </HStack>
    </Box>
  );
};

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
      let newBooks;
      // if "any" is chosen, return all books
      if (choices.includes("any")) {
        newBooks = allBooks;
      } else {
        newBooks = [];
        allBooks.forEach((book) => {
          if (bookMatchesSelectedChoices(book, choices)) {
            newBooks.push(book);
          }
        });
      }
      setBooks(newBooks);
    };
    updateBooks();
  }, [choices]);

  const bookIsOfCategory = (book, categoryName, categoryValue) => {
    if (categoryValue == "any") return true;
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
  // add an "any" value to the values of the categoryToShow
  const buttons = () => {
    const values = [...categoryToShow.values, "any"];
    // log values
    return (
      <HStack>
        {values.map((value) => {
          const bookCount = countBooksOfCategory(categoryToShow.name, value);
          const selected = choices.includes(value);
          return bookCount > 0 ? (
            <Button
              key={value}
              onClick={() => toggleSelection(value)}
              // bg={selected ? "green.200" : "purple.300"}
              // color={selected ? "white" : "black"}
              colorScheme={selected ? "green" : "purple"}
            >
              {value} ({bookCount})
            </Button>
          ) : null;
        })}
      </HStack>
    );
  };
  return (
    <Center>
      <Box>
        {/* <h3>Select by {categoryToShow.name}</h3> */}
        {/* <span>You are down to {allBooks.length} books to choose from. </span> */}
        <Text>So which kind of {categoryToShow.name} would you like? </Text>
        <Center>{buttons()}</Center>
        {choices.length > 0 && (
          <div>
            {" "}
            {/* // if nextCategories is empty, we are done */}
            {nextCategories.length === 0 && <FinalBooks books={books} />}
            {/* // if nextCategories is not empty, we need to show the next category */}
            {nextCategories.length > 0 && (
              <FilterCard allBooks={books} categories={nextCategories} />
            )}
          </div>
        )}
      </Box>
    </Center>
  );
};

export default FilterCard;
