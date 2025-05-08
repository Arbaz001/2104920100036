import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import PostCard from '../components/PostCard';
import { getTrendingPosts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrendingPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography>No trending posts found</Typography>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </Container>
  );
};

export default TrendingPosts;