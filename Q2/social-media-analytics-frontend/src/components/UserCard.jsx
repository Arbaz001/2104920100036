import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { randomImage } from '../services/api';

const UserCard = ({ user }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={randomImage('user')} sx={{ width: 56, height: 56 }} />
          <Box ml={2}>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              @{user.username}
            </Typography>
          </Box>
        </Box>
        <Chip label={`${user.postCount} posts`} color="primary" />
      </CardContent>
    </Card>
  );
};

export default UserCard;