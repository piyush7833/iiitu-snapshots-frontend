import React from 'react'
import styled from 'styled-components'
import Comment from './Comment';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AlertModal from './modal/AlertModal';
import Loader from './loader/Loader';
import { addComments,fetchComment,deleteComment } from '../redux/commentSlice';
//import store from './store'
//import { fetchComments } from '../redux/commentSlice';
const Container=styled.div`

`;
const NewComment=styled.div`
display:flex;
align=items:center;
gap:10px;
`;
const Avatar=styled.img`
width:4vw;
height:7vh;
margin-top:2vh;
margin-left:1vw;
background-color:${({theme})=>theme.soft}};
border:1px solid ${({theme})=>theme.soft}};
border-radius:50%;
`;
const Input=styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
`;
const C=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
`;
const Button = styled.button`
  display:flex;
  align-items:center;
  border-radius: 1.3rem;
  border: none;
  padding-left:1em;
  padding-right:1em;
  padding-top:0.2em;
  padding-bottom:0.2em;
  // font-weight: 500;
  cursor: pointer;
  background-color: transparent;;
  color: ${({ theme }) => theme.text};
  // box-shadow: 15px 15px 20px rgba(0,0,0,.6);
  // margin-right:-4vw;
`;
const Comments = ({videoId,type,photoId}) => {


  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('white');
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

  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  // const [comments, setComments] = useState([]);  //in start it is an empty array
  
  const {comments} = useSelector((state )=> state.comments);
  // const loading = useSelector(state => state.comments.loading);
  // const error = useSelector(state => state.comments.error);
  useEffect(() => {
    try {
      if (type === 'video') {
        dispatch(fetchComment(`/comments/videoComment/${videoId}`));
      } else if (type === 'photo') {
        dispatch(fetchComment(`/comments/photoComment/${photoId}`));
      }
    } catch (error) {
      handleOpenAlertModal(error.message,"red")
    }

  }, [dispatch, type, videoId, photoId]);


  const [AddComment,setaddComment]=useState(" ");
  const addComment=async(e)=>{
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      console.log("key");
      try {
        var desc=AddComment;
        let res;
        if(type==="video"){
          setLoading(true);
          res = await axios.post(`/comments`,{desc,videoId});
          // setaddComment(res.data);
          dispatch(addComments(res.data));
          setLoading(false);
          handleOpenAlertModal(desc + " added ",'green')
        }
        else if(type==="photo"){
          setLoading(true);
          res = await axios.post(`/comments`,{desc,photoId});
          dispatch(addComments(res.data))
          setLoading(false);
          handleOpenAlertModal(desc + " added ",'green')          
        }
      } catch (err) {handleOpenAlertModal(err.message,'red')}
    };
  }
  const handleDelete=async(c)=>{
    try {
    const res = await axios.delete(`/comments/${c}`);
    dispatch(deleteComment(res.data));
    handleOpenAlertModal(`Comment deleted`,'green')
    } catch (error) {
      handleOpenAlertModal(error.message,'red')
    }
  }
  const { currentVideo } = useSelector((state) => state.video);
  const { currentPhoto } = useSelector((state) => state.photo);

  return (
    <>
            <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
        color={alertColor}
      />
      {type==="video"?<>
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input onKeyPress={addComment} placeholder="Add a comment..." onChange={e => setaddComment(e.target.value)}/>
      </NewComment>
      {comments.map(comment=>(
        <C>
        <Comment key={comment._id} comment={comment}/>
         {comment.userId===currentUser._id?(<Button  onClick={()=>handleDelete(comment._id)}>Delete</Button>):" "}
         
         { <>
         { currentUser._id===currentPhoto.userId?comment.userId!==currentUser._id?(<Button onClick={async()=>handleDelete(comment._id,comment.desc)}>Delete</Button>):" ":" "}
         {/* {console.log(comment.desc)} */}
         </>}
        </C>
      ))}
    </Container>
    </>
    
    :
    
    <>
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input onKeyPress={addComment} placeholder="Add a comment..." onChange={e => setaddComment(e.target.value)}/>
      </NewComment>
      {comments.map(comment=>(
        <C>
        <Comment key={comment._id} comment={comment}/>
         {comment.userId===currentUser._id?(<Button  onClick={()=>handleDelete(comment._id)}>Delete</Button>):" "}
         
         { <>
         { currentUser._id===currentPhoto.userId?comment.userId!==currentUser._id?(<Button onClick={async()=>handleDelete(comment._id,comment.desc)}>Delete</Button>):" ":" "}
         {/* {console.log(comment.desc)} */}
         </>}
        </C>
      ))}
    </Container> 
    </>}
    </>
  );
};

export default Comments;

