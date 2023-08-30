import React from 'react'
import styled from "styled-components";
import snapshots from "../img/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LightModeIcon from '@mui/icons-material/LightMode';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import AlertModal from './modal/AlertModal';
import { useState } from 'react';
import { logout, logoutFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {
    Link, useNavigate
} from "react-router-dom";
const Container = styled.div`
display:absolute;
  flex: 1;
  background-color: ${({ theme }) => theme.bg}};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index:2;
  overflow-x:hidden;
  overflow-y:scroll;
  ::-webkit-scrollbar {
    display: none; /* Hide the default scrollbar */
  }
  @media (max-width: 900px) {
    font-size:0.8rem;
  }
  @media (max-width: 350px) {
    display:${(props) => props.showMenu === true ? "none" : "absolute"};/
    ${(props) => console.log(props.showMenu)}
}
`;
const Wrapper = styled.div`
 padding-left:2vh;
 @media (max-width: 700px) {
    padding-left:0.2vh;
  }
  @media (max-width: 600px) {
    padding-left:3vh;
  }
  @media (max-width: 500px) {
    padding-left:2vh;
  }
  @media (max-width: 300px) {
    padding-left:1vh;
  }
`;
const LogoWrapper = styled.div`
  display:flex;
  height:12vh;
  align-items:center;
  justify-content:space-evenly;
`;
const Logo = styled.div`
 display flex;
 align-items:center;
 gap:5px;
 justify-content:space-evenly;
`;
const Img = styled.img`
 height:12vh;
 @media (max-width: 500px) {
    display:none
  }
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  cursor: pointer;
  padding:1vh 1vh;
  &:hover{
    background-color: ${({ theme }) => theme.soft}};
    border-radius:1.3rem;
  }
  @media (max-width: 900px) {
    gap:0.5vw;
    padding:0.8vh 0.1vh;
  }
  @media (max-width: 700px) {
    gap:0.5vw;
    padding:0.8vh 0vh;
  }

`;
const Hr = styled.hr`
margin:1vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft}};
`;
const ItemsText = styled.div`
@media (max-width: 600px) {
    display:none
  }
`
const ItemsIcon = styled.div`
`

export default function Menu({ darkMode, setDarkMode, setShowMenu, showMenu }) {
    // const [showMenu, setShowMenu] = useState(false);
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
    const navigation=useNavigate()
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const handleLogout = async (e) => {  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
      e.preventDefault();
      try {
        const res = await axios.post(`/auth/signout`);
        dispatch(logout(res.data))
        navigation('/')
      } catch (error) {
        dispatch(logoutFailure());  //we can also pass error as payload
        handleOpenAlertModal(error.message, 'red')
      }
    };
    if (showMenu === false) {
        return null;
    }
    else {
        return (
            <>
                  <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
                {currentUser ? (
                    <Container >
                        <LogoWrapper>
                            <MenuIcon onClick={() => setShowMenu(!showMenu)} />
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                <Logo>
                                    <Img src={snapshots}>
                                    </Img>
                                </Logo>
                            </Link>
                        </LogoWrapper>
                        <Wrapper>
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <HomeIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Home
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/trend" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <WhatshotIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Trending
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/favorite" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <FavoriteIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Favorite
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/photos" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <PhotoSizeSelectActualIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Photos
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/videos" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <SwitchVideoIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Videos
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/recent" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <HistoryToggleOffRoundedIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Recent
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/history" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <HistoryRoundedIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        History
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/saved" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <LibraryBooksIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Library
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <ContactPageIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Contact
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Link to="/payment" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ItemsIcon>
                                        <PaymentIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        Payment
                                    </ItemsText>
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/myfiles" style={{ textDecoration: "none", color: "inherit" }}>
                                {currentUser.role === "admin" ? <Items>
                                    <ItemsIcon>
                                        <FolderSharedRoundedIcon />
                                    </ItemsIcon>
                                    <ItemsText>
                                        My files
                                    </ItemsText>
                                </Items> : ""}
                            </Link>
                            <Items onClick={() => setDarkMode(!darkMode)}>
                                <ItemsIcon>
                                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                                </ItemsIcon>
                                <ItemsText>
                                    {darkMode ? "Light" : "Dark"} Mode
                                </ItemsText>
                            </Items>
                            <Hr />
                            <Items onClick={handleLogout}>
                                <ItemsIcon>
                                   <LogoutIcon/>
                                </ItemsIcon>
                                <ItemsText>
                                    Log Out
                                </ItemsText>
                            </Items>
                        </Wrapper>
                        {/* :""} */}

                    </Container>) : " "}
            </>
        )
    }
}
