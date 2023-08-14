// import { Button } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import Email from '../img/email.gif'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Container=styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:100vh;
background-color:${({ theme }) => theme.bg};
background-image:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
color: ${({ theme }) => theme.text};
`;
const Title=styled.div`
font-size:2rem;
`;
const Info=styled.div`
width:30vw;
font-size:1.3rem;
`;

const VerifyWrapper=styled.div`
display:flex;
flex-direction:column;
align-items:center;
flex-direction:column;
height:70vh;
width:35%;
justify-content:space-between;
text-align:justify;
margin-right:2vw;
background-color:${({ theme }) => theme.bgLighter};
background-image:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
border-radius:1.3rem;
box-shadow: 0 15px 25px rgba(0,0,0,.6);
padding: 2em;
`;
const Image=styled.img`
height:30vh;
`;
const Button = styled.button`
border-radius: 1.3rem;
padding-left:1em;
padding-right:1em;
padding-top:0.8em;
padding-bottom:0.8em;
font-weight: 500;
cursor: pointer;
background-color: transparent;;
color: ${({ theme }) => theme.text};
width:40%;
text-align:center;
box-shadow: 0 15px 25px rgba(0,0,0,.6);
`;
const BeforeEmailVerify = () => {
  const navigate=useNavigate();
  return (
    <Container>
    <VerifyWrapper>
      <Image src={Email}/>
      <Title>Verify Your email</Title>
      <Info>We have sent an email to you to verify your email address and activate your account. So please verify your email within 24hr otherwise link will get expired and then login again</Info>
      <Button onClick={()=>window.location.replace(`https://mail.google.com/mail/u/0/#inbox`)} >
      {/* <Link to={`https://mail.google.com/mail/u/0/#inbox`} style={{textDecoration:"none",color:"inherit"}}> */}
        Check Email
      {/* </Link> */}
      </Button>
      </VerifyWrapper>
    </Container>
  )
}

export default BeforeEmailVerify
