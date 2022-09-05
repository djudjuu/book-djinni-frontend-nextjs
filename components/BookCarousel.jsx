import {
  Carousel,
  CarouselItem,
  useCarouselItem,
  CarouselItems,
  useCarousel,
} from "chakra-framer-carousel";
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
import BookCard from "./BookCard";

export const BookCarousel = ({ books }) => {
  return (
    <Box m={5}>
      <Center>
        <Text fontSize="xl" fontWeight="semibold">
          Check out{" "}
          {books.length > 1 ? `these ${books.length} books` : "this book"}:
        </Text>
      </Center>

      <Wrap mt={3} align="center">
        {books.map((book, index) => (
          <WrapItem key={index}>
            <BookCard book={book} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
