import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FloatingActionButton from "../components/Button";
import Container from "../components/Container";
import { getListById, deleteListById, patchListItem } from "../api/lists";
import WishListItem from "../components/WishListItem";
import BackArrow from "../assets/back-arrow.png";
import DangerButton from "../components/DangerButton";
import Form from "../components/Form";
import React from "react";

const WishList = () => {
  const { listId } = useParams();
  const history = useHistory();
  const [list, setList] = useState("");
  const [wishToAdd, setWishToAdd] = useState("");

  useEffect(() => {
    async function fetchData() {
      const newList = await getListById(listId);
      setList(newList);
    }
    fetchData();
  }, [listId]);

  const handleDelete = async () => {
    await deleteListById(listId);
    history.push("/");
  };
  const handleSubmit = async () => {
    patchListItem({ id: listId, wish: wishToAdd });
  };
  const handleChange = (event) => {
    setWishToAdd(event.target.value);
  };

  return (
    <Container>
      <h1>Wishlist for: {list?.name}</h1>
      <li>
        {list.wishes?.map((wish, index) => (
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
        <input type="submit" value="Add" />
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
