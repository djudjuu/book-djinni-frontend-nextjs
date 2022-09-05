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
  useDisclosure,
} from "@chakra-ui/react";
import BookDetails from "./BookDetails";

const BookCard = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="full"
      h="full"
      alignItems="center"
      justifyContent="center"
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      onClick={onOpen}
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
      <BookDetails book={book} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default BookCard;
