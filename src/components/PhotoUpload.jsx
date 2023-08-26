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
import AlertModal from './modal/AlertModal';
import { useSelector } from "react-redux";
import Loader from './loader/Loader';

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
  z-index:5;
  
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
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 1.3rem;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 1.3rem;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 0.9rem;
`;
const PhotoUpload = ({ setOpen2 }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");
  const [alertColor, setAlertColor] = useState('white');
  const { currentUser } = useSelector((state) => state.user);
  let uploaderemail=currentUser.email;
  const [loading,setLoading]=useState(false);
  const handleOpenAlertModal = (message,color) => {
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

    //creating useState hooks
  const [img, setImg] = useState([]); 
  const [imgPerc, setImgPerc] = useState(0);  //upload percentage
  let imgURL=[];
  let filename=[];
  let k=0;
  let f=0;
  const [inputs, setInputs] = useState({}); 
  const [t,setT]=useState(""); 
  const [tags, setTags] = useState([]);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };  //changing title and description  //take previtems and update it with new
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };
   
   let uploadFile;
   uploadFile = (files, urlType) => {
    const promises = [];
  
      const file = files;
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      filename[f]=fileName;
      f++;
      const storageRef = ref(storage, 'photo/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      const promise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImgPerc(Math.round(progress)) //firebase gives us upload percentage which we are using to set image and video percentage
            switch (snapshot.state) {
              case "paused":
                handleOpenAlertModal("Upload paused","yellow")
                break;
              case "running":
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              imgURL[k] = downloadURL;
              k++;
              resolve();
            });
          }
        );
      });
  
      promises.push(promise);
  
    return Promise.all(promises);
  };
//  const changeTitle=async(i)=>{
//   console.log(i);
//   let p=title + " " + i
//   setTitle(p);
//   console.log(p);
//   console.log(title);
//  }

  const handleUpload = async (e)=>{ //sending data to db
    e.preventDefault();
    try {
      for(let i=0;i<img.length;i++){
      await uploadFile(img[i], "imgUrl");
    }
      let res;
      for (let i = 0; i < imgURL.length; i++) {
        let imgUrl=await imgURL[i];
        let fileName=await filename[i];
        let title= t+" "+i+1;
        // await changeTitle(i);
        // console.log(title);
        res = await axios.post("/photos", {...inputs,title,imgUrl, tags,uploaderemail,fileName})  //sending all inputs and tags
      }
      setOpen2(false);
      res.status===200 && handleOpenAlertModal("Photo uploaded successfully","green");  //navigate to video page
    } catch (error) {
      console.log(error);
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
        <Close onClick={() => setOpen2(false)}>X</Close>
        <Title>Upload Images</Title>
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            multiple onChange={(e) => setImg(e.target.files)}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"  //name is given to use handlechange
          onChange={(e)=>setT(e.target.value)}  //on change handlechange
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

        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default PhotoUpload;