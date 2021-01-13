import { postList } from "../api/lists";

export const createList = ({ title, wishes }) => {
  const list = postList({
    name: title,
    wishes: wishes,
  });
  return list;
};
