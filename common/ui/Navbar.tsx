import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledNav = styled('nav')``;

const StyledMenuList = styled('ul')<{ gridColumns?: string }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridColumns ? props.gridColumns : `repeat(3, 1fr)`};
`;

interface props {
  gridColumns?: string;
  children?: ReactNode;
}

const Navbar = ({ gridColumns, children }: props) => {
  return (
    <StyledNav>
      <StyledMenuList gridColumns={gridColumns}>{children}</StyledMenuList>
    </StyledNav>
  );
};

export default Navbar;
