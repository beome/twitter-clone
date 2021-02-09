import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { followRequestAction, unfollowRequestAction } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowings = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() =>{
    if (isFollowings) {
      dispatch(unfollowRequestAction({id: post.User.id, nickname: post.User.nickname}));
    } else {
      dispatch(followRequestAction(({id: post.User.id, nickname: post.User.nickname})));
    }
  }, [isFollowings]);
 
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowings ? '언팔로우' : '팔로우'}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
}

export default FollowButton;