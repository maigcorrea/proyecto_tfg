import React, {useState} from 'react'
import CreatePost from '../components/Foro/CreatePost';
import PostCard from '../components/Foro/PostCard';
import { createPost } from '../services/postService';

const Foro = () => {

  const [posts, setPosts] = useState([]);

  const handleCreate = async (contenido) => {
    const formData= new FormData();
    formData.append("contenido", contenido);

    try {
      const nuevoPost= await createPost(formData);
      setPosts(prev => [nuevoPost, ...prev]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
    
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 px-4">
      <CreatePost onCreate={handleCreate} />
      {posts.length===0 && <p>No hay publicaciones todavía</p>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>

    </>
  )
}

export default Foro