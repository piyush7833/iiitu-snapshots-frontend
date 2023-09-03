import React from "react";
import snapshots from "../img/logo.png"
import styled from "styled-components";

const FooterContainer = styled.footer`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding:0vh 2vh;
  position: sticky;
  width: -webkit-fill-available;
  @media (max-width: 500px) {
    font-size:0.8rem;
  }
  bottom:0;
`;

const Logo = styled.img`
  height: 12vh;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo src={snapshots} alt="IIITU Snapshot Logo" />
      <p>&copy; IIITU Snapshot. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
