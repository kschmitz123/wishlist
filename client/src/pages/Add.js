import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import FloatingActionButton from "../components/Button";
import BackArrow from "../assets/back-arrow.png";
import { postList } from "../api/lists";
import React from "react";

const Container = styled.div`
  background: #edf0ed;
  margin: 30px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Add = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();
  const [wishes, setWishes] = useState([]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleWishChange = (event) => {
    setWishes(event.target.value.split(","));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);
      const newList = await postList({ title, wishes });
      setLoading(false);
      history.push(`/wishlist/${newList.id}`);
    } catch (error) {
      setErrorMessage(error.message);
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
        <input type="submit" value="Add" disabled={loading} />
      </Form>
      {loading && <div>Loading...</div>}
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/">
        <FloatingActionButton>
          <img src={BackArrow} alt="back" />
        </FloatingActionButton>
      </Link>
    </Container>
  );
};
export default Add;
