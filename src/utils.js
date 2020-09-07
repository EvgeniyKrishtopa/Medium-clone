import { parse } from "query-string";

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const limit = 10;

export const getPaginator = (search) => {
  const parsedSearch = parse(search);
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset = currentPage * 10 - limit;
  return { currentPage, offset };
};

export const dataFormatToggled = (createdAt) => {
  const date = new Date(createdAt);
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month =
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth()}`;
  return `${day}.${month}.${date.getFullYear()}`;
};
