import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import FloatingActionButton from "../components/Button";
import Container from "../components/Container";
import { getListById, deleteListById, patchListItem } from "../api/lists";
import WishListItem from "../components/WishListItem";
import BackArrow from "../assets/back-arrow.png";
import DangerButton from "../components/DangerButton";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";

const WishList = () => {
  const { listId } = useParams();
  const history = useHistory();
  const [wishToAdd, setWishToAdd] = useState("");
  const { data, status } = useQuery(["lists", listId], () =>
    getListById(listId)
  );
  const mutation = useMutation(() => {
    patchListItem({
      id: listId,
      wish: wishToAdd,
    });
  });

  const handleDelete = async () => {
    await deleteListById(listId);
    history.push("/");
  };
  const handleSubmit = async () => {
    mutation.mutate({ listId, wishToAdd });
  };
  const handleChange = (event) => {
    setWishToAdd(event.target.value);
  };

  return (
    <Container>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <ErrorMessage>Error fetching list</ErrorMessage>}

      <h1>Wishlist for: {data?.name}</h1>
      <li>
        {data?.wishes.map((wish, index) => (
          <WishListItem key={index} title={wish} />
        ))}
      </li>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Add wish"
          type="text"
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </Form>
      <DangerButton onClick={handleDelete} type="button">
        Delete
      </DangerButton>
      <Link to="/">
        <FloatingActionButton>
          <img src={BackArrow} alt="back" />
        </FloatingActionButton>
      </Link>
    </Container>
  );
};
export default WishList;
