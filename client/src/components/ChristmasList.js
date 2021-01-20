import PropTypes from "prop-types";
import React from "react";
import ChristmasBackground from "../assets/background_christmas_mobile.jpeg";
import Container from "./Container";
import Wrapper from "./Wrapper";

export default function ChristmasList({ children }) {
  return (
    <Wrapper
      style={{
        background: `url(${ChristmasBackground}) no-repeat center center fixed`,
      }}
    >
      <Container style={{ backgroundColor: "#213d5f" }}>{children}</Container>
    </Wrapper>
  );
}

ChristmasList.propTypes = {
  children: PropTypes.node,
};
