import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import axios from 'axios';
import { Header } from 'components/headers/profileHeader';
const BlogComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/blogs/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
  
      const jsonData = await response.json();
      setPosts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const createPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:5000/blogs/createposts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div>
      <Header/>
      {/* {<PostForm createPost={createPost} />} */}
      {<PostList posts={posts} />}
    </div>
  );
};

export default BlogComponent;
