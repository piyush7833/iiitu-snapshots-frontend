import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoCard from './VideoCard.jsx'
import PhotoCard from './PhotoCard.jsx'
import AlertModal from './modal/AlertModal';
// import Loader from './loader/Loader';
import RecommendationLoader from "./loader/RecommendationLoader.jsx";
const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading,setLoading]=useState(false);
 
  const handleOpenAlertModal = (message) => {
    setAlertMessage(message);
    setShowAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    setAlertMessage('');
  };

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
                <AlertModal
        isOpen={showAlertModal}
        onClose={handleCloseAlertModal}
        message={alertMessage}
      />
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