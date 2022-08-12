import fetcher from "./fetcher";
import useSWR from "swr";

// hook to fetch books & categories from the backend
export const useBooks = () => {
  const { data, error } = useSWR(`/books`, fetcher);

  return {
    books: data?.data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useBook = (id) => {
  if (!id) return { isLoading: false, error: false, book: null };

  const { data, error } = useSWR(`/books/${id}`, fetcher);
  // log data
  // console.log("in bookhook", data);

  return {
    book: data?.data || {},
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCategories = () => {
  const { data, error } = useSWR(`/categories`, fetcher);

  const categoriesWithBooks = data?.data || [];
  // categories from this endpoint also have a list of books that fit them, so
  // remove key "books" from all objects in categoriesWithBooks
  const categories = categoriesWithBooks
    .map((category) => {
      delete category.books;
      return category;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    categories,
    categoriesLoading: !error && !data,
    categoriesError: error,
  };
};

export const useBooksAndCategories = () => {
  const { data, error } = useSWR(`/categories`, fetcher);

  const categoriesWithBooks = data?.data || [];
  const categoryNames = [
    ...new Set(categoriesWithBooks.map((item) => item.name)),
  ];
  // for name in categoryNames ad all unique values for that name to categories object
  let categories = {};
  categoryNames.forEach((name) => {
    categories[name] = {
      name,
      values: categoriesWithBooks
        .filter((item) => item.name === name)
        .map((item) => item.value),
    };
  });
  return {
    categories,
  };
};
