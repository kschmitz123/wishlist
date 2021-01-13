import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteListById, getLists } from "../api/lists";
import WishListItem from "../components/WishListItem";
import FloatingActionButton from "../components/Button";
import Container from "../components/Container";
import React from "react";
import WishlistPreview from "../components/WishlistPreview";
import ErrorMessage from "../components/ErrorMessage";

const Welcome = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  async function refreshLists() {
    const newLists = await getLists();
    setLists(newLists);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setErrorMessage(null);
        await refreshLists(setLists);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (listId) => {
    await deleteListById(listId);
    await refreshLists();
  };

  return (
    <Container>
      <h1>Christmas Wishlist</h1>
      {lists?.map((list) => (
        <WishlistPreview key={list._id}>
          <Link to={`/wishlist/${list._id}`}>
            <WishListItem title={list.name} />
          </Link>
          <button type="button" onClick={() => handleDelete(list._id)}>
            🗑
          </button>
        </WishlistPreview>
      ))}
      {loading && <div>Loading...</div>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
