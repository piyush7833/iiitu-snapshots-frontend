import React from 'react'
import styled from 'styled-components'
import './loader.css'
const Container=styled.div`
display:flex;
align-items:center;
justify-content:center;
background-color:${({ theme }) => theme.textSoft}
color:${({ theme }) => theme.textSoft};
border-color:${({ theme }) => theme.textSoft};
`;
// const Div=styled.div`
// color:${({ theme }) => theme.textSoft};
// border: 4px solid ${({ theme }) => theme.textSoft};
// `;
const Loader = () => {

  return (
    <Container>
      <div className="lds-ripple"><div></div><div></div></div>
    </Container>
  )
}
export default Loader
