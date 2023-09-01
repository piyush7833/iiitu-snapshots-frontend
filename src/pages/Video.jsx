import React, { useEffect, useState} from 'react'
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
import { fetchSuccess, like, dislike, unlike, undislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription, savingVideo } from '../redux/userSlice';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AlertModal from '../components/modal/AlertModal';
// import ConfirmModal from '../components/modal/ConfirmModal';
import Loader from '../components/loader/Loader'
import { getStorage, ref, deleteObject } from "firebase/storage";
import RecommendationLoader from '../components/loader/RecommendationLoader'
import ShareModal from '../components/modal/ShareModal';
import app from "../firebase"; //importing app
import DownloadIcon from '@mui/icons-material/Download';
const Container = styled.div`
display:flex;
gap:24px;
@media (max-width: 800px) {
  flex-direction:column;
}
`;
const Content = styled.div`
flex:5;
margin:2vh;
`;
const VideoWrapper = styled.div`

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
@media (max-width: 450px) {
  align-items:flex-start;
  flex-direction:column;
}
`;
const Info = styled.span`

`;
const Info2 = styled.span`
@media (max-width: 1000px) {
  display:none
}
`;
const Buttons = styled.span`
display:flex;
gap:10px;
align-items:center;
// justify-content:space-between;
cursor:pointer;
`;
const Btn = styled.span`
  display: flex;
  padding:1px 10px;
  gap:5px;
  height: 5vh;
  border-radius: 1.3em;
  background-color: #b7b7b7;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 370px) {
    padding:1px 3px;
  }
`

const Hr = styled.hr`
margin:2vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft}};
  @media (max-width: 800px) {
  margin:0.5vh 0vh;
  }
`;
const Image = styled.img`
width:50px;
height:50px;
margin-top:2vh;
margin-left:1vw;
background-color:${({ theme }) => theme.soft}};
border:1px solid ${({ theme }) => theme.soft}};
border-radius:50%;
@media (max-width: 500px) {
  width:30px;
height:30px;
}
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
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const MoreButton = styled.button`
  font-weight:bold;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  cursor: pointer;
`;
const Subscribe = styled.button`
  display:flex;
  align-items:center;
  padding:10px;
  gap:10px;
  font-size:1.2rem;
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size:1rem;
  }
`;

const VideoFrame = styled.video`
  max-height: 70vh;
  width: 100%;
  object-fit: contain;
`;
export default function Video() {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showConfirmOpenModal, setShowConfirmOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('white');
  // const [confirmColor, setConfirmColor] = useState('white');
  // const [confirmMessage, setConfirmMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUrl = window.location.href;
  const handleOpenAlertModal = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color)
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  }



  const handleOpenShareModal = () => {
    setShowShareModal(true);
  };
  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];




  const [channel, setChannel] = useState({});

   const handlehistory = async() => {
     await axios.put(`/users/videohistory/${currentVideo._id}`);
  }
  
  useEffect(() => {
    const addView = async () => {
      axios.put(`/videos/view/${path}`);
      handlehistory();
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        addView();
        setLoading(false);
      } catch (err) { }
    };
    fetchData();
  }, [path, dispatch]); //as our dependecy is path this time which keeps changing



  const handleLike = async () => {
    await axios.put(`/users/videoLike/${currentVideo._id}`)
    dispatch(like(currentUser._id));
  }
  const handleunlike = async () => {
    await axios.put(`/users/videounLike/${currentVideo._id}`)
    dispatch(unlike(currentUser._id))
  }
  const handleDislike = async () => {
    await axios.put(`/users/videoDislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id));
  }
  const handleundislike = async () => {
    await axios.put(`/users/videounDislike/${currentVideo._id}`)
    dispatch(undislike(currentUser._id))
  }



  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };


  const handleSave = async () => {
    currentUser.videosaved.includes(currentVideo._id)
      ? await axios.put(`/users/videoremove/${currentVideo._id}`)
      : await axios.put(`/users/videosave/${currentVideo._id}`);
    dispatch(savingVideo(currentVideo._id));
  };




  const navigate = useNavigate();
  // const desertRef = ref(storage,'videos/'+filename);
  const handleDelete = async (c) => {
    setLoading(true)
    const storage = getStorage(app);
    const desertRef = ref(storage, `video/${currentVideo.videofileName}`);
    const desertRef2 = ref(storage, `video/${currentVideo.photofileName}`);

    deleteObject(desertRef).then(() => {

    }).catch((error) => {
      handleOpenAlertModal(error.message, 'red')
      setLoading(false);
    });


    deleteObject(desertRef2).then(() => {
      handleOpenAlertModal("Video Deleted", "green");
    }).catch((error) => {
      handleOpenAlertModal(error.message, "red");
      setLoading(false)
    });
    await axios.delete(`/videos/${c}`);
    setLoading(false);
    navigate('/')
  }
  var FileSaver = require('file-saver');
  const handleDownload = async () => {
    try {
      FileSaver.saveAs(currentVideo.videoUrl, currentVideo.title);
    } catch (error) {
      console.log(error);
    }
  }

  if (!currentVideo) {
    return null;
  }
  if(!currentUser){
    handleOpenAlertModal("Sign in to IIITU Snapshots to view media");
  }
  return (
    <>
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
      <Container>
        <Content>
          {loading === false ? <>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls autoPlay />  {/* //creating videoframe */}
            </VideoWrapper>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>{currentVideo.views} views - {format(currentVideo.createdAt)}</Info>
              <Buttons>
                <Btn width="30%">
                  {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon onClick={handleunlike} /> : <ThumbUpOffAltIcon onClick={handleLike} />} {currentVideo.likes?.length}
                  <Hr />
                  {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon onClick={handleundislike} /> : <ThumbDownOffAltIcon onClick={handleDislike} />} {currentVideo.dislikes?.length}
                </Btn>
                <Btn onClick={handleOpenShareModal} width="20%">
                  <SendIcon />
                  <Info2>
                    share
                  </Info2>
                </Btn>
                <Btn width="20%" onClick={handleSave}>
                  {currentUser.videosaved.includes(currentVideo._id) ? (<><TaskAltIcon /> <Info2>Remove</Info2></>) : (<><AddTaskRoundedIcon /> <Info2>Save</Info2></>)}
                </Btn>

                {currentUser._id === currentVideo.userId ?
                  <Btn width="20%" onClick={() => handleDelete(currentVideo._id)}>
                    <DeleteSweepOutlinedIcon /> Delete
                  </Btn> : <Btn width="25%" onClick={() => {
                    handleDownload()
                  }}>
                    <DownloadIcon />
                    <Info2>
                      Download
                    </Info2>
                  </Btn>}
              </Buttons>
            </Details>
          </> : <Loader />}
          <Hr />
          {loading === false ?
            <Uploader>
              <UploaderInfo>
                <Image src={channel.img} />
                <UploaderDetail>
                  <UploaderName>{channel.Normalname}</UploaderName>
                  <UploaderCounter>{channel.subscribers} favorite</UploaderCounter>
                  <UploaderDesc>
                    {showFullDescription ? currentVideo.desc : currentVideo.desc.slice(0, 50)}{" "}
                    {currentVideo.desc.length > 50 && (
                      <MoreButton onClick={toggleDescription}>
                        {showFullDescription ? "Less" : "... More"}
                      </MoreButton>
                    )}
                  </UploaderDesc>
                </UploaderDetail>
              </UploaderInfo>
              <Subscribe onClick={handleSub} style={{ backgroundColor: currentUser.subscribedUsers?.includes(channel._id) ? 'gray' : 'red', transition: 'all 0.5s ease-in-out' }}>
                {currentUser.subscribedUsers?.includes(channel._id)  //already subscribed
                  ? (<><div><RemoveCircleOutlineOutlinedIcon /></div><div>Favorite</div></>)
                  : (<><div><AddCircleOutlineOutlinedIcon /></div><div>Favorite</div></>)}
              </Subscribe>
            </Uploader> : <Loader />}
          <Hr />
          {loading === false ? <Comments videoId={currentVideo._id} type={"video"} /> : <Loader />}
        </Content>
        <Hr />
        {loading === false ? <Recommendation tags={currentVideo.tags} /> : <RecommendationLoader />}  {/*//sending current video tags as props  */}
        {/* {console.log(currentVideo.videoUrl)} */}
      </Container>
    </>
  )
}
