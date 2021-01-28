import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled('footer')`
  text-align: center;
`;

const Footer = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};

export default Footer;
