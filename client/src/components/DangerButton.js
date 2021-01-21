import styled from "styled-components/macro";

const DangerButton = styled.button`
  background-color: #635353;
  font-size: 1.3rem;
  border-radius: 25px;
  border: none;
  padding: 6px;
  margin-top: 20px;
  :active {
    background-color: red;
  }
`;

export default DangerButton;
