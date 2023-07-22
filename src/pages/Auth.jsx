import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import {auth,gprovider} from "../firebase.js";
import {signInWithPopup} from "firebase/auth"
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import AlertModal from '../components/modal/AlertModal';
import Loader from '../components/loader/Loader'
import { useNavigate } from "react-router-dom";

// import '../Auth.css'
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


const Link = styled.span`
  text-align:center
`;
const Btn=styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-evenly;
`;
const I=styled.div`
display:flex;
width:100%;
align-items:center;
gap:1vw;
`;

const SignIn = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();  //it comes from react redux  ///used to fire redux evets
  const [Normalname, setNormalName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [signinloader, setsigninLoader] = useState(false);
  const [signuploader, setsignupLoader] = useState(false);
  let reg=/.ac.in/


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
    baseURL: 'https://iiitusnapshotbackend.onrender.com/api',
    withCredentials: true,
  });

  const handleLogin=async(e)=>{  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
    e.preventDefault();
    dispatch(loginStart());   //no payload passed
    try {
      setsigninLoader(true);
      const res = await axiosInstance.post(`/auth/signin`,{name,password});
      dispatch(loginSuccess(res.data))
      setsigninLoader(false);
      navigate('/')
    } catch (error) {
      setsigninLoader(false);
      dispatch(loginFailure());  //we can also pass error as payload
      handleOpenAlertModal("Wrong credentials or user is not verified",'red')
    }
  };


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, gprovider)
      .then((result) => {
       let p=reg.test(result.user.email);
       if(p!==true){handleOpenAlertModal("Use IIIT Una college email",'red')} 
       setsigninLoader(true);
        axiosInstance
          .post("/auth/google", {
            name: result.user.email.split('@')[0],
            Normalname: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
            verified: true,
          },{withCredentials:true})
          .then((res) => {
            if(p===true){
            dispatch(loginSuccess(res.data));
            setsigninLoader(false);
            navigate('/')
          }
          else{
            setsigninLoader(false);
            dispatch(loginFailure());
          }
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
        setsigninLoader(false);
        handleOpenAlertModal("Wrong credentials or user is not verified",'red')
      }); 
      
  };

  const handleSignup=async(e)=>{  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
    e.preventDefault();
    dispatch(loginStart());   //no payload passed
    let result2=reg.test(email);
    try {
      if(result2===true){
      if(password===confpassword){
        setsignupLoader(true);
       await axios.post(`/auth/signup`,{Normalname,name,password,email,phone});
      setsignupLoader(false);
      navigate('/verifyemail')
    }
    else{
      setsignupLoader(false);
      handleOpenAlertModal('Password and correct password is not same','red')
    }
      }
      else{
        let msg='Use IIIT Una college email id';
        handleOpenAlertModal(msg,'red');
      }
    } catch (error) {
      handleOpenAlertModal("Fill all the necessary fields or user already exist",'red')
    }
  };
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    console.log(isActive);
  };


  return (
    
    <Container>
            <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
      {signinloader===false?<Wrapper style={isActive===true?{display:"none"}:{display:"flex"}}>
        <Title>Sign in</Title>
        <SubTitle>to continue to IIITU SnapShots</SubTitle>
        <I>
          <PersonIcon/>
        <Input placeholder="username *" required onChange={e => setName(e.target.value)} />
        </I>
        <I>
          <LockIcon/>
        <Input type="password" required placeholder="password *" onChange={e => setPassword(e.target.value)} />
        </I>
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or signin with</Title>
        <Btn>
        <Button onClick={signInWithGoogle}><GoogleIcon/>Google</Button>
        {/* <Button onClick={signInWithGit}><GitHubIcon/>Github</Button> */}
        </Btn>
        <Link style={{cursor:"pointer",color:"blue"}} onClick={()=>navigate('/recovery')} >Forget Password ?</Link>
        
        <p>Not have an account ? <span onClick={toggleClass} style={{cursor:"pointer",color:"blue"}}>Create one</span></p>
        </Wrapper>:<Loader/>}
        {signuploader===false?<Wrapper style={isActive===false?{display:"none"}:{display:"flex"}} >
        <Title>Sign Up</Title>
        <SubTitle>to continue to IIITU SnapShots</SubTitle>
        <I>
        <PersonIcon/><Input placeholder="Full name *" name="Normalname" required onChange={e => setNormalName(e.target.value)} />
        </I>
        <I>
        <PersonIcon/><Input placeholder="username *" name="name" required onChange={e => setName(e.target.value)} />
        </I>
        <I>
        <ContactMailIcon/> <Input placeholder="email *" name="email" required onChange={e => setEmail(e.target.value)} />
        </I>
        <I>
        <ContactPhoneIcon/><Input type="phone" placeholder="phone number (optional)" name="phone" required onChange={e => setPhone(e.target.value)} />
        </I>
        <I>
        <LockIcon/><Input type="password" placeholder="password *" name="password" required onChange={e => setPassword(e.target.value)} />
        </I>
        <I>
        <NoEncryptionIcon/><Input type="password" placeholder="Confirm password *" name="confpassword" required onChange={e => setconfPassword(e.target.value)} />
        </I>
        <Button onClick={handleSignup}>Sign up</Button>
        <Title>or signup with</Title>
        <Btn>
        <Button onClick={signInWithGoogle}><GoogleIcon/>Google</Button>
        {/* <Button onClick={signInWithGoogle}><GitHubIcon/>Github</Button> */}
        </Btn>
        <p>Already have an account ?  <span onClick={toggleClass} style={{cursor:"pointer",color:"blue"}}>Log in</span></p>
      </Wrapper>:<Loader/>}
    </Container>
  );
};

export default SignIn;