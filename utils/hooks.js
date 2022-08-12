import fetcher from "./fetcher";
import useSWR from "swr";

// hook to fetch books & categories from the backend
export const useBooks = () => {
  const { data, error } = useSWR(`/books`, fetcher);

  return {
    books: data?.data || [],
    isLoading: !error && !data,
    error: error,
  };
};

export const useBook = (id) => {
  if (!id) return { isLoading: false, error: false, book: null };
  // just to redeploy

  const { data, error } = useSWR(`/books/${id}`, fetcher, {
    refreshInterval: 5000,
  });
  // log data
  // console.log("in bookhook", data);

  return {
    book: data?.data || {},
    isLoading: !error && !data,
    error: error,
  };
};

export const useCategories = () => {
  const { data, error } = useSWR(`/categories`, fetcher, {
    refreshInterval: 5000,
  });

  const categoriesWithBooks = data?.data || [];
  // categories from this endpoint also have a list of books that fit them, so
  // remove key "books" from all objects in categoriesWithBooks
  const categories = categoriesWithBooks
    // .filter((category) => category.books && category.books.length > 0)
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

export const useCategoriesWithBooks = () => {
  const { data, error } = useSWR(`/categories`, fetcher, {
    refreshInterval: 5000,
  });

  const categoriesWithBooks = data?.data || [];
  const categoryNames = [
    ...new Set(
      categoriesWithBooks
        .filter((x) => x.books && x.books.length > 0)
        .map((item) => item.name)
    ),
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
    categoriesLoading: !error && !data,
    categoriesError: error,
  };
};
