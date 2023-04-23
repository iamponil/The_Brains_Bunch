import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light";
import MainFeature from "components/features/TwoColWithButton.js";
import DesignIllustration from "../../images/imgoo.jpg";
export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
 const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  const searchParams = new URLSearchParams(window.location.search);
  const dataParam = searchParams.get('data');
  console.log(dataParam);
  const usernameParam = searchParams.get('username');
console.log(usernameParam);
  const selectedValue = JSON.parse(dataParam);
  const username = JSON.parse(usernameParam);
  console.log(selectedValue)

  return (
    <><Header  />
      <MainFeature
        subheading={<Subheading></Subheading>}
        heading={
          <>
           Recycling {selectedValue}
            <wbr /> <HighlightedText>By {username}</HighlightedText>
          </>
        }
        description={
          <Description>
           0$
            <br />
            engagés sur un objectif de 0 €
            <br />
            <br />

          0
          <br />
          contributeurs
          <br />
            <br />
            29
            <br />
            jours avant la fin
            </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="I support this project"
        imageSrc={
          DesignIllustration
        }
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
    </>  
  );
}
