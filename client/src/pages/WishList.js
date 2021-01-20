import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteListById, getListById, patchListItem } from "../api/lists";
import BackArrow from "../assets/back-arrow.png";
import FloatingActionButton from "../components/Button";
import DangerButton from "../components/DangerButton";
import ErrorMessage from "../components/ErrorMessage";
import Form from "../components/Form";
import WishListItem from "../components/WishListItem";
import { theme } from "../GlobalStyle";
import BirthdayList from "./BirthdayList";
import ChristmasList from "./ChristmasList";

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
    <>
      {data && data.theme === "christmas" ? (
        <ChristmasList>
          {status === "loading" && <div>Loading...</div>}
          {status === "error" && (
            <ErrorMessage>Error fetching list</ErrorMessage>
          )}
          <h1>Wishlist for: {data?.name}</h1>
          <p>
            {data?.wishes.map((wish, index) => (
              <WishListItem key={index} title={wish} />
            ))}
          </p>
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
        </ChristmasList>
      ) : (
        <BirthdayList>
          {status === "loading" && <div>Loading...</div>}
          {status === "error" && (
            <ErrorMessage>Error fetching list</ErrorMessage>
          )}
          <h1>Wishlist for: {data?.name}</h1>
          <p>
            {data?.wishes.map((wish, index) => (
              <WishListItem key={index} title={wish} />
            ))}
          </p>
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
        </BirthdayList>
      )}
    </>
  );
};
export default WishList;
