import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [ commentText, onChangeCommentText, setCommentText ] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch(addComment({content: commentText, postId: post.id, userId: me.id , nickname: me.nickname}));
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} row={4} />
        <Button 
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary" 
          htmlType="submit"
          loading={addCommentLoading}
        >삐약</Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired 
}

export default CommentForm;