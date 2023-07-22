import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "timeago.js";
import CommentLoader from './loader/CommentLoader';
const Container = styled.div`
display:flex;
gap:10px;
margin-top:2vh;
`;
const Avatar = styled.img`
width:4vw;
height:7vh;
margin-top:2vh;
margin-left:1vw;
background-color:${({ theme }) => theme.soft}};
border:1px solid ${({ theme }) => theme.soft}};
border-radius:50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2cw;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 0.8em;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 0.6em;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 1vw;
`;

const Text = styled.span`
  font-size: 0.8em;
`;
const Comment = ({ comment }) => {
  const [loading, setLoading] = useState(false);


  const [channel, setChannel] = useState({});
  useEffect(() => {
    const fetchComment = async () => {
      setLoading(true);
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data)
      setLoading(false);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <>
      {loading === false ? <Container>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.Normalname} <Date>{format(comment.createdAt)}</Date>
          </Name>
          <Text>{comment.desc}</Text>
        </Details>
      </Container> : <CommentLoader />}
    </>
  );
};

export default Comment;
