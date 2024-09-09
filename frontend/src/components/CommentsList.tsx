// import { ChangeEvent, useState } from 'react';
// import dummyData from '../JSON/dummyData.json';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';

// const CommentsList: React.FC = () => {
//   const [replyUserCommentId, setReplyUserId] = useState<string[]>([]);
//   const [isReplyActive, setIsReplyActive] = useState<{ [key: string]: boolean }>({});
//   const [replyComment, setReplyComment] = useState<{ [key: string]: string }>({});
//   const [onReplyCancel, setOnReplyCancel] = useState<{ [key: string]: boolean }>({});

//   const handleReply = (id: string) => {
//     if (replyUserCommentId.includes(id)) {
//       return;
//     }

//     setReplyUserId([...replyUserCommentId, id]);
//     setOnReplyCancel((prevState) => ({
//       ...prevState,
//       [id]: true,
//     }));
//   };

//   const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, commentId: string) => {
//     setReplyComment((prevState) => ({
//       ...prevState,
//       [commentId]: e.target.value,
//     }));
//   };

//   const handleReplyCancel = (commentId: string) => {
//     setReplyUserId((prevState) => prevState.filter((id) => id !== commentId));
//     setIsReplyActive((prevState) => ({
//       ...prevState,
//       [commentId]: false,
//     }));
//     setOnReplyCancel((prevState) => ({
//       ...prevState,
//       [commentId]: false,
//     }));
//     setReplyComment((prevState) => ({
//       ...prevState,
//       [commentId]: '',
//     }));
//   };

//   return (
//     <Box>
//       {dummyData.map((comment, index) => (
//         <Stack key={index}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
//             <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', width: '100%' }}>
//               <Avatar src={comment.authorImage} sx={{ height: '50px', width: '50px' }} />
//               {/* The middle section, comment and reply */}
//               <Box sx={{ flexDirection: 'column', width: '100%', display: 'flex', flex: 1 }}>
//                 <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                   <Typography variant='subtitle2' component='h2'>
//                     @{comment.author}
//                   </Typography>

//                   <Typography variant='body2' component='span' sx={{ fontSize: '12px', color: 'grey' }}>
//                     {comment.timestamp}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ marginTop: '0.2rem' }}>
//                   <Typography variant='subtitle2' sx={{ color: '#000', fontWeight: 400 }}>
//                     {comment.content}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ marginTop: '0.5rem' }}>
//                   <Typography variant='subtitle2' sx={{ fontSize: '12px' }} onClick={() => handleReply(comment.id)}>
//                     Reply
//                   </Typography>
//                 </Box>

//                 {/* For the reply section */}
//                 {replyUserCommentId.length > 0 &&
//                   replyUserCommentId.map((userComm) => {
//                     if (userComm === comment.id) {
//                       return (
//                         <>
//                           <Box
//                             sx={{
//                               display: onReplyCancel[comment.id] ? 'flex' : 'none',
//                               alignItems: 'baseline',
//                               gap: '1rem',
//                               marginTop: '2rem',
//                             }}
//                           >
//                             <Avatar alt='User' sx={{ height: '35px', width: '35px' }}>
//                               T
//                             </Avatar>
//                             <TextField
//                               id='standard-basic'
//                               // label='Add a comment...'
//                               variant='standard'
//                               fullWidth
//                               onClick={() =>
//                                 setIsReplyActive((prevState) => ({
//                                   ...prevState,
//                                   [comment.id]: true,
//                                 }))
//                               }
//                               onChange={(e) => handleTextChange(e, comment.id)}
//                               value={replyComment[comment.id] || ''}
//                               placeholder='Add a Reply...'
//                               sx={{
//                                 '& .MuiInput-underline:after': {
//                                   borderBottomColor: '#B2BAC2',
//                                 },
//                               }}
//                             />
//                           </Box>

//                           {isReplyActive[comment.id] ? (
//                             <Box sx={{ textAlign: 'right', marginTop: '0.5rem' }}>
//                               <Button
//                                 variant='text'
//                                 sx={{ borderRadius: '40px', color: 'black' }}
//                                 onClick={() => handleReplyCancel(comment.id)}
//                               >
//                                 Cancel
//                               </Button>
//                               <Button
//                                 variant='outlined'
//                                 color='primary'
//                                 disabled={replyComment[comment.id]?.length === 0}
//                                 sx={{
//                                   borderRadius: '40px',
//                                   color: 'white',
//                                   background: replyComment[comment.id]?.length > 0 ? '#065fd4' : 'lightgrey',
//                                   marginLeft: '0.8rem',
//                                 }}
//                               >
//                                 Reply
//                               </Button>
//                             </Box>
//                           ) : null}
//                         </>
//                       );
//                     }
//                   })}
//               </Box>
//             </Box>
//             <Box>
//               <MoreVertIcon sx={{ color: 'black', cursor: 'pointer' }} />
//             </Box>
//           </Box>
//         </Stack>
//       ))}
//     </Box>
//   );
// };

// export default CommentsList;

import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import commentsStore from '../store/CommentsStore';

const CommentsList: React.FC = () => {
  const handleReplyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, commentId: string) => {
    commentsStore.setReplyText(commentId, e.target.value);
  };

  const handleReplySubmit = (commentId: string) => {
    const replyText = commentsStore.replyText[commentId];
    if (replyText.trim().length > 0) {
      commentsStore.addReply(commentId, {
        id: String(new Date().getTime()),
        author: 'Current User',
        content: replyText,
        timestamp: new Date().toLocaleString(),
      });
    }
  };

  return (
    <Box>
      {commentsStore.comments.map((comment) => (
        <Stack key={comment.id}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', width: '100%' }}>
              <Avatar src={comment.authorImage} sx={{ height: '50px', width: '50px' }} />
              <Box sx={{ flexDirection: 'column', width: '100%', display: 'flex', flex: 1 }}>
                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Typography variant='subtitle2' component='h2'>
                    @{comment.author}
                  </Typography>
                  <Typography variant='body2' component='span' sx={{ fontSize: '12px', color: 'grey' }}>
                    {comment.timestamp}
                  </Typography>
                </Box>
                <Typography variant='subtitle2' sx={{ color: '#000', fontWeight: 400, marginTop: '0.2rem' }}>
                  {comment.content}
                </Typography>
                <Typography
                  variant='subtitle2'
                  sx={{ fontSize: '12px', marginTop: '0.5rem', cursor: 'pointer' }}
                  onClick={() => commentsStore.setActiveReply(comment.id)}
                >
                  Reply
                </Typography>

                {/* Reply section */}
                {commentsStore.activeReplyId === comment.id && (
                  <Box sx={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <Avatar alt='User' sx={{ height: '35px', width: '35px' }}>
                      T
                    </Avatar>
                    <TextField
                      variant='standard'
                      fullWidth
                      onChange={(e) => handleReplyChange(e, comment.id)}
                      value={commentsStore.replyText[comment.id] || ''}
                      placeholder='Add a reply...'
                      sx={{
                        '& .MuiInput-underline:after': { borderBottomColor: '#B2BAC2' },
                      }}
                    />
                  </Box>
                )}
                {commentsStore.activeReplyId === comment.id && (
                  <Box sx={{ textAlign: 'right', marginTop: '0.5rem' }}>
                    <Button
                      variant='text'
                      sx={{ borderRadius: '40px', color: 'black' }}
                      onClick={() => commentsStore.setActiveReply(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => handleReplySubmit(comment.id)}
                      sx={{
                        borderRadius: '40px',
                        color: 'white',
                        background: commentsStore.replyText[comment.id]?.length > 0 ? '#065fd4' : 'lightgrey',
                        marginLeft: '0.8rem',
                      }}
                    >
                      Reply
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <MoreVertIcon sx={{ color: 'black', cursor: 'pointer' }} />
          </Box>
        </Stack>
      ))}
    </Box>
  );
};

export default observer(CommentsList);