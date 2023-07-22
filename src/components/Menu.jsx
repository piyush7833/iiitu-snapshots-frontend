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
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import {
    Link
} from "react-router-dom";
const Container = styled.div`
display:absolute;
  flex: 1;
//   width:13vw;
  background-color: ${({ theme }) => theme.bg}};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index:999;
  @media (max-width: 900px) {
    font-size:1rem;
  }
  @media (max-width: 350px) {
    display:${(props)=>props.showMenu===true ? "none":"absolute"};/
}
`;
const Wrapper = styled.div`
 padding-left:2vh;
`;
const LogoWrapper = styled.div`
  display:flex;
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
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding:1.3vh 1vh;
  &:hover{
    background-color: ${({ theme }) => theme.soft}};
    border-radius:1.3rem;
  }
`;
const Hr = styled.hr`
margin:2vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft}};
`;


export default function Menu({ darkMode, setDarkMode, setShowMenu, showMenu }) {
    const currentUser = useSelector(state => state.user.currentUser);
    if (showMenu === false) {
        return null;
    }
    else {
        return (
            <>
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
                                    <HomeIcon />
                                    Home
                                </Items>
                            </Link>
                            <Link to="/trend" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <WhatshotIcon />
                                    Trending
                                </Items>
                            </Link>
                            <Link to="/favorite" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <FavoriteIcon />
                                    Favorite
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/photos" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <PhotoSizeSelectActualIcon />
                                    Photos
                                </Items>
                            </Link>
                            <Link to="/videos" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <SwitchVideoIcon />
                                    Videos
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/recent" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <HistoryToggleOffRoundedIcon />
                                    Recent
                                </Items>
                            </Link>
                            <Link to="/history" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <HistoryRoundedIcon />
                                    History
                                </Items>
                            </Link>
                            <Link to="/saved" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <LibraryBooksIcon />
                                    Library
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <ContactPageIcon />
                                    Contact
                                </Items>
                            </Link>
                            <Link to="/payment" style={{ textDecoration: "none", color: "inherit" }}>
                                <Items>
                                    <PaymentIcon />
                                    Payment
                                </Items>
                            </Link>
                            <Hr />
                            <Link to="/myfiles" style={{ textDecoration: "none", color: "inherit" }}>
                                {currentUser.role === "admin" ? <Items>
                                    <FolderSharedRoundedIcon />
                                    My files
                                </Items> : ""}
                            </Link>
                            <Items onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                                {darkMode ? "Light" : "Dark"} Mode
                            </Items>

                        </Wrapper>
                        {/* :""} */}

                    </Container>) : " "}
            </>
        )
    }
}
