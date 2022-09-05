import { Fragment, useEffect, useState } from "react";
import BookCard from "./BookCard";
// import { BookShow, FinalBooks } from "./BookShow";
import { randomAny, randomQuestion } from "utils/randomness";
import {
  Button,
  Wrap,
  WrapItem,
  Spacer,
  Box,
  HStack,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { BookCarousel } from "./BookCarousel";

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
  const [randomAnyTerm, setRandomAnyTerm] = useState(randomAny());
  const [question, setQuestion] = useState(randomQuestion(categoryToShow.name));

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
    // choosing any should remove all other choices if its not already selected
    if (value === "any" && !choices.includes("any")) {
      setChoices(["any"]);
    }
    // if the value is already selected, remove it
    else if (choices.includes(value)) {
      setChoices(choices.filter((c) => c !== value));
    }
    // otherwise, add it and delete any if it exists
    else {
      setChoices(choices.filter((c) => c !== "any").concat(value));
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
      <Wrap spacing="10px" justify="center">
        {values.map((value) => {
          const bookCount = countBooksOfCategory(categoryToShow.name, value);
          const selected = choices.includes(value);
          return bookCount > 0 ? (
            <WrapItem>
              <Button
                mr={2}
                d="flex"
                mt={2}
                key={value}
                onClick={() => toggleSelection(value)}
                colorScheme={selected ? "green" : "purple"}
              >
                {value === "any" ? randomAnyTerm : value} ({bookCount})
              </Button>
            </WrapItem>
          ) : null;
        })}
      </Wrap>
    );
  };

  return (
    <Box>
      {/* <h3>Select by {categoryToShow.name}</h3> */}
      {/* <span>You are down to {allBooks.length} books to choose from. </span> */}
      <Center>
        <Text fontSize="xl" fontWeight="semibold">
          {question}
        </Text>
      </Center>
      {/* <Center flex="wrap" flexDirection={"row"}> */}
      {buttons()}
      {/* </Center> */}
      {choices.length > 0 && (
        <Box>
          {" "}
          {/* // if nextCategories is empty, we are done */}
          {nextCategories.length === 0 ? (
            <BookCarousel books={books} />
          ) : (
            <FilterCard allBooks={books} categories={nextCategories} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default FilterCard;
