import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import logo from '../img/logo.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';
// import Razorpay from 'razorpay'
const Container = styled.div`
display:flex;
align-items:center;
justify-content:space-evenly;
height:90vh;

`;
const Pay = styled.div`
flex:2;
margin:2vh;
@media (max-width: 400px) {
  margin:2vh 0.5vh;
}
`;

const Hr = styled.hr`
margin:2vh 0vh;
  border: 0.5px solid ${({ theme }) => theme.soft}};
`;
const Options = styled.div`
flex: 0.4;
background-color: ${({ theme }) => theme.bg}};
height: auto;
color: ${({ theme }) => theme.text};
font-size: 1.3rem;
text-align:center;
margin-left:2vw;
justigy-content:center;
align-items:center;
border-radius:1.3rem;
@media (max-width: 400px) {
  font-size: 1rem;
  margin-left:0.5vw;
}
@media (max-width: 330px) {
  font-size: 0.8rem;
  margin-left:0.5vw;
}
`;
const Wrapper = styled.div`
 padding:1vw;
text-align:center;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding:1.3vh 1vh;
  &:hover{
    background-color: ${({ theme }) => theme.soft}};
    border-radius:1.3rem;
  }
  @media (max-width: 330px) {
    padding:1vh 0.8vh;
    gap:10px;
  }
`;
const About = styled.div`
flex:3;
display:flex;
flex-direction:column;
align-items:center;
text-align:justify;
margin-right:2vw;
background-image:url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
border-radius:1.3rem;
box-shadow: 0 15px 25px rgba(0,0,0,.6);
padding: 2em;
height:80vh;
overflow-y:auto;


`;
const Logo = styled.img`
height:30vh;
width:30vw;
`;
const Title = styled.div`
font-size:2em;
color:#18b439;
@media (max-width: 650px) {
  font-size:1.5rem;
}
@media (max-width: 500px) {
  font-size:1.2rem;
}
@media (max-width: 400px) {
  font-size:1rem;
}
`;
const Info = styled.div`
font-size:1.3rem;
text-align:justify;
@media (max-width: 600px) {
  font-size:1rem;
}
@media (max-width: 500px) {
  font-size:0.8rem;
}
`;
const Button = styled.button`
  display:flex;
  align-items:center;
  border-radius: 1.3rem;
  // border: none;
  padding-left:1em;
  padding-right:1em;
  padding-top:0.8em;
  padding-bottom:0.8em;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;;
  color: ${({ theme }) => theme.text};
  gap:4px;
  // box-shadow: 15px 15px 20px rgba(0,0,0,.6);
`;
const Payment = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [month, setMonth] = useState(1);


  const handleCheckout = async () => {
    const { data: { key } } = await axios.get('/getkey')
    const { data } = await axios.post('/pay/checkout', { month })

    const options = {
      key: key,
      amount: data.amount,
      currency: "INR",
      name: "IIITU Snapshots",
      description: "Subscription Transaction",
      image: { logo },
      order_id: data.id,
      callback_url: "https://iiitusnapshotbackend.onrender.com/api/pay/paymentverification",
      prefill: {
        name: currentUser.name,
        email: currentUser.email,
        contact: currentUser.phone
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#202020"
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  return (
    <Container>
      <Options>
        <Wrapper>
          <Items onClick={() => setMonth(1)}><CalendarMonthIcon /> 1 Month</Items>
          <Items onClick={() => setMonth(3)}><CalendarMonthIcon />3 Month</Items>
          <Items onClick={() => setMonth(6)}><CalendarMonthIcon />6 Month</Items>
          <Items onClick={() => setMonth(12)}><CalendarMonthIcon />12 Month</Items>
        </Wrapper>
      </Options>
      <Pay>
        {
          month === 1 ?
            (<>
              <About>
                  <Logo src={logo} />
                  <Info>
                    If you are managing a club or organization and want to share media exclusively with college students and faculties, you can consider becoming an
                  </Info>
                  <Title>
                    Admin on IIITU Snapshots for 1 month
                  </Title>
                  <Info>
                    One month plan cost you <strong>Rs 230. </strong> 
                    By purchasing so, you will be granted permission to upload photos and videos of college events, allowing college students and faculties to cherish their memories for years to come. To become an admin on IIITU Snapshots, you need to follow the guidelines and criteria for admin selection such as you should be part of an active club in your college.
                  </Info>
                  <Button onClick={() => handleCheckout()}>
                    Check Out
                  </Button>
                </About>
            </>)
            : month === 3 ?
              (<>
                <About>
                  <Logo src={logo} />
                  <Info>
                    If you are managing a club or organization and want to share media exclusively with college students and faculties, you can consider becoming an
                  </Info>
                  <Title>
                    Admin on IIITU Snapshots for 3 month.
                  </Title>
                  <Info>
                    Three month plan cost you <strong>Rs 620</strong>. which means more than <strong>10 % saving. </strong> 
                    By purchasing so, you will be granted permission to upload photos and videos of college events, allowing college students and faculties to cherish their memories for years to come. To become an admin on IIITU Snapshots, you need to follow the guidelines and criteria for admin selection such as you should be part of an active club in your college.
                  </Info>
                  <Button onClick={() => handleCheckout()}>
                    Check Out
                  </Button>
                </About>
              </>) : month === 6 ?
                (<>
                  <About>
                  <Logo src={logo} />
                  <Info>
                    If you are managing a club or organization and want to share media exclusively with college students and faculties, you can consider becoming an
                  </Info>
                  <Title>
                    Admin on IIITU Snapshots for 6 month
                  </Title>
                  <Info>
                    Six month plan cost you <strong>Rs 1150</strong> which means more than <strong>15 % saving. </strong>
                    By purchasing so, you will be granted permission to upload photos and videos of college events, allowing college students and faculties to cherish their memories for years to come. To become an admin on IIITU Snapshots, you need to follow the guidelines and criteria for admin selection such as you should be part of an active club in your college.
                  </Info>
                  <Button onClick={() => handleCheckout()}>
                    Check Out
                  </Button>
                </About>
                </>) :
                (
                  <>
                    <About>
                  <Logo src={logo} />
                  <Info>
                    If you are managing a club or organization and want to share media exclusively with college students and faculties, you can consider becoming an
                  </Info>
                  <Title>
                    Admin on IIITU Snapshots for 1 year
                  </Title>
                  <Info>
                    One year plan cost you <strong>Rs 1999</strong> which means more than <strong>25 % saving. </strong>
                    By purchasing so, you will be granted permission to upload photos and videos of college events, allowing college students and faculties to cherish their memories for years to come. To become an admin on IIITU Snapshots, you need to follow the guidelines and criteria for admin selection such as you should be part of an active club in your college.
                  </Info>
                  <Button onClick={() => handleCheckout()}>
                    Check Out
                  </Button>
                </About>
                  </>
                )

        }
      </Pay>
      <Hr />
    </Container>
  )
}

export default Payment
