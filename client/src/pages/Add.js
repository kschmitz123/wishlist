import { Link, useHistory } from "react-router-dom";
import React from "react";
import FloatingActionButton from "../components/Button";
import Form from "../components/Form";
import Container from "../components/Container";
import BackArrow from "../assets/back-arrow.png";
import { useMutation } from "react-query";
import { postList } from "../api/lists";
import { useForm } from "react-hook-form";

const Add = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const mutation = useMutation(({ title, wishes }) =>
    postList({
      name: title,
      wishes: wishes,
    })
  );

  const onSubmit = async (data) => {
    const wishes = data.wishes.split(",");
    const { title } = data;
    try {
      const newList = await mutation.mutateAsync({ title, wishes });
      history.push(`/wishlist/${newList}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Add name"
          type="text"
          required
          ref={register}
          name="title"
        />
        <input
          type="text"
          placeholder="Insert Wishes here: Wish 1, Wish 2, ..."
          ref={register}
          name="wishes"
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
