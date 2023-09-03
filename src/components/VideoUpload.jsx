import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"; //importing app
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertModal from './modal/AlertModal';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:999;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius:1.3rem;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
`;
const Close = styled.div`
  position: absolute; //it goes to end due to position absolute
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:disabled{
  cursor: not-allowed;
 }
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
//   font-size:1rem;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  background-color: ${({theme})=>theme.bg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
 &:disabled{
  background-color: gray;
  cursor: not-allowed;
 }
`;
const Label = styled.label`
  font-size: 0.9rem;
`;
const VideoUpload = ({ setOpen }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");
  const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
  const [loading, setLoading] = useState(false);
  window.addEventListener('beforeunload', (event) => {
    if (loading) {
      event.preventDefault();
      event.returnValue = confirmationMessage;
    }
  });
  const [alertColor, setAlertColor] = useState('white');

  const handleOpenAlertModal = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

  //creating useState hooks
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);  //upload percentage
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [photofileName, setPhotoFileName] = useState("");
  const [videofileName, setVideoFileName] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  let uploaderemail = currentUser.email;
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };  //changing title and description  //take previtems and update it with new
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    setLoading(true);
    const storage = getStorage(app);  //getting storage
    const fileName = new Date().getTime() + file.name;  //we can also add it with folder which i will do with photos
    let storageRef = ref(storage, 'video/' + fileName);   //giving storage reference
    const uploadTask = uploadBytesResumable(storageRef, file);
    urlType === "imgUrl" ? setPhotoFileName(fileName) : setVideoFileName(fileName);
    uploadTask.on( //upload start
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));  //firebase gives us upload percentage which we are using to set image and video percentage
        switch (snapshot.state) {
          case "paused":
            handleOpenAlertModal("upload is paused", "yellow")
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => { handleOpenAlertModal(error.message, 'red') }, //leaving error
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            console.log([urlType] + downloadURL);
            setLoading(false);
            return { ...prev, [urlType]: downloadURL };  //changing imgUrl and videourl in mongodb
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");  //uploading videourl on firebase  //upload only if there is video
  }, [video]);  //dependency is video

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => { //sending data to db
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/videos", { ...inputs, tags, uploaderemail, videofileName, photofileName })  //sending all inputs and tags
      setOpen(false)  //closing popup
      setLoading(false);
      res.status === 200 && navigate(`/video/${res.data._id}`)
    } catch (error) {
      handleOpenAlertModal(error.message,'red')
    }
  }

  return (
    <Container>
      <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
      <Wrapper>
        <Close disabled={loading} onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc + "%"  //if video% is greater than 0 show uploading else show input
        ) : (
          <Input
            type="file"
            accept="video/*"  //only accepts video file
            onChange={(e) => setVideo(e.target.files[0])}  //on change set video  //[0] is there to choose only one file at a time and it will be first one
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"  //name is given to use handlechange
          onChange={handleChange}  //on change handlechange
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={12}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Thumbnail Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button disabled={loading} onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default VideoUpload;