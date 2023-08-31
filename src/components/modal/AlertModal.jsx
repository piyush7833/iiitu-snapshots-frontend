import React from 'react';
import styled from 'styled-components';
const Container=styled.div`
width: 100%;
height: 100vh;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #000000a7;
display: flex;
align-items: center;
justify-content: center;
z-index:9999999;
`;

const Wrapper = styled.div`
  width: 25vw;
  height: 25vh;
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
  box-shadow: 0 15px 25px rgba(0,0,0,0.6);
  font-size:1.3rem;
  text-align:justify;
  overflow-x:hidden;
  overflow-y:auto;
  @media (max-width: 800px) {
    width: 60vw;
    height: 30vh;
  }
  @media (max-width: 500px) {
    font-size:1rem;
  }
`;
const Close = styled.div`
  position: absolute; //it goes to end due to position absolute
  top: 10px;
  right: 10px;
  margin-right:1vw;
  cursor: pointer;
  font-size:1.3rem;
`;
const Alert=styled.div`
display:flex;
align-items:center;
justify-content: center;
`;
const Message=styled.div``;
const AlertModal = ({ isOpen, onClose, message,color }) => {
  return (
    <div >{isOpen ===true? (<Container>
        <Wrapper>
        <Alert >
        <Close onClick={onClose}>X</Close>
        <Message>
        <p style={{color:color}}>{message}</p>
        </Message>
        </Alert>
        </Wrapper>
        </Container> ): ''}
    </div>
  );
};

export default AlertModal;
