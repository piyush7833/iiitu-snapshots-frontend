import React from "react";
import styled from 'styled-components';
import { useState } from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AlertModal from "./AlertModal";
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
z-index:5;
`;

const Wrapper = styled.div`
  width: 28vw;
  height: 25vh;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 1.3em;
  display: flex;
  align-items:center;
  justify-content:space-evenly;
  flex-direction:coloumn;
  gap: 20px;
  position: relative;
  border-radius:1.3rem;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
`;
const Close = styled.div`
  position: absolute; //it goes to end due to position absolute
  top: 10px;
  right: 10px;
  font-size:1.3rem;
  cursor: pointer;
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
const Btn=styled.div`
display:flex;
align-items:center;
justify-content:space-evenly; 
margin-top:3vh;
`;
const ShareModal = ({ currentUrl,isOpen,onClose }) => {

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

  const handleShare = (url, platform) => {
    switch (platform) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send/?text=${url}`);
        break;
      case "telegram":
        window.open(`https://telegram.me/share/url?url=${url}`);
        break;
      case "instagram":
        window.open(`https://www.instagram.com/direct/inbox/?url=${url}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      default:
        break;
    }
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    handleOpenAlertModal("Link is copied","green")
  };

  return (
    <div>
      {isOpen ===true? (
        <>
             <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
        <Container>
          <Wrapper>
          <Close onClick={onClose}>X</Close>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
          <Box>{currentUrl}</Box>
          <Btn>
          <Button onClick={() => copyUrlToClipboard()}><ContentCopyIcon/></Button>
          <Button onClick={() => handleShare(currentUrl, "whatsapp")}>
            <WhatsAppIcon/>
          </Button>
          <Button onClick={() => handleShare(currentUrl, "telegram")}>
            <TelegramIcon/>
          </Button>
          <Button onClick={() => handleShare(currentUrl, "instagram")}>
            <InstagramIcon/>
          </Button>
          <Button onClick={() => handleShare(currentUrl, "facebook")}>
            <FacebookIcon/>
          </Button>
          </Btn>
          </div>
          </Wrapper>
        </Container>
        </>
      ):" "}
    </div>
  );
};

export default ShareModal;
