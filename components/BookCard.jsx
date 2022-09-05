import {
  Button,
  Box,
  HStack,
  Image,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
} from "@chakra-ui/react";
import LinkButton from "./LinkButton";
import router from "next/router";

const placeholderImage =
  "https://images-na.ssl-images-amazon.com/images/I/81LozjUwcUL.jpg";

// use some image url from the internet to replace the placeholder image

const placeholderImage2 =
  "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80";

// function to show only the first 25 letters of the title
const shortenTitle = (title) => {
  if (title.length > 22) {
    return title.substring(0, 25) + "...";
  } else {
    return title;
  }
};

const BookCard = ({ book }) => {
  const titleInUrl = book.title.replace(/\s/g, "+");
  const authorInUrl = book.author.replace(/\s/g, "+");
  const libgenlink = `https://libgen.is/search.php?req=${titleInUrl}+${authorInUrl}`;

  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
  };
  console.log("book", book.title, book.data);

  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      // textOverflow="ellipsis"
      // h="320px"
    >
      {/* // Box around stuff that needs to be on top of each other */}
      {/* <Box d="flex"> */}
      {/* // Box around image */}
      <Box w="200px" d="flex" h="314px">
        {book.data.cover_url ? (
          <Image
            src={book.data.cover_url}
            objectFit="cover"
            layout="fill"
            alt={book.title}
          />
        ) : (
          // <Box alignItems="center">
          // if no cover_url is there just show author and title
          <Center alignItems="center" wordBreak="break-word">
            <VStack>
              <Text as="b" fontSize="2xl">
                {book.title}
              </Text>
              <Text>by </Text>
              <Text as="i" fontSize="large">
                {book.author}
              </Text>
            </VStack>
          </Center>
        )}
      </Box>
    </Flex>
  );
};

/* Box to contain the book info */
// <Box>
//   <HStack justify="space-around">
//     <Button color>
//       <a href={libgenlink} target="_blank">
//         Get it!
//       </a>
//     </Button>
//     <Button onClick={() => editBook(book)}>edit</Button>
//   </HStack>
// </Box>

export default BookCard;

/* {/* <VStack>
        <Text fontSize="lg" title={book.title}>
          {shortenTitle(book.title)}{" "}
        </Text>
        <Text fontSize="s" as="em">
          by {book.author}
        </Text>
        {/* <Text as="abbr" fontSize="xs">
          ISBN: {book.isbn}
        </Text> */
/* <Button color>
          <a href={libgenlink} target="_blank">
            View on Libgen
          </a>
        </Button>
      </VStack> */
