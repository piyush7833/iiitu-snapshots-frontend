import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
width: 100%;
height: 100vh;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: center;
justify-content: center;
z-index:10;
`;

const Wrapper = styled.div`
  width: 20vw;
  height: 10vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 1.3em;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  gap: 20px;
  position: relative;
  border-radius:1.3rem;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
`;
const Close = styled.div`
  position: absolute; //it goes to end due to position absolute
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size:1.3rem;
`;
const Confirm=styled.div`
display:flex;
align-items:center;
justify-content: center;
`;
const Btn=styled.div`
display:flex;
align-items:center;
justify-content:space-evenly; 
margin-top:3vh;
`;
const Button = styled.button`
  display:flex;
  align-items:center;
  border-radius: 1.3rem;
  padding-left:1em;
  padding-right:1em;
  padding-top:0.8em;
  padding-bottom:0.8em;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;;
  color: ${({ theme }) => theme.text};
  gap:4px;
  box-shadow: 15px 15px 20px rgba(0,0,0,.6);
`;
const Box = styled.div`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  border-radius:1.3rem;
  color: ${({ theme }) => theme.text};
  margin-top:3vh;
`;
function ConfirmModal(props) {
  return (
    <Container>
      <Confirm>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <Btn>
          <Button onClick={props.onConfirm}>Confirm</Button>
          <Button onClick={props.onCancel}>Cancel</Button>
        </Btn>
      </Confirm>
    </Container>
  );
}

export default ConfirmModal;
