import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoCard from './VideoCard.jsx'
import PhotoCard from './PhotoCard.jsx'
// import AlertModal from './modal/AlertModal';
import RecommendationLoader from "./loader/RecommendationLoader.jsx";
const Container = styled.div`
  flex: 2;
  @media (max-width: 1000px) {
    flex:full;
  }
`;

const Recommendation = ({ tags }) => {
  const [loading,setLoading]=useState(false);
 

  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
      setLoading(false)
    };
    fetchVideos();
  }, [tags]);
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const res = await axios.get(`/photos/tags?tags=${tags}`);
      setPhotos(res.data);
      setLoading(false);
    };
    fetchPhotos();
  }, [tags]);

  return (
    <>
    {loading===false?<Container>
      {videos.map((video) => (
        <VideoCard type="small" key={video._id} video={video} />
        ))}  
      {photos.map((photo) => (
        <PhotoCard type="small" key={photo._id} photo={photo} />
      ))}
      
    </Container>:<RecommendationLoader/>}
    </>
  );
};

export default Recommendation;