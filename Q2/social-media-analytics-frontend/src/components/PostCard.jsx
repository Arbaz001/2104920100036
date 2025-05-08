import { Card, CardContent, CardMedia, Typography, Avatar, Box } from '@mui/material';
import { randomImage } from '../services/api';

const PostCard = ({ post }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={randomImage('post')}
        alt="Post image"
      />
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={randomImage('user')} />
          <Typography variant="subtitle1" ml={2}>
            {post.userName}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {post.comments} comments
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;