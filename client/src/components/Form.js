import styled from "styled-components/macro";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  input,
  button {
    height: 2.5rem;
    border-radius: 25px;
    margin-bottom: 10px;
    border: none;
    text-align: center;
  }
  button {
    background: #e48585;
  }
`;
export default Form;
