import { Link } from "react-router-dom";
import { deleteListById, getLists } from "../api/lists";
import { useMutation, useQuery } from "react-query";
import WishListItem from "../components/WishListItem";
import FloatingActionButton from "../components/Button";
import Container from "../components/Container";
import React from "react";
import WishlistPreview from "../components/WishlistPreview";
import ErrorMessage from "../components/ErrorMessage";
import { theme } from "../GlobalStyle";

const Welcome = () => {
  const { data, status } = useQuery("lists", getLists);
  const mutation = useMutation((listId) => {
    deleteListById(listId);
  });
  const handleDelete = async (listId) => {
    mutation.mutate(listId);
    window.location.reload();
  };

  return (
    <Container style={{ background: theme.background.standard }}>
      <h1>Christmas Wishlist</h1>
      {data?.map((list) => (
        <WishlistPreview key={list._id}>
          <Link to={`/wishlist/${list._id}`}>
            <WishListItem title={list.name} />
          </Link>
          <button type="button" onClick={() => handleDelete(list._id)}>
            🗑
          </button>
        </WishlistPreview>
      ))}
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <ErrorMessage>Error fetching lists</ErrorMessage>}
      <Link to="/add">
        <FloatingActionButton>
          <svg
            xmins="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 0 24 24"
            width="35"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </FloatingActionButton>
      </Link>
    </Container>
  );
};

export default Welcome;
