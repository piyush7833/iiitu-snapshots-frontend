import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, gprovider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth"
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
// import GitHubIcon from '@mui/icons-material/GitHub';
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
  padding:1rem 2rem;
  gap: 0.8vh;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius:1.3rem;
  width:20vw;
  @media (max-width: 800px) {
    width:50vw;
  }
  @media (max-width: 500px) {
    width:70vw;
  }
`;

const Title = styled.h1`
  font-size: 1.3em;
  @media (max-width: 500px) {
    font-size:1.2rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.1em;
  font-weight: 300;
  @media (max-width: 500px) {
    font-size:0.8rem;
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 0.8rem;
  background-color: transparent;
  width: 100%;
  border-radius:1.3rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: 800px) {
    padding:0.6rem;
  }
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
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  gap:4px;
  // box-shadow: 15px 15px 20px rgba(0,0,0,.6);
  &:disabled{
    cursor: not-allowed;
    background-color:${({ theme }) => theme.bg} ;
  }
  @media (max-width: 500px) {
  padding-left:0.8rem;
  padding-right:0.8rem;
  padding-top:0.6rem;
  padding-bottom:0.6rem;
  }
`;


const Link = styled.span`
  text-align:center
`;
const Btn = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-evenly;
`;
const I = styled.div`
display:flex;
width:100%;
align-items:center;
gap:1vw;
`;

const Error = styled.span`
  color: red;
`
const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();  //it comes from react redux  ///used to fire redux evets
  const [Normalname, setNormalName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [signinloader, setsigninLoader] = useState(false);
  const [signuploader, setsignupLoader] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [invalid, setInvalid] = useState(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  let reg = /.ac.in/


  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [alertColor, setAlertColor] = useState('white');
  const handleOpenAlertModal = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color)
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setsignupLoader(false)
    setsigninLoader(false)
    setShowAlertModal(false);
    setAlertMessage('');
  };



  const handleLogin = async (e) => {  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
    e.preventDefault();
    dispatch(loginStart());   //no payload passed
    try {
      setsigninLoader(true);
      const res = await axios.post(`/auth/signin`, { name, password });
      dispatch(loginSuccess(res.data))
      setsigninLoader(false);
      navigate('/')
      // console.log(res.data);
    } catch (error) {
      setsigninLoader(false);
      dispatch(loginFailure());  //we can also pass error as payload
      handleOpenAlertModal("Wrong credentials or user is not verified", 'red')
    }
  };


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, gprovider)
      .then((result) => {
        let p = reg.test(result.user.email);
        if (p !== true) {
          handleOpenAlertModal("Use college email id", 'red')
          setsigninLoader(false);
          setsignupLoader(false);
        }
        if (p === true) {
          setsigninLoader(true);
          setsignupLoader(true);
          axios
            .post("/auth/google", {
              name: result.user.email.split('@')[0],
              Normalname: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
              verified: true,
            })
            .then((res) => {
              if (p === true) {
                dispatch(loginSuccess(res.data));
                setsigninLoader(false);
                setsignupLoader(false);
                navigate('/')
              }
              else {
                setsignupLoader(false);
                setsigninLoader(false);
                dispatch(loginFailure());
              }
            });
        }
      })
      .catch((error) => {
        dispatch(loginFailure());
        setsignupLoader(false);
        setsigninLoader(false);
        console.log(error.message)
        handleOpenAlertModal("Wrong credentials or user is not verified", 'red')
      });

  };

  const handleSignup = async (e) => {  //as soon as we login we have a cookie with us which include our acess token so we can do like, comment, subscribe functionalities
    e.preventDefault();
    dispatch(loginStart());   //no payload passed
    let result2 = reg.test(email);
    try {
      if (result2 === true) {
        if (password === confpassword) {
          setsignupLoader(true);
          await axios.post(`/auth/signup`, { Normalname, name, password, email, phone });
          setsignupLoader(false);
          navigate('/verifyemail')
        }
        else {
          setsignupLoader(false);
          handleOpenAlertModal('Password and correct password is not same', 'red')
          // alert("password and correct password is not same")
        }
      }
      else {
        let msg = 'Use IIIT Una college email id';
        handleOpenAlertModal(msg, 'red');
      }
    } catch (error) {
      // console.log(error.message)
      handleOpenAlertModal("Fill all the necessary fields or user already exist", 'red')
    }
  };
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    console.log(isActive);
  };


  // const signInWithGit = async () => {
  //   dispatch(loginStart());
  //   signInWithPopup(auth, giprovider)
  //     // .then((result) => {
  //     //   axios
  //     //     .post("http://localhost:8800/api/auth/google", {
  //     //       name: result.user.displayName,
  //     //       email: result.user.email,
  //     //       img: result.user.photoURL,
  //     //     })
  //     //     .then((res) => {
  //     //       console.log(res)
  //     //       dispatch(loginSuccess(res.data));
  //     //       // navigate("/")
  //     //     });
  //     // })
  //     // .catch((error) => {
  //     //   dispatch(loginFailure());
  //     // });
  // };

  //   onClick(event) {
  //     handleLogin();
  //     toggleClass();
  //  } 
  const handleNameChange = async (n) => {
    const res = await axios.post(`/users/findnameforsignup`, {
      name: n
    });
    /* console.log(res) */
    if (res.data === true) {
      setIsUser(true);
    }
    else {
      setIsUser(false);
    }
  }

  const handleEmailChange = async (e) => {
    let p = reg.test(e);
    if (p) { setIsInvalidEmail(false) };
    if (!p) { setIsInvalidEmail(true) };
    const res = await axios.post(`/users/findemailforsignup`, {
      email: e
    });
    /* console.log(res) */
    if (res.data === true) {
      setIsUserEmail(true);
    }
    else {
      setIsUserEmail(false);
    }
  }

  useEffect(() => {

    if (isUserEmail || isUser || isInvalidEmail) {
      setInvalid(true);
    }
    else {
      setInvalid(false);
    }
  }, [isUser, isUserEmail, isInvalidEmail])
  return (

    <Container>
      <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
      {signinloader === false ? <Wrapper style={isActive === true ? { display: "none" } : { display: "flex" }}>
        <Title>Sign in</Title>
        <SubTitle>to continue to IIITU SnapShots</SubTitle>
        <I>
          <PersonIcon />
          <Input placeholder="Username*" required onChange={e => setName(e.target.value)} />
        </I>
        <I>
          <LockIcon />
          <Input type="password" required placeholder="Password*" onChange={e => setPassword(e.target.value)} />
        </I>
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or Sign in with</Title>
        <Btn>
          <Button onClick={signInWithGoogle}><GoogleIcon />Google</Button>
          {/* <Button onClick={signInWithGit}><GitHubIcon/>Github</Button> */}
        </Btn>
        <Link style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate('/recovery')} >Forget Password ?</Link>

        <p>Not have an account ? <span onClick={toggleClass} style={{ cursor: "pointer", color: "blue" }}>Create one</span></p>
      </Wrapper> : <Loader />}


      {signuploader === false ? <Wrapper style={isActive === false ? { display: "none" } : { display: "flex" }} >
        <Title>Sign Up</Title>
        <SubTitle>to continue to IIITU SnapShots</SubTitle>
        <I>
          <PersonIcon /><Input placeholder="Full name *" name="Normalname" required onChange={e => setNormalName(e.target.value)} />
        </I>
        <I>
          <PersonIcon /><Input placeholder="Username*" name="name" required onChange={(e) => { setName(e.target.value); handleNameChange(e.target.value) }} />
        </I>
        <I>
          <ContactMailIcon /> <Input placeholder="Email*" name="email" required onChange={(e) => { setEmail(e.target.value); handleEmailChange(e.target.value) }} />
        </I>
        <I>
          <ContactPhoneIcon /><Input type="phone" placeholder="Phone number (optional)" name="phone" required onChange={e => setPhone(e.target.value)} />
        </I>
        <I>
          <LockIcon /><Input type="password" placeholder="Password*" name="password" required onChange={e => setPassword(e.target.value)} />
        </I>
        <I>
          <NoEncryptionIcon /><Input type="password" placeholder="Confirm password*" name="confpassword" required onChange={e => setconfPassword(e.target.value)} />
        </I>

        {isUser && <Error>Username not availiable</Error>}
        {isUserEmail && <Error>Email id already exist</Error>}
        {isInvalidEmail && <Error>Use college email id only</Error>}

        <Button disabled={invalid} onClick={handleSignup}>Sign up</Button>
        <Title>or Sign up with</Title>
        <Btn>
          <Button onClick={signInWithGoogle}><GoogleIcon />Google</Button>
          {/* <Button onClick={signInWithGoogle}><GitHubIcon/>Github</Button> */}
        </Btn>
        <p>Already have an account ?  <span onClick={toggleClass} style={{ cursor: "pointer", color: "blue" }}>Log in</span></p>
      </Wrapper> :  <Loader />}
    </Container>
  );
};

export default SignIn;