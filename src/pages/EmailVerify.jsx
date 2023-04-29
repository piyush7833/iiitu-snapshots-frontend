import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Verify from '../img/verify2.gif'
import Expired from '../img/expired.gif'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/modal/AlertModal";
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
const Title = styled.div`
font-size:2rem;
`;
const Info = styled.div`
width:30vw;
font-size:1.3rem;
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
const Image = styled.img`
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
const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const navigate=useNavigate();
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

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:3000/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				handleOpenAlertModal(error.message,"red")
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<>
		            <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
			{validUrl ? (
				<Container>
					<VerifyWrapper>
						<Image src={Verify} />
						<Title>Congratulations</Title>
						<Info>Your email is verified now so Login to your account and start using our services</Info>
						<Button onClick={() => { navigate('/') }}>
							Login
						</Button>
					</VerifyWrapper>
				</Container>
			) : (
				<Container>
					<VerifyWrapper>
						<Image src={Expired} />
						<Title>Link expired</Title>
						<Info>This link is expired now try to login again to genrate a new verification link</Info>
						<Button onClick={() => { navigate('/') }}>
							Login
						</Button>
					</VerifyWrapper>
				</Container>
			)}
		</>
	);
};

export default EmailVerify;