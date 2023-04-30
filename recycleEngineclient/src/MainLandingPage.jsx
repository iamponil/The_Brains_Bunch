import React, { useEffect, useState } from 'react';
import { Hero } from 'components/hero/BackgroundAsImage';
import Footer from 'components/footers/FiveColumnDark';
import Blog from 'components/blogs/PopularAndRecentBlogPosts';
import PortCard from 'components/cards/PortfolioTwoCardsWithImage';
import Card from 'components/cards/ThreeColSlider';
import Feature from 'components/features/ThreeColCenteredStatsPrimaryBackground';
import AnimationRevealPage from 'helpers/AnimationRevealPage';

export const MainLandingPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  console.log(dataParam);
  const user = JSON.parse(dataParam);
  console.log(user);

  return (
    <AnimationRevealPage>
      <Hero user={user} />
      <Feature />
      <Blog />
      <Card />
      <PortCard />
      <Footer />
    </AnimationRevealPage>
  );
};
