import React, { useState } from 'react'
import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { useSelector } from 'react-redux';
import VideoUpload from './VideoUpload';
import PhotoUpload from './PhotoUpload';
import { useNavigate, Link } from 'react-router-dom';
import AlertModal from './modal/AlertModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import snapshots from "../img/logo.png"
const Logo = styled.div`
 display flex;
 align-items:center;
 gap:5px;
 justify-content:space-evenly;
`;
const Img = styled.img`
 height:12vh;
 @media (max-width: 1100px) {
  height:8vh;
}
@media (max-width: 800px) {
  height:6vh;
}
@media (max-width: 600px) {
  display:none
}
`;
const LogoWrapper = styled.div`
  display:flex;
  align-items:center;
  height:100%;
  padding : 0vh 2vw;
  width:10%;
  justify-content:space-evenly;
  overflow:hidden;
`;
const Container = styled.div`;
   display:flex;
   justifyContent:space-between;
   position:sticky;
   top:0;
   background-color:${({ theme }) => theme.bg};
   height:10vh;
   z-index:2;
  //  margin-right:-6vw;
`;
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  height:100%;
  width:90%;
  padding : 0vh 2vw;
  justify-content:flex-end;
  @media (max-width: 1000px) {
    justify-content:flex-end;
  }
`;
const ItemWrapper = styled.div`
  display:flex;
  align-items:center;
  height:100%;
  width:30%;
  justify-content:space-around;;
  @media (max-width: 700px) {
    width:40%;
  }
  @media (max-width: 500px) {
    width:50%;
  }
`;
const SearchWrapper = styled.div`
  display:flex;
  align-items:center;
  height:100%;
  width:70%;
  justify-content:center;
  @media (max-width: 700px) {
    width:60%;
  }
  @media (max-width: 500px) {
    width:50%;
  }
`;

const Search = styled.div`
   width:40%;
   left:0;
   right:0;
   display:flex;
   align-items:center;
  justify-content:space-around;
   padding:1vh;
   border:0.2px solid #cccc;
   border-radius:1.3em;
   cursor:pointer;
   @media (max-width: 700px) {
    width:60%;
  }
   @media (max-width: 500px) {
    width:80%;
  }
   color:${({ theme }) => theme.text};
`;
const Input = styled.input`
   width:98%;
   border:none;
   border-radius:1.3em;
   enabled-border:none;
   background-color:transparent;
   color:white;
   &:focus {
    outline: none;
  }
  &::placeholder {
    color: white; /* Change this color to your desired placeholder color */
  }
`;
const Item = styled.div`
display:flex;
width:50%;
justify-content:flex-end;
gap:5px;
color:${({ theme }) => theme.text};
@media (max-width: 500px) {
  width:40%;
}

`;
const User = styled.div`
display:flex;
justify-content:flex-end;
gap:5px;
color:${({ theme }) => theme.text};
cursor:pointer;
padding:5px;

&:hover{
  background-color: ${({ theme }) => theme.soft}};
  border-radius:1.3rem;
}
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const Video = styled.div`
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
padding:5px;
width:25%;
&:hover{
  background-color: ${({ theme }) => theme.soft}};
  border-radius:1.3rem;
}
`;
const Photos = styled.div`
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
width:25%;
padding:5px;
&:hover{
  background-color: ${({ theme }) => theme.soft}};
  border-radius:1.3rem;
}
`;
const UserName = styled.div`
@media (max-width: 500px) {
  display:none;
}
`
export default function Navbar({ showMenu, setShowMenu }) {

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

  const navigation = useNavigate();

  const currentUser = useSelector(state => state.user.currentUser);
  let role;
  if (currentUser !== null) {
    role = currentUser.role;
    // console.log(role)
  }


  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [q, setQ] = useState("");
  const navigate=useNavigate()
  return (
    <>
      <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
      {currentUser ? (
        <Container>
          {showMenu === false ? <LogoWrapper>
            <MenuIcon onClick={() => setShowMenu(!showMenu)} style={{ color: "white" }} />
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Logo>
                <Img src={snapshots}>
                </Img>
              </Logo>
            </Link>
          </LogoWrapper> : null}


          <Wrapper>
            <SearchWrapper>
              <Search>
                <Input placeholder='Search' onChange={(e) => { setQ(e.target.value) }} />
                <SearchOutlinedIcon onClick={() => navigation(`/search?q=${q}`)} />
              </Search >
            </SearchWrapper>
            <ItemWrapper>
              <Item>

                <>

                  {role === "admin" ? (
                    <>
                      <Photos onClick={() => { setOpen2(true) }}>
                        <AddAPhotoOutlinedIcon  />
                      </Photos>
                      <Video onClick={() => { setOpen(true) }}>
                        <VideoCallOutlinedIcon  />
                      </Video> </>
                  ) : (<>
                    <Photos onClick={() => handleOpenAlertModal("As a non-admin user, uploading photos is restricted. To obtain admin privileges, proceed to the payment section and select a plan for purchase.", "green")}>
                      <AddAPhotoOutlinedIcon  />
                    </Photos>
                    <Video onClick={() => handleOpenAlertModal("As a non-admin user, uploading videos is restricted. To obtain admin privileges, proceed to the payment section and select a plan for purchase.", "green")}>
                      <VideoCallOutlinedIcon  />
                    </Video> </>)
                  }
                </>
              </Item>

              
              <User onClick={()=>navigate('/profile')}>
               {currentUser.img ? <Avatar src={currentUser.img} /> : <AccountCircleIcon />}
                <UserName> {currentUser.Normalname ? currentUser.Normalname : currentUser.name}</UserName>
              </User>
            </ItemWrapper>
          </Wrapper>
        </Container>) : " "
      }
      {open && <VideoUpload setOpen={setOpen} />}
      {open2 && <PhotoUpload setOpen2={setOpen2} />}
    </>
  )
}
