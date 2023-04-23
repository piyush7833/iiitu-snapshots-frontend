import React from 'react'
import styled from 'styled-components'
import VideoCard from '../components/VideoCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader'
const Container = styled.div`
display:flex;
justify-content:space-around;
flex-wrap:wrap;
`;
const Videos=({type,show})=> {
    const [videos, setVideos] = useState([]);
    const[loading,setLoading]=useState(false);
    useEffect(() => {
      const fetchVideos = async () => {
        setLoading(true)
        const res = await axios.get(`/videos/random`);
        setVideos(res.data);
        setLoading(false)
      };
      fetchVideos();
    }, [type]);
   
    return (
      <>
      {loading===false?<Container>
        {videos.map((video) => (
        <VideoCard key={video._id} video={video}/>
      ))}
      </Container>:<Loader/>}
      </>
    )
  }
export default Videos;
