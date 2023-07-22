import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SendIcon from '@mui/icons-material/Send';
import Comments from '../components/Comments';
import Recommendation from '../components/Recommendation';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSuccess,like,dislike,unlike,undislike} from "../redux/photoSlice";
import { format } from "timeago.js";
import { subscription,savingPhoto } from '../redux/userSlice';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import AlertModal from '../components/modal/AlertModal';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Loader from '../components/loader/Loader'
import RecommendationLoader from '../components/loader/RecommendationLoader';
import ShareModal from '../components/modal/ShareModal';
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from "../firebase"; //importing app
import DownloadIcon from '@mui/icons-material/Download';
const Container = styled.div`
display:flex;
gap:24px;
`;
const Content = styled.div`
flex:5;
margin:2vh;
`;
const ImageWrapper = styled.div`

`;
const Title = styled.div`
font-size:1.4rem;
margin:2vh;
color:${({ theme }) => theme.text};
`;
const Details = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
font-size:0.9rem;
margin:2vh;
color:${({ theme }) => theme.textSoft};
`;
const Info = styled.span`

`;
const Buttons = styled.span`
width:60%;
display:flex;
align-items:center;
justify-content:space-between;
cursor:pointer;
`;
const Btn = styled.span(props => ({
  display: "flex",
  width: props.width,
  height: "5vh",
  borderRadius: `1.3em`,
  backgroundColor: `#b7b7b7`,
  // backgroundColor:`${({theme})=>theme.soft}}`,
  alignItems: "center",
  justifyContent: "space-evenly",
}));

const Hr = styled.hr`
margin:2vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft}};
`;
const Image = styled.img`
width:4vw;
height:7vh;
margin-top:2vh;
margin-left:1vw;
background-color:${({ theme }) => theme.soft}};
border:1px solid ${({ theme }) => theme.soft}};
border-radius:50%;
`;
const Uploader = styled.div`
display: flex;
justify-content: space-between;
`;
const UploaderInfo = styled.div`
display:flex;
gap:2vw;
color:${({ theme }) => theme.text};
`;
const UploaderDetail = styled.div`

`;
const UploaderName = styled.div`
font-weight:500;
`;
const UploaderCounter = styled.div`
color:${({ theme }) => theme.textSoft};
margin-bottom:1vh;
font-size:0.6em;
`;
const UploaderDesc = styled.div`
font-size:0.8em;
`;
const Subscribe = styled.button`
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-size:1.2rem;
  width:16%;
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const ImageFrame = styled.img`
  max-height: 70vh;
  width: 100%;
  object-fit: contain;
`;

export default function Photo() {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [alertColor, setAlertColor] = useState('white');
  const [loading,setLoading]=useState(false);
  const currentUrl = window.location.href;
  const handleOpenAlertModal = (message,color) => {
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

  const handleOpenShareModal = () => {
    setShowShareModal(true);
  };
  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const { currentUser } = useSelector((state) => state.user);
  const { currentPhoto } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];  //as our pathname include vide/video_id and we want only video id
  //const [currentPhoto,setPhoto]=useState({});  //if we use useState to populate like dislike or subscribe then user need to refresh page to see that like is working or not

  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const photoRes = await axios.get(`/photos/find/${path}`);
        const channelRes = await axios.get(`/users/find/${photoRes.data.userId}`);
        setChannel(channelRes.data);
        axios.put(`/photos/view/${path}`);
        await axios.put(`/users/photohistory/${currentPhoto._id}`);
        dispatch(fetchSuccess(photoRes.data));
        setLoading(false);
      } catch (err) { handleOpenAlertModal(err.msg,'red')}
    };
    fetchData();
  }, [path,dispatch,currentPhoto._id]); //as our dependecy is path this time which keeps changing



  const handleLike = async () => {
    await axios.put(`/users/photoLike/${currentPhoto._id}`)
    dispatch(like(currentUser._id));
  }
  const handleunlike = async () => {
    await axios.put(`/users/photounLike/${currentPhoto._id}`)
    dispatch(unlike(currentUser._id))
  }
  const handleDislike = async () => {
    await axios.put(`/users/photoDislike/${currentPhoto._id}`)
    dispatch(dislike(currentUser._id));
  }
  const handleundislike = async () => {
    await axios.put(`/users/photounDislike/${currentPhoto._id}`)
    dispatch(undislike(currentUser._id))
  }


  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };


  const navigate=useNavigate();
  const handleDelete=async(c)=>{
    setLoading(true);
    const storage = getStorage(app);
    const desertRef = ref(storage, `photo/${currentPhoto.fileName}`);
    await axios.delete(`/photos/${c}`);
    deleteObject(desertRef).then(() => {
      handleOpenAlertModal("Photo Deleted","green");
    }).catch((error) => {
      handleOpenAlertModal(error.message,"red");
      setLoading(false)
    });
    
    setLoading(false);
    navigate('/')
  }
  const handleSave = async () => {
    currentUser.photosaved.includes(currentPhoto._id)
      ? await axios.put(`/users/photoremove/${currentPhoto._id}`)
      : await axios.put(`/users/photosave/${currentPhoto._id}`);
    dispatch(savingPhoto(currentPhoto._id));
  };

  var FileSaver = require('file-saver');
  const handleDownload = async() => {
    try {
      FileSaver.saveAs(currentPhoto.imgUrl, currentPhoto.title);
    } catch (error) {
      console.log(error);
    }
  }
  if(!currentPhoto || !currentUser){
    return null;
  }
  return (
    <Container>
      <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        alertColor={alertColor}
      />
                  <ShareModal
        currentUrl={currentUrl}
        isOpen={showShareModal}
        onClose={handleCloseShareModal}
      />
      <Content>
      {loading===false?  <>
        <ImageWrapper>
          <ImageFrame src={currentPhoto.imgUrl} zoom={true} controller />  {/* //creating ImageFrame */}
        </ImageWrapper>
        <Title>{currentPhoto.title}</Title>
        <Details>
          <Info>{currentPhoto.views} views - {format(currentPhoto.createdAt)}</Info>
          <Buttons>
            <Btn width="30%">
              {currentPhoto.likes?.includes(currentUser._id) ? <ThumbUpIcon onClick={handleunlike} /> : <ThumbUpOffAltIcon onClick={handleLike} />} {currentPhoto.likes?.length}
              <Hr />
              {currentPhoto.dislikes?.includes(currentUser._id) ? <ThumbDownIcon onClick={handleundislike} /> : <ThumbDownOffAltIcon onClick={handleDislike} />} {currentPhoto.dislikes?.length}
            </Btn>
            <Btn onClick={handleOpenShareModal} width="20%">
              <SendIcon  /> share
            </Btn>
            <Btn width="20%" onClick={handleSave}>
              {currentUser.photosaved.includes(currentPhoto._id)?(<><TaskAltIcon  /> <Info>Remove</Info></>):(<><AddTaskRoundedIcon  /> <Info>Save</Info></>)}
            </Btn>
            {currentUser._id===currentPhoto.userId? 
           <Btn width="20%">
              <DeleteSweepOutlinedIcon onClick={()=>handleDelete(currentPhoto._id)}/> Delete
            </Btn>:<Btn width="25%" onClick={()=>handleDownload()}>
              <DownloadIcon /> Download
            </Btn>}
          </Buttons>
        </Details>
        </>:<Loader/>}
        <Hr />
        {loading===false?<Uploader>  
          <UploaderInfo>
            <Image src={channel.img} />
            <UploaderDetail>
              <UploaderName>{channel.name}</UploaderName>
              <UploaderCounter>{channel.subscribers} favorite</UploaderCounter>
              <UploaderDesc>{currentPhoto.desc}</UploaderDesc>
            </UploaderDetail>
          </UploaderInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscribedUsers?.includes(channel._id)  //already subscribed
              ? (<><div><RemoveCircleOutlineOutlinedIcon /></div><div>Favorite</div></>)
              : (<><div><AddCircleOutlineOutlinedIcon /></div><div>Favorite</div></>)} 
          </Subscribe>
        </Uploader>:<Loader/>}   

        <Hr />
       {/* {loading===false? <Comments photoId={currentPhoto._id} type={"photo"}/>:<Loader/>} */}
      </Content>
      <Hr />
       {loading===false?<Recommendation tags={currentPhoto.tags} />:<RecommendationLoader/>}{/*  //sending current video tags as props  */}
    </Container>
  )
}
