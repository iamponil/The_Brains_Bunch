import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading } from "components/misc/Headings.js";

import {Header} from "components/headers/profileHeader";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = tw.div`relative`;
const Content = tw.div` mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`;

const Column = tw.div`xl:mr-12 xl:last:mr-0`;
const HeadingColumn = styled(Column)(props => [
  tw`w-full xl:w-10/12`,
  props.textOnLeft ? tw`xl:order-first` : tw`xl:order-last xl:ml-12 xl:mr-0`
]);
const CardColumn = tw(Column)`w-full   mt-16 xl:mt-0 xl:last:ml-auto`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`mt-4 xl:text-left leading-tight`;

export default ({
    subheading = "Our Portfolio",
    headingHtmlComponent = (
      <>
     Creat <span tw="text-primary-500">Your Story.</span>
      </>
    ),
  
    roundedHeaderButton  
  }) => {
    const [content, setContent] = useState('');
    let quillObj;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    const insertImage = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
          const response = await fetch('http://localhost:5000/uploads', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: formData,
          });
          const data = await response.json();
          const range = quillObj.getEditor().getSelection();
          quillObj.getEditor().insertEmbed(range.index, 'image', data.imageUrl);
        } catch (error) {
          console.error(error);
        }
      };
      input.click();
    };
    
    const modules = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
    
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
    
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
    
          [{ color: [] }, { background: [] }], // dropdown with defaults
          [{ font: [] }],
          [{ align: [] }],
    
          ['clean'], // remove formatting button
          ['link', 'image'],
        ],
        handlers: {
          image: insertImage,
        },
      },
    };
    
    const saveContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/addstory', {
          method: 'POST',
          body: JSON.stringify({ content }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      saveContent();
    };
  
    return (
      <>  
      
      <Header roundedHeaderButton={roundedHeaderButton }  />
      <HeadingColumn >
      <HeadingInfoContainer>
       
        <HeadingTitle>{headingHtmlComponent}</HeadingTitle>
  
      </HeadingInfoContainer>
    </HeadingColumn>
      <Container >
        <form onSubmit={handleSubmit}>
          <ReactQuill value={content} onChange={setContent} modules={modules} />
          <button type="submit">Save</button>
        </form>
      </Container>
      </>
    );
  };
  