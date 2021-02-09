import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
  removePostLoading: false,
  removePostDone: false,
  removePostError: false,
}

export const generateDummyPost = (number) => Array(number).fill().map((v, i) => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    id: shortid.generate(),
    src: faker.image.image(),
  },{
    id: shortid.generate(),
    src: faker.image.image(),
  },{
    id: shortid.generate(),
    src: faker.image.image(),
  }], 
  Comments: [{
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
  }, {
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }]
}));



export const dummyPost = (data) => {
  return {
    id: shortid.generate(),
    content: data.content,
    User: {
      id: data.userId,
      nickname: data.nickname,
    },
    Images: [],
    Comments: [],
  };
};
export const dummyComment = (data) => {
  return {
    id: shortid.generate(),
    content: data.content,
    User: {
      id: data.userId,
      nickname: data.nickname,
    },
   
  };
};


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const addPost = (data) => {
  return ({
    type: ADD_POST_REQUEST,
    data: data,
  });
};

export const addComment = (data) => {
  return ({
    type: ADD_COMMENT_REQUEST,
    data: data
  });
};

export const removePost = (data) => {
  return ({
    type: REMOVE_POST_REQUEST,
    data: data
  });
};

export const loadPosts = (lastId) => {
  return ({
    type: LOAD_POSTS_REQUEST,
    data: lastId
  });
};



const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        // draft.mainPosts = [action.data, ...state.mainPosts];
        draft.mainPosts.unshift(action.data);
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;
      }
      case REMOVE_POST_REQUEST: {
        draft.removeoPostLoading = true;
        draft.removeoPostDone = false;
        draft.removeoPostError = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.postId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removeoPostLoading = false;
        draft.removeoPostDone = false;
        draft.removeoPostError = action.error;
        break;
      }
      case LOAD_POSTS_REQUEST: {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      }
      case LOAD_POSTS_FAILURE: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = false;
        draft.loadPostsError = action.error;
        break;
      }
      default:
        break;
    }
  });
}

export default reducer;