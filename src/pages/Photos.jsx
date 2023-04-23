import React from 'react'
import styled from 'styled-components'
import PhotoCard from '../components/PhotoCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader'
const Container = styled.div`
display:flex;
justify-content:space-around;
flex-wrap:wrap;
`;
const Photos=({type,show})=> { 
  const[loading,setLoading]=useState(false);
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
      {loading===false?<Container>
        {photos.map((photo) => (
        <PhotoCard key={photo._id} photo={photo}/>
      ))}
      </Container>:<Loader/>}
      </>
    )
  }
export default Photos;
