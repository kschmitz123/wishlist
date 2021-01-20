import PropTypes from "prop-types";
import React from "react";
import BirthdayBackground from "../assets/background_birthday_mobile.jpg";
import Container from "./Container";
import Wrapper from "./Wrapper";

export default function BirthdayList({ children }) {
  return (
    <Wrapper
      style={{
        background: `url(${BirthdayBackground}) no-repeat center center fixed`,
      }}
    >
      <Container style={{ backgroundColor: "#cecdcc" }}>{children}</Container>
    </Wrapper>
  );
}

BirthdayList.propTypes = {
  children: PropTypes.node,
};
