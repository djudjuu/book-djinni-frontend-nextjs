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
import { useColorModeValue } from "@chakra-ui/react";

const images = [
  "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=",
  "https://images.unsplash.com/photo-1572402230267-f3e267c1e5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1497206365907-f5e630693df0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1551085254-e96b210db58a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
];

export const BookCarousel = ({ books }) => {
  return (
    <Box m={5}>
      <Center>
        <Text fontSize={"xl"}>
          Check out {books.length > 1 ? "these books" : "this book"}:
        </Text>
      </Center>

      <Carousel>
        <CarouselItems>
          {books.map((book, index) => {
            return (
              <CarouselItem index={index} key={book.title}>
                <Card index={index} book={book} />
                {/* <BookCard key={book.id} book={book} /> */}
              </CarouselItem>
            );
          })}
        </CarouselItems>
        {books.length > 1 && <Toolbar />}
      </Carousel>
    </Box>
  );
};

function Toolbar() {
  const { onNext, onPrevious } = useCarousel();
  return (
    <Flex w="full" justify="center">
      <HStack>
        <Button
          w="115px"
          onClick={onPrevious}
          //   variant="ghost"
          //   colorScheme="purple"
        >
          {"<"}
        </Button>
        <Button
          w="115px"
          onClick={onNext}
          // variant="ghost" colorScheme="purple"
        >
          {">"}
        </Button>
      </HStack>
    </Flex>
  );
}

function Card({ book, index }) {
  const { numberOfSlides, onClickHandler, position } = useCarouselItem();
  const isCenter = position === "center";
  return (
    <Flex
      //   boxSize={isCenter ? "400px" : "300px"}
      pos="relative"
      boxShadow="lg"
      as="button"
      onClick={onClickHandler}
      m={5}
    >
      {/* <Flex
        borderRadius="full"
        bg="whiteAlpha.400"
        p={2}
        left={2}
        top={2}
        position="absolute"
      >
        <Text>{`${index + 1}/${numberOfSlides}`}</Text>
      </Flex>
 */}
      <Box
        // boxSize={isCenter ? "400px" : "300px"}
        objectFit="cover"
        objectPosition="center center"
        rounded
        bg={useColorModeValue("gray.50", "gray.900")}
        borderRadius={4}
        _hover={{
          scale: 1.1,
        }}
      >
        <BookCard book={book} />
      </Box>
    </Flex>
  );
}

// function App() {
//   return (
//     <Flex
//       height="100%"
//       width="100%"
//       minHeight="100vh"
//       justify="flex-start"
//       align="flex-start"
//       flexDir="column"
//       p={10}
//       bg="rgb(26,31,42)"
//     >
//       <Flex bg="rgb(26,31,42)" w="fit-content" gap="10" flexDir="column">
//         <CarouselDemo />
//       </Flex>
//     </Flex>
//   );
// }
// function CarouselDemo() {
//   return (
//     <Carousel>
//       <CarouselItems>
//         {images.map((image, index) => {
//           return (
//             <CarouselItem index={index} key={image}>
//               <Card index={index} image={image} />
//             </CarouselItem>
//           );
//         })}
//       </CarouselItems>
//       <Toolbar />
//     </Carousel>
//   );
// }
