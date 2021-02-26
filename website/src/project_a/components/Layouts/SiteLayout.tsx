import React from 'react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </>
  );
};

export const getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
