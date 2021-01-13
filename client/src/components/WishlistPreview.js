import styled from "styled-components";

const WishlistPreview = styled.div`
  position: relative;
  a {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background: radial-gradient(
      circle,
      rgba(238, 238, 238, 1) 33%,
      rgba(227, 41, 41, 1) 100%
    );
    width: 40px;
    height: 40px;
    border-radius: 25px;
    border: none;
    position: absolute;
    top: 5px;
    right: 0;
  }
`;

export default WishlistPreview;
