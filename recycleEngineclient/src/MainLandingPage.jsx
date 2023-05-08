import React, { useEffect, useState } from 'react';
import { Hero } from 'components/hero/BackgroundAsImage';
import Footer from 'components/footers/FiveColumnDark';
import Blog from 'components/blogs/PopularAndRecentBlogPosts';
import PortCard from 'components/cards/AllProjects';
import Card from 'components/cards/ThreeColSlider';
import Feature from 'components/features/ThreeColCenteredStatsPrimaryBackground';
import AnimationRevealPage from 'helpers/AnimationRevealPage';

export const MainLandingPage = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      {/* <Feature /> */}
      <PortCard />
       <Blog />
      <Card /> 
      
      <Footer />
    </AnimationRevealPage>
  );
};