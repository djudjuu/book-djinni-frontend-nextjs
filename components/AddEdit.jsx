import { useRouter } from "next/router";
import LinkButton from "./LinkButton";
import {
  Flex,
  Spacer,
  Spinner,
  Text,
  Input,
  Heading,
  Center,
  Box,
  Button,
  Stack,
  Image,
  VStack,
  HStack,
  Title,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useBook } from "utils/hooks";
import { EditIcon } from "@chakra-ui/icons";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;

const AddEdit = ({ book, bookId, categories, updateBook }) => {
  const router = useRouter();
  const isAddMode = !bookId;
  const [newImageDesired, setNewImageDesired] = useState(false);

  const { mutate } = useSWRConfig();

  // yup validation schema for title and author and optional isbn
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string(),
    // require categories as an array of lenght > 0
    categories: Yup.array(), //.min(1, "At least one category is required"),
  });

  const defaultValues = isAddMode
    ? { categories: [] }
    : {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        categories: book.categories, //?.map((c) => c.id) || [],
      };

  // useForm hook to handle form validation and data
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    reset,
    formState,
    getValues,
    formState: { isSubmitSuccessful, dirtyFields },
  } = useForm({
    validationSchema: schema,
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const [coverImage, setCoverImage] = useState(
    book?.cover_image || book.data?.openlibData?.cover?.large || null
  );

  const watchIsbn = watch("isbn");
  const watchCover = watch("data.cover_url");
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [updated, setUpdated] = useState(false);

  // useEffect to reset form when isSubmitSuccessful is true
  useEffect(() => {
    if (isSubmitSuccessful) {
      if (isAddMode) {
        reset(defaultValues);
      }
      // router.push("/book");
    }
  }, [isSubmitSuccessful, formState]);

  // effect to reset updated state after 1 second
  useEffect(() => {
    if (updated) {
      setTimeout(() => {
        setUpdated(false);
      }, 2000);
    }
  }, [updated]);

  // effect to set coverImage to state when the formdata.cover_url changes
  // useEffect(() => {
  //   if (getValues("cover_url")) {
  //     setCoverImage(getValues("cover_url"));
  //   }
  // }, [getValues("cover_url")]);

  const onSubmit = async (data) => {
    // log data to console
    if (isAddMode) addBook(data);
    else {
      updateBook(data);
      setUpdated(true);
      setNewImageDesired(false);
    }
  };

  const addBook = async (data) => {
    await axios.post(`/api/books`, data);
    router.push("/book");
  };

  const combineAuthors = (authors) => {
    return authors.map((author) => author.name).join(", ");
  };

  const fetchByISBN = async () => {
    setFetching(true);
    // make request to /api/books/isbn/:isbn
    // log isbn
    const isbn = getValues("isbn");
    console.log("isbn", isbn);

    // const { data } = await axios.get(`/api/books/isbn?isbn=${isbn}`);
    try {
      const { data, status } = await axios.get(`/api/books/isbn/${isbn}`);
      console.log("data", data);
      console.log("status", status);
      if (status === 200) {
        console.log("data", data);
        setValue("title", data.title);
        setValue("data", { cover_url: data.cover.large, openlibData: data });
        // combine all authors from authors array into a single string
        setValue("author", combineAuthors(data.authors));
        setFetching(false);
        setFetched(true);
      }
    } catch (error) {
      alert("ISBN not found");
      setFetching(false);
      setFetched(false);
    }
  };

  // regex for isbn
  const isbn10Pattern =
    /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9X]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

  // regex for isbn-13
  const isbn13Pattern =
    /^(?:ISBN(?:-1[03])?:? )?(?=[0-9]{13}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;

  const isValidIsbn = (isbn) => {
    const isbnPattern =
      /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
    return isbnPattern.test(isbn);
    // if is isbn-10 or isbn-13 return true
    // return isbn10Pattern.test(isbn) || isbn13Pattern.test(isbn);
  };

  const hasImage = book?.data?.cover_url || getValues("data.cover_url");
  console.log("watchCover", watchCover);

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading fontSize="3xl">
          {isAddMode ? "Add a new book" : "Edit book"}
        </Heading>
        <Spacer width="15px" />
        <LinkButton href="/book">back</LinkButton>
      </Flex>
      <HStack>
        <Box w="200px" d="flex" h="314px" border="1px" title={book.title}>
          {hasImage ? (
            <Image
              src={watchCover || book.data.cover_url}
              objectFit="cover"
              layout="fill"
              alt={book.title}
            />
          ) : (
            <Text as="kbd"> No Cover Image</Text>
          )}
        </Box>
        <HStack>
          <Text width="160px">Url of cover image:</Text>
          <Input
            {...register("data.cover_url", {
              required: false,
            })}
            defaultValue={isAddMode ? "" : book.data?.cover_url || ""}
            placeholder={book.data.cover_url}
            type="text"
          />
        </HStack>
      </HStack>

      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <HStack>
          <Text width="60px">Title:</Text>
          <Input
            name="title"
            {...register("title", { required: true })}
            defaultValue={isAddMode ? "" : book.title}
            placeholder="How to train your dragon"
            type="text"
            required
          />
        </HStack>
        {errors?.title && <p>{errors.title.message}</p>}
        <HStack>
          <Text width="60px">Author:</Text>
          <Input
            name="author"
            {...register("author", { required: true })}
            defaultValue={isAddMode ? "" : book.author}
            placeholder="Ms. Cool Woman"
            type="text"
            required
          />
        </HStack>
        {errors?.author && <p>{errors.author.message}</p>}
        <br />
        <HStack>
          <Text width="60px">ISBN:</Text>
          <Input
            name="isbn"
            {...register("isbn", {
              required: false,
              pattern: isbn10Pattern,
            })}
            defaultValue={isAddMode ? "" : book.isbn}
            placeholder="ISBN (optional)"
            type="text"
          />
          <Button
            // disable button if isbn is not valid
            // isDisabled={!getValues("isbn") || !isbnValid(getValues("isbn"))}
            disabled={!watchIsbn || !isValidIsbn(watchIsbn)}
            onClick={() => fetchByISBN(formState.isbn)}
          >
            {fetching ? <Spinner /> : fetched ? "again!" : "Fetch"}
          </Button>
        </HStack>
        {errors?.isbn && <p>{errors.isbn.message}</p>}
        <br />
        <Heading size="md">Categories:</Heading>
        {categories &&
          categories
            // .sort((a, b) => a.name > b.name)
            .map((category) => (
              <div key={category.id}>
                <input
                  name="categories"
                  {...register("categories", { required: false })}
                  type="checkbox"
                  value={category.id}
                  defaultChecked={
                    isAddMode
                      ? false
                      : book.categories?.some((c) => c.id === category.id) ||
                        false
                  }
                />
                {/* <span> {category.name}: {category.value} </span> */}
                <span> {category.value} </span>
              </div>
            ))}
        {errors?.categories && <p>{errors.categories.message}</p>}

        {/* refactor this */}
        {updated && (
          <Button colorScheme="purple">
            {!isAddMode ? "Updated" : "Added"}
          </Button>
        )}
        {!updated && (
          <Button colorScheme="purple" type="submit">
            {!updated && formState.isSubmitting ? <Spinner /> : "Save"}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default AddEdit;
