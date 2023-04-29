import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import AlertModal from '../components/modal/AlertModal';
import Loader from '../components/loader/Loader'
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100vh;
  background-color:${({ theme }) => theme.bg};
  background-image:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color:${({ theme }) => theme.bgLighter};
  background-image:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 2em;
  gap: 0.8vh;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius:1.3rem;
  width:20vw;
  
`;
const Title = styled.h1`
  font-size: 1.3em;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  border-radius:1.3rem;
  color: ${({ theme }) => theme.text};
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

const I = styled.div`
display:flex;
width:100%;
align-items:center;
gap:1vw;
`;
const SignIn = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loader, setLoader] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState(" ");
    const [alertColor, setAlertColor] = useState('white');
    const handleOpenAlertModal = (message, color) => {
        setAlertMessage(message);
        setAlertColor(color)
        setShowAlertModal(true);
    };

    const handleCloseAlertModal = () => {
        setShowAlertModal(false);
        setAlertMessage('');
    };

    const handleMail = async () => {
        try {
            setLoader(true);
            await axios.post('/users/recovery',{name});
            setLoader(false);
            handleOpenAlertModal("An email has been sent to you to recover your account.","green")
        } catch (error) {
            handleOpenAlertModal(error.message,"red");
            console.log(error);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={showAlertModal}
                onClose={handleCloseAlertModal}
                message={alertMessage}
                color={alertColor}
            />
            <Container>
                {loader === false ? <Wrapper>
                    <Title>Reset Your Password</Title>
                    <I>
                        <PersonIcon />
                        <Input placeholder="username *" required onChange={e => setName(e.target.value)} />
                    </I>
                    <Button onClick={handleMail}>Send Mail</Button>
                        <p> <span onClick={()=>navigate('/')} style={{cursor:"pointer",color:"blue"}}>Log in</span></p>
                </Wrapper> : <Loader />}
            </Container>

        </>
    );
};

export default SignIn;