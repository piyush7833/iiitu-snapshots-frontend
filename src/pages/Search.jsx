import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import VideoCard from "../components/VideoCard.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import Loader from '../components/loader/Loader'
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content:space-around;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading,setLoading]=useState(false);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
      setLoading(false)
    };
    fetchVideos();
  }, [query]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true)
      const res = await axios.get(`/photos/search${query}`);
      setPhotos(res.data);
      setLoading(false)
    };
    fetchPhotos();
  }, [query]);

  return<> 
  <p style={{textAlign:"center"}}>Videos</p>
  {loading===false?<Container>
    {videos.map(video=>(
      <VideoCard key={video._id} video={video}/>
    ))}
    </Container>:<Loader/>}
    <p style={{textAlign:"center"}}>Photos</p>
    {loading===false?<Container>
    {photos.map(photo=>(
      <PhotoCard key={photo._id} photo={photo}/>
    ))}
  </Container>:<Loader/>}
  </>;
};

export default Search;