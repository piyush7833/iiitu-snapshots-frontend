import React from 'react'
import styled from 'styled-components'
import {format} from "timeago.js"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import RecommendationLoader from './loader/RecommendationLoader';
import { useSelector } from 'react-redux';
import Loader from './loader/Loader';
import {
     useNavigate
  } from "react-router-dom";

  
const Container=styled.div`
padding-top:0.4vh;
padding-bottom:0.4vh;
height:${(props)=>props.type==="small" ? "15vh":"35vh"};
width:${(props)=>props.type==="small" ? "22vw":"20vw"};
cursor:pointer;
margin-bottom:${(props)=>props.type==="small" ? "0.1vh":"2vh"};
margin-top:2vh;
border:1px  ${(props)=>props.type==="small" ? "0px":`solid ${({theme})=>theme.soft}}` } ;
border:1px solid ${({theme})=>theme.soft}};
color:${({theme})=>theme.textSoft}};
border-radius:1.3rem;
display:${(props)=>props.type==="small" && "flex"};


&:hover {
  background-color:${({theme})=>theme.soft}};
}
@media (max-width: 800px) {
  height:${(props)=>props.type==="small" ? "15vh":"35vh"};
  width:${(props)=>props.type==="small" ? "initial":"20vw"};
}
@media (max-width: 500px) {
  height:${(props)=>props.type==="small" ? "15vh":"35vh"};
  width:${(props)=>props.type==="small" ? "initial":"60vw"};
}
@media (max-width: 350px) {
  height:${(props)=>props.type==="small" ? "15vh":"35vh"};
  width:${(props)=>props.type==="small" ? "initial":"70vw"};
}
`;
const LoaderContainer=styled.div`
cursor: progress;
height:250px;
width:300px;
border:solid ${({theme})=>theme.soft}}
display:flex;
align-items:center;
justify-content:center;
border-radius:1.3rem;
margin-top:2vh;
margin-bottom:2vh;
`;
const Image=styled.img`
width:${(props)=>props.type==="small" ? "10vw":"100%"};
height:${(props)=>props.type==="small" ? "15vh":"25vh"};
background-color:${({theme})=>theme.soft}};
border:1px solid ${({theme})=>theme.soft}};
border-radius:1.3rem;
flex:0.8;

`;
const Details=styled.div`
display:flex;
gap:12px;
color:${({theme})=>theme.textSoft}};
flex:1;
`;
const FunctionImage=styled.img`
width:3vw;
height:5vh;
margin-top:2vh;
margin-left:1vw;
background-color:${({theme})=>theme.soft}};
border:1px solid ${({theme})=>theme.soft}};
border-radius:50%;
display:${(props)=>props.type==="small" ?"none" :"flex"};

@media (max-width: 500px) {
  width:8vw;
}
`;
const Text=styled.div`
overflow: hidden;
margin-left:1vw;
flex-direction:coloumn;
color:${({theme})=>theme.text}};

`;
const Organizer=styled.div`
font-size:0.8rem
font-weight:500;
color:${({theme})=>theme.text}};
`;
const FunctionName=styled.div`
font-size:0.6rem;
font-weight:500;
color: ${({ theme }) => theme.text};
`;
const Info=styled.div`
font-size:0.5rem;
color: ${({ theme }) => theme.text};
`;
const  PhotoCard = ({type,photo})=> {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      setLoading(true);
      const res = await axios.get(`/users/find/${photo.userId}`);
      setChannel(res.data);
      setLoading(false);
    };
    fetchChannel();
  }, [photo.userId]);  //dependency is videos.userId i.e. whenever userid changes this function will get call
  function onCall(){
    navigate(`/photo/${photo._id}`)
  }
  const { currentUser } = useSelector((state) => state.user);
  let college;
  let collegephoto;
  if(currentUser.email!==undefined && currentUser.email!==null){
    college=currentUser.email.split('@')[1];
  }
  collegephoto=photo.uploaderemail.split('@')[1];
  if(college===collegephoto){
    return (
      <>
     {loading===false?<Container type={type} onClick={onCall}>
        <Image src={photo.imgUrl} type={type}/>
        <Details>
          <FunctionImage src={channel.img} type={type}/>
          <Text>
              <Organizer>{channel.Normalname}</Organizer>
              <FunctionName>{photo.title.length>50?photo.title.slice(0,50):photo.title}{photo.title.length>50?"...":""}</FunctionName>
              <Info>{photo.views} views - {format(photo.createdAt)} </Info>
          </Text>
        </Details>
      </Container>:type!=="small"?<LoaderContainer><Loader/></LoaderContainer>:<RecommendationLoader/>}
      </>
    )
  }
  else{
    return(
      <></>
    )
  }
}
export default PhotoCard;