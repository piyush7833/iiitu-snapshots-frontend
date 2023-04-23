import React from 'react'
import styled from 'styled-components'
import VideoCard from '../components/VideoCard';
import PhotoCard from '../components/PhotoCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader'
import AlertModal from '../components/modal/AlertModal';
const Container = styled.div`
display:flex;
justify-content:space-around;
flex-wrap:wrap;
@media (max-width: 500px) {
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
`;

// let college=currentUser.email.split('@')[1];
// let collegevideo=currentVideo.uploaderemail.split('@')[1];
// let collegephoto=currentPhoto.uploaderemail.split('@')[1];
const Home=({type,show})=> {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchVideos = async () => {
        setLoading(true);
        const res = await axios.get(`/videos/${type}`);
        setVideos(res.data);
        setLoading(false);
      };
      fetchVideos();
    }, [type]);
      const [photos, setPhotos] = useState([]);
    useEffect(()=>{  //we are creating function inside useeffect because we can not use async in  useEffect 
      const fetchPhotos=async()=>{
        setLoading(true);
        const res=await axios.get(`/photos/${type}`)
        setPhotos(res.data)
        setLoading(false);
      }
      fetchPhotos()
    },[type])
  
    return (
      <>
        <p style={{textAlign:"center"}}>Videos</p>
      {loading===false?<Container>
        {videos.map((video) => (
        <VideoCard key={video._id} video={video}/>
      ))}
      </Container>:<Loader/>}
      <p style={{textAlign:"center"}}>Photos</p>
      {loading===false?<Container>
        {photos.map((photo) => (
        <PhotoCard key={photo._id} photo={photo}/>
      ))}
      </Container>:<Loader/>}
      </>
    )
  }
export default Home;
