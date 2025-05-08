import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import UserCard from '../components/UserCard';
import { getTopUsers } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top users:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top Users
      </Typography>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Container>
  );
};

export default TopUsers;