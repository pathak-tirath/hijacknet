import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { Typography, Container, Box, Avatar, TextField, Button } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import CommentsList from './CommentsList';
import commentsStore from '../store/CommentsStore';

const Comments: React.FC = () => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    commentsStore.setNewCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentsStore.newCommentText.trim().length > 0) {
      commentsStore.addComment({
        id: String(commentsStore.totalComments + 1),
        author: 'Current User',
        authorImage: '',
        content: commentsStore.newCommentText,
        timestamp: new Date().toLocaleString(),
        replies: [],
      });
    }
  };

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Container maxWidth='md'>
        <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Typography variant='h5' component='h2'>
            {commentsStore.totalComments} Comments
          </Typography>
          <Typography
            variant='subtitle2'
            component='h2'
            sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            <SortIcon /> Sort By
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '2rem' }}>
          <Avatar alt='User' sx={{ height: '50px', width: '50px' }}>T</Avatar>
          <TextField
            variant='standard'
            fullWidth
            onChange={handleTextChange}
            value={commentsStore.newCommentText}
            placeholder='Add a comment...'
            sx={{
              '& .MuiInput-underline:after': { borderBottomColor: '#B2BAC2' },
            }}
          />
        </Box>
        {commentsStore.newCommentText.trim().length > 0 && (
          <Box sx={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <Button
              variant='text'
              sx={{ borderRadius: '40px', color: 'black' }}
              onClick={() => commentsStore.setNewCommentText('')}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleCommentSubmit}
              sx={{
                borderRadius: '40px',
                color: 'white',
                background: '#065fd4',
                marginLeft: '0.8rem',
              }}
            >
              Comment
            </Button>
          </Box>
        )}
        <CommentsList />
      </Container>
    </Box>
  );
};

export default observer(Comments);
