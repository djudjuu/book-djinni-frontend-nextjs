import {
  Button,
  Box,
  HStack,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
} from "@chakra-ui/react";

const BookCard = ({ book }) => {
  const title = book.title.replace(/\s/g, "+");
  const author = book.author.replace(/\s/g, "+");
  const libgenlink = `https://libgen.is/search.php?req=${title}+${author}`;
  return (
    <Box
      // display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="md"
      m="5px"
      p="5px"
      // bg="gray.100"
      borderColor="black"
      border="1px"
    >
      <VStack>
        <Text fontSize="lg">{book.title}</Text>
        <Text fontSize="s" as="em">
          by {book.author}
        </Text>
        <Text as="abbr" fontSize="xs">
          ISBN: {book.isbn}
        </Text>
        <Button color>
          <a href={libgenlink} target="_blank">
            View on Libgen
          </a>
        </Button>
      </VStack>
    </Box>
  );
};

export default BookCard;
