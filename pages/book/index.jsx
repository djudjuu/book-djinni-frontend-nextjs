import BookTable from "components/BookTable";
import Layout from "components/Layout";
import Link from "next/link";
import { backendFetcher } from "utils/fetcher";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "../_error";
import { useBooks } from "utils/hooks";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { useEffect, useState } from "react";
import LinkButton from "components/LinkButton";
import { Box } from "@chakra-ui/react";

const ListBooks = ({ books }) => {
  const router = useRouter();

  return (
    <Layout>
      <Box>
        <Box width="90%" alignItems="right">
          <LinkButton colorScheme="purple" href="/book/edit">
            {" "}
            + Add a new book
          </LinkButton>
        </Box>
        <BookTable books={books} />
      </Box>
    </Layout>
  );
};

export default ListBooks;

// alternative: instead of using the bookHook, use serverside props....not sure which is faster
export async function getServerSideProps({ req, res, query }) {
  try {
    const books = await backendFetcher.get(`/books`);
    return {
      props: {
        books,
        error: false,
      },
    };
  } catch (error) {
    // console.log("err", error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

// code to reload serverside props via router
// const refreshData = () => {
//   router.replace(router.asPath);
//   setIsRefreshing(true);
// };

// useEffect(() => {
//   setIsRefreshing(false);
// }, [books]);
