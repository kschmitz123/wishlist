import { Link, useHistory } from "react-router-dom";
import React from "react";
import FloatingActionButton from "../components/Button";
import Form from "../components/Form";
import Container from "../components/Container";
import BackArrow from "../assets/back-arrow.png";
import { useMutation } from "react-query";
import { postList } from "../api/lists";
import { useForm } from "react-hook-form";
import { theme } from "../GlobalStyle";

const Add = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const mutation = useMutation(({ title, wishes, theme }) =>
    postList({
      name: title,
      wishes: wishes,
      theme: theme,
    })
  );

  const onSubmit = async (data) => {
    const wishes = data.wishes.split(",");
    const { title, theme } = data;
    console.log(theme);
    try {
      const newList = await mutation.mutateAsync({ title, wishes, theme });
      history.push(`/wishlist/${newList}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container style={{ background: theme.background.standard }}>
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
        <select ref={register} name="theme" aria-label={"Select theme"}>
          <option value="">--Please choose a theme--</option>
          <option value="christmas">Christmas</option>
          <option value="birthday">Birthday</option>
        </select>
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
