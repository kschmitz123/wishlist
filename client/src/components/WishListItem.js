import PropTypes from "prop-types";
import styled from "styled-components/macro";
import React from "react";

const Container = styled.div`
  margin: 10px;
  font-size: 2rem;
  background: #edf0ed;
  text-align: center;
  border-radius: 25px;
`;

export default function WishListItem({ title }) {
  return (
    <>
      <Container>{title}</Container>
    </>
  );
}

WishListItem.propTypes = {
  title: PropTypes.string.isRequired,
};
