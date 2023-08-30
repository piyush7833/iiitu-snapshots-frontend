import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AlertModal from '../components/modal/AlertModal';
import axios from 'axios';
// import { useEffect } from 'react';
import Msg from '../components/Msg'
import {
  Link
} from "react-router-dom";
const Container = styled.div`
background-color:${({ theme }) => theme.bgLighter};
height:90vh;
`;
const ContactWrapper = styled.div`
display:flex;
text-align:center;
height:70vh;
align-items:center;
justify-content:space-around;
@media (max-width: 600px) {
  flex-direction:column;
}
`;
const Title = styled.div`
font-size:3rem;
align-items:center;
justify-content:center;
text-align:center;
@media (max-width: 1000px) {
  font-size:2.3rem;
}
`;

const Message = styled.textarea`
  margin-top:4vh;
  border: 3px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 1.3rem;
  padding: 10px;
  background-color: transparent;
  width:40%;
  height:50%;
  box-shadow: 15px 15px 20px rgba(0,0,0,.6);
  @media (max-width: 600px) {
    width:80%;
  }
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
  margin-left:5vw;
  box-shadow: 15px 15px 20px rgba(0,0,0,.6);
`;
const Connect = styled.div`
// width:40%;
font-size:2.3rem;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:space-evenly;
@media (max-width: 1000px) {
  font-size:1.8rem;
}
@media (max-width: 800px) {
  font-size:1.5rem;
}
@media (max-width: 600px) {
  width:100%;
}

`;
const Icon = styled.div`
position: relative; 
display: inline-block;
height: 50px;
width: 50px;
margin: 1vh;
line-height: 50px;
border-radius: 50%;
color: ${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.bg};
cursor: pointer; 
transition: all .2s ease-in-out;
&:hover{
  background-color: ${({ theme }) => theme.text}; 
  color: ${({ theme }) => theme.bgLighter};
}
&:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 51px;
  width: 51px;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 0 1px #fff;
  transition: all .2s ease-in-out;
}
&:hover:after{
  opacity: 1;  
  transform: scale(1.12);
  transition-timing-function: cubic-bezier(0.37,0.74,0.15,1.65);
  
}
&:hover a{
  color: #000;
}
`;
const Social = styled.div`
display:flex;
align-items:center;
justify-content:justify;
gap:2vw;
margin-left:10vw; 
font-size:1.5rem;
@media (max-width: 1000px) {
  font-size:1.2rem;
}
`;
// const Table=styled.table``;
const Contact = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let name = currentUser.name;
  let Normalname = currentUser.Normalname;
  let email = currentUser.email;
  // const [loading,setLoading]=useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [alertColor, setAlertColor] = useState('white');
  const handleOpenAlertModal = (message,color) => {
    setAlertMessage(message);
    setAlertColor(color)
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
    Message.reset();
  };

  const savemsg=async(e)=>{  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
    e.preventDefault();
    try {
      await axios.post(`/contacts`,{Normalname,name,email,message});
      handleOpenAlertModal("Your message is sent. We will get back to you soon","green")
      setMessage("");
    } catch (error) {
      handleOpenAlertModal(error.msg,'red')
    }
  };

  // const [msgs,setMsgs]=useState([]);
  // useEffect(() => {
  //   if(currentUser.role==="developer"){
  //     const fetchMsg = async () => {
  //       setLoading(true)
  //       const res = await axios.get(`/contacts`);
  //       setMsgs(res.data);
  //       setLoading(false);
  //     };
  //     fetchMsg();
  //   }
  // }, [currentUser.role]);  //dependency is videos.userId i.e. whenever userid changes this function will get call
  return (
    <>
                <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
    
    {currentUser.role!=="developer"?<Container>
      <Title>Contact for querries and feedback</Title>
      <ContactWrapper>
        <Message
          placeholder="Message"
          name="desc"
          rows={12}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Connect>Connect with me on
          <Link to="mailto:ps671248@gmail.com" target={'_blank'} style={{ textDecoration: "none", color: "inherit" }}>
            <Social><Icon><EmailIcon /></Icon>Mail</Social>
          </Link>
          <Link to="https://www.linkedin.com/in/piyush-singh-403089221/" target={'_blank'} style={{ textDecoration: "none", color: "inherit" }}>
            <Social><Icon><LinkedInIcon /></Icon>LinkedIn</Social>
          </Link>
          <Link to="https://www.instagram.com/_piyush_8_3_3/" target={'_blank'} style={{ textDecoration: "none", color: "inherit" }}>
            <Social><Icon><InstagramIcon /></Icon>Instagram</Social>
          </Link>
          <Link to="https://t.me/piyush7833" target={'_blank'} style={{ textDecoration: "none", color: "inherit" }}>
            <Social><Icon><TelegramIcon /></Icon>Telegram</Social>
          </Link>
        </Connect>
      </ContactWrapper>
      <Button onClick={savemsg } >Send</Button>
    </Container>:
    <Container>
      <Msg/>
    </Container>
    }
    </>
  )
}

export default Contact
