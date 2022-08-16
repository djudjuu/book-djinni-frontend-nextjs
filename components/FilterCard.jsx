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
      <Text>These are the books you have selected:</Text>
      <HStack justify="center">
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
  const buttons = () => (
    <HStack>
      {categoryToShow.values.map((value) => {
        const bookCount = countBooksOfCategory(categoryToShow.name, value);
        return bookCount > 0 ? (
          <Button
            key={value}
            onClick={() => toggleSelection(value)}
            bg={choices.includes(value) ? "green.200" : "grey.100"}
            color={choices.includes(value) ? "white" : "black"}
          >
            {value} ({bookCount})
          </Button>
        ) : null;
      })}
      ;
    </HStack>
  );
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
