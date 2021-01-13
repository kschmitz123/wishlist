import styled from "styled-components/macro";

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: inline-grid;
  place-content: center;
  text-decoration: none;
  height: 60px;
  width: 60px;
  background-color: #ff9a9e;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
export default FloatingActionButton;
