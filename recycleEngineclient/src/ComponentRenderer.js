import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import BlogIndexPage from "pages/BlogIndex.js";
// import TermsOfServicePage from "pages/TermsOfService.js";
// import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import LoginPageImageSrc from "images/demo/LoginPage.jpeg";
import SignupPageImageSrc from "images/demo/SignupPage.jpeg";
// import BlogIndexPageImageSrc from "images/demo/BlogIndexPage.jpeg";
// import TermsOfServicePageImageSrc from "images/demo/TermsOfServicePage.jpeg";
// import PrivacyPolicyPageImageSrc from "images/demo/PrivacyPolicyPage.jpeg";
import TwoColumnWithFeaturesAndTestimonial from "components/hero/TwoColumnWithFeaturesAndTestimonial"
// import BackgroundAsImageHero from "components/hero/BackgroundAsImage.js";

// import ThreeColWithSideImageWithPrimaryBackgroundFeatures from "components/features/ThreeColWithSideImageWithPrimaryBackground.js";
import threeColCenteredStatsPrimaryBackground from "components/features/ThreeColCenteredStatsPrimaryBackground";


import SliderCards from "components/cards/ThreeColSlider.js";
import PortfolioCards from "components/cards/PortfolioTwoCardsWithImage.js";


// import ThreeColSimpleWithImageAndDashedBorderBlog from "components/blogs/ThreeColSimpleWithImageAndDashedBorder.js";
import PopularAndRecentPostsBlog from "components/blogs/PopularAndRecentBlogPosts.js";

import FiveColumnDarkFooter from "./components/footers/FiveColumnDark.js";


export const components = {
 

  innerPages: {
    LoginPage: {
      component: LoginPage,
      imageSrc: LoginPageImageSrc,
      scrollAnimationDisabled: true,
      url: "/components/innerPages/LoginPage",
    },
    SignupPage: {
      component: SignupPage,
      url: `/components/innerPages/SignupPage`,
      imageSrc: SignupPageImageSrc,
      scrollAnimationDisabled: true,
    },
    // BlogIndexPage: {
    //   component: BlogIndexPage,
    //   url: `/components/innerPages/BlogIndexPage`,
    //   imageSrc: BlogIndexPageImageSrc,
    // },
    // TermsOfServicePage: {
    //   component: TermsOfServicePage,
    //   url: `/components/innerPages/TermsOfServicePage`,
    //   imageSrc: TermsOfServicePageImageSrc,
    // },
    // PrivacyPolicyPage: {
    //   component: PrivacyPolicyPage,
    //   url: `/components/innerPages/PrivacyPolicyPage`,
    //   imageSrc: PrivacyPolicyPageImageSrc,
    // }
  },

  blocks: {
    Hero: {
      type: "Hero Section",
      elements: {
      
        TwoColumnWithFeaturesAndTestimonial: {
          name: "TwoColumnWithFeaturesAndTestimonial",
          component: TwoColumnWithFeaturesAndTestimonial,
          url: "/components/blocks/Hero/TwoColumnWithFeaturesAndTestimonial",
        },

      }
    },
  
    Features: {
      type: "Features Section",
      elements: {
      
        threeColCenteredStatsPrimaryBackground: {
          name: "Stats With Image",
          component: threeColCenteredStatsPrimaryBackground,
          url: "/components/blocks/Features/threeColCenteredStatsPrimaryBackground",
        },
       
      }
    },

    Cards: {
      type: "Cards",
      elements: {
        Slider: {
          name: "Three Column Slider",
          component: SliderCards,
          url: "/components/blocks/Cards/Slider",
        },
        Portfolio: {
          name: "Two Column Portfolio Cards With Images ",
          component: PortfolioCards,
          url: "/components/blocks/Cards/Portfolio",
        },
      }
    },

    Blog: {
      type: "Blog Section",
      elements: {  
        PopularAndRecentPosts: {
          name: "Popular And Recent Posts",
          component: PopularAndRecentPostsBlog,
          url: "/components/blocks/Blog/PopularAndRecentPosts",
        },
       
      } 
    },
    Footer: {
      type: "Footers Section",
      elements: {
        FiveColumnDark: {
          name: "Five Column Dark",
          component: FiveColumnDarkFooter,
          url: "/components/blocks/Footer/FiveColumnDark",
        },
      }
    }
  }
}

export default () => {
  const { type, subtype, name } = useParams()

  try {
    let Component = null;
    if(type === "blocks" && subtype) {
      Component= components[type][subtype]["elements"][name].component
      return <AnimationRevealPage disabled>
          <Component/>
        </AnimationRevealPage>
    }
    else
      Component= components[type][name].component

    if(Component)
      return <Component/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
