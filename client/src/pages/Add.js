import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import FloatingActionButton from "../components/Button";
import Form from "../components/Form";
import Container from "../components/Container";
import BackArrow from "../assets/back-arrow.png";
import { useMutation } from "react-query";
import { postList } from "../api/lists";

const Add = () => {
  const [title, setTitle] = useState("");
  const history = useHistory();
  const [wishes, setWishes] = useState([]);
  const mutation = useMutation(() =>
    postList({
      name: title,
      wishes: wishes,
    })
  );

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleWishChange = (event) => {
    setWishes(event.target.value.split(","));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newList = await mutation.mutateAsync({ title, wishes });
      history.push(`/wishlist/${newList}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Add name"
          type="text"
          value={title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          onChange={handleWishChange}
          value={wishes}
          placeholder="Insert Wishes here: Wish 1, Wish 2, ..."
        />
        <button type="submit">Add</button>
      </Form>
      {mutation.isLoading && <div>Loading...</div>}
      {mutation.isError && <p>{mutation.error.message}</p>}
      <Link to="/">
        <FloatingActionButton>
          <img src={BackArrow} alt="back" />
        </FloatingActionButton>
      </Link>
    </Container>
  );
};
export default Add;
