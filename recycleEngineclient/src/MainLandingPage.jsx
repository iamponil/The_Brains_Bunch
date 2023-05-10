import React, { useEffect, useState } from 'react';
import { Hero } from 'components/hero/BackgroundAsImage';
import Footer from 'components/footers/FiveColumnDark';
import Blog from 'components/blogs/PopularAndRecentBlogPosts';
import PortCard from 'components/cards/AllProjects';
import Card from 'components/cards/ThreeColSlider';
import Feature from 'components/features/ThreeColCenteredStatsPrimaryBackground';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import OurTeam from 'components/cards/ProfileThreeColGrid';
import RecomendedProjects from 'components/cards/RecomendedProjects';
import Chatbot from 'pages/Chatbot';
export const MainLandingPage = () => {
  return (
    <AnimationRevealPage>
      <Chatbot/>
      <Hero />
      <RecomendedProjects/>
      {/* <Feature /> */}
      <PortCard />
      {/* <Card />  */}
      <OurTeam/>
      <Footer />
    </AnimationRevealPage>
  );
};