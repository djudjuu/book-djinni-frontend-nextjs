import {
  Modal,
  ModalOverlay,
  ButtonGroup,
  VStack,
  Box,
  Text,
  HStack,
  ModalContent,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import router from "next/router";

// function to show only the first 25 letters of the title
const shortenTitle = (title) => {
  if (title.length > 22) {
    return title.substring(0, 25) + "...";
  } else {
    return title;
  }
};

const BookDetails = ({ isOpen, onClose, book }) => {
  const titleInUrl = book.title.replace(/\s/g, "+");
  const authorInUrl = book.author.replace(/\s/g, "+");
  const libgenlink = `https://libgen.is/search.php?req=${titleInUrl}+${authorInUrl}`;

  const editBook = (book) => {
    router.push(`/book/edit?id=${book.id}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {shortenTitle(book.title)} by {book.author}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <VStack>
                <Text fontSize="s" as="em">
                  TODO
                </Text>{" "}
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button color="green.500" variant="solid">
                <a href={libgenlink} target="_blank">
                  Get it from libgen!
                </a>
              </Button>
              <Button onClick={() => editBook(book)}>edit</Button>

              {/* <Button colorScheme="purple" mr={3} onClick={onClose}> Close </Button> */}
            </ButtonGroup>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookDetails;
