import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { deleteListById, getLists } from "../api/lists";
import WishListItem from "../components/WishListItem";
import FloatingActionButton from "../components/Button";
import React from "react";

const Container = styled.div`
  text-align: center;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  background: radial-gradient(
    circle,
    rgba(238, 238, 238, 1) 33%,
    rgba(227, 41, 41, 1) 100%
  );
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: none;
  position: relative;
  margin-left: -30px;
`;
const Heading = styled.h1`
  color: white;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  &:visited {
    color: black;
  }
`;
const ErrorMessage = styled.div`
  background: white;
`;

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
      <Heading>Christmas Wishlist</Heading>
      {lists?.map((list) => (
        <ListItem key={list._id}>
          <NavLink to={`/wishlist/${list._id}`}>
            <WishListItem title={list.name} />
          </NavLink>
          <Button type="button" onClick={() => handleDelete(list._id)}>
            🗑
          </Button>
        </ListItem>
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
