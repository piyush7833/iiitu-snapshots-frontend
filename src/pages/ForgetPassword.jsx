import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import LockIcon from '@mui/icons-material/Lock';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import { useParams, Link } from "react-router-dom";
import AlertModal from '../components/modal/AlertModal';
import Loader from '../components/loader/Loader'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Expired from '../img/expired.gif'
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
const VerifyWrapper = styled.div`
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
const Title = styled.h1`
  font-size: 1.3em;
`;

const SubTitle = styled.h2`
  font-size: 1.1em;
  font-weight: 300;
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
  // border: none;
  padding-left:1em;
  padding-right:1em;
  padding-top:0.8em;
  padding-bottom:0.8em;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;;
  color: ${({ theme }) => theme.text};
  gap:4px;
  // box-shadow: 15px 15px 20px rgba(0,0,0,.6);
`;

const I=styled.div`
display:flex;
width:100%;
align-items:center;
gap:1vw;
`;
const Info = styled.div`
width:30vw;
font-size:1.3rem;
`;
const Image = styled.img`
height:30vh;
`;
const SignIn = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();  //it comes from react redux  ///used to fire redux evets
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [validUrl, setValidUrl] = useState(true);
  const [loader,setLoader]=useState(false);
  const param = useParams();
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
  };

  const axiosInstance = axios.create({
    baseURL: '',

  });

 useEffect(() => {
    const verifyEmailUrl = async () => {
        try {
            const url = `users/${param.id}/reset/${param.resetToken}`;
            console.log(url);
            const { data } = await axios.get(url);
            console.log(data);
            setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    };
    verifyEmailUrl();
}, []);

 const handleReset=async()=>{
    if(password===confpassword && validUrl===true){
        const res = await axios.put(`users/${param.id}/reset/${param.resetToken}`, {password});
        handleOpenAlertModal("Congratulations your password is changed now")
    }
    else{
        handleOpenAlertModal("Password and Confirm Password doesn't match","red")
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
    {validUrl===true? <Container>
      {loader===false?<Wrapper>
        <Title>Reset Your Password</Title>
        <I>
          <LockIcon/>
        <Input type="password" required placeholder="password *" onChange={e => setPassword(e.target.value)} />
        </I>
        <I>
          <NoEncryptionIcon/>
        <Input type="password" required placeholder="confirm password *" onChange={e => setconfPassword(e.target.value)} />
        </I>
        <Button onClick={handleReset}>Submit </Button>
        </Wrapper>:<Loader/>}
    </Container>: (
				<Container>
					<VerifyWrapper>
						<Image src={Expired} />
						<Title>Link expired</Title>
						<Info>This link is expired now go to forget password again to get new link.</Info>
						<Button onClick={() => { navigate('/') }}>
							Login
						</Button>
					</VerifyWrapper>
				</Container>
			)}

    </>
  );
};

export default SignIn;