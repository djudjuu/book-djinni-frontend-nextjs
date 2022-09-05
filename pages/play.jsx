// write component called Play extending from react.component that fetches some server side props
// and renders a simple div with those props
import {
  Button,
  Box,
  VStack,
  Text,
  Wrap,
  WrapItem,
  HStack,
  Flex,
  Center,
  Heading,
} from "@chakra-ui/react";
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
      <Flex as="div" w="full" h="full" justifyContent="space-around">
        {/* <div>Engaged Djinni image </div> */}
        {/* Step1: Select Filter Category */}
        <VStack>
          <Box w={{ base: "95%", md: "90%" }}>
            <Center>
              <Heading as="h3" size="md">
                What categories would you like to filter with?
              </Heading>
            </Center>
          </Box>
          {/* <Box
            // width={{ base: "100%", md: "90%" }}
            d="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          > */}
          <Wrap justify="center">
            {categories &&
              Object.values(categories)
                .sort(sortCategories)
                .map((category, index) => {
                  const selected = isSelected(category.name);
                  return (
                    <WrapItem
                      key={category.name}
                      display="flex"
                      // as="button"
                      onClick={() => toggleSelection(category.name)}
                      // bg={selected ? "green.400" : "purple.200"}
                    >
                      <Button
                        d="flex"
                        w="100px"
                        colorScheme={selected ? "green" : "purple"}
                      >
                        {selected ? `${index + 1}: ` : ""}
                        {category.name}
                      </Button>
                    </WrapItem>
                  );
                })}
          </Wrap>
          {/* </Box> */}
          {/* Step2: Choose Filter Values */}
          <FilterCard categories={filters} allBooks={books} />
        </VStack>
      </Flex>
    </Layout>
  );
}

export default Play;

// export async function getStaticProps() {
//   // `getStaticProps` is executed on the server side.
//   const books = await backendFetcher.get(`/books`);
//   const categories = await backendFetcher.get(`/categories`);
//   return {
//     props: {
//       fallback: {
//         "/api/books": books,
//         "/api/categories": getUniqueCategoryValues(categories),
//       },
//     },
//   };
// }

// getting serverside props is faster here, as playing never changes what is rendered

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
    console.log("er", error);
    return {
      props: {
        error: true,
        isLoading: false,
      },
    };
  }
}
