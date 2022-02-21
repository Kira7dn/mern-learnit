import {
  FRIENDS_LOADED_SUCCESS,
  FRIENDS_LOADED_FAIL,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  DELETE_FRIEND_SUCCESS,
  ACCEPT_FRIEND_SUCCESS,
} from "../../contexts/constants";

export const friendReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FRIENDS_LOADED_SUCCESS:
      return {
        ...state,
        friends: payload.filter((friend) => friend.status === 1),
        pendings: payload.filter((friend) => friend.status === 0),
        friendsLoading: false,
      };
    case FRIENDS_LOADED_FAIL:
      return {
        ...state,
        friendsLoading: false,
      };
    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
        friendsLoading: false,
      };
    case USERS_LOADED_FAIL:
      return {
        ...state,
        users: [],
        friendsLoading: false,
      };

    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload.friendId),
        pendings: [payload.friendship, ...state.pendings],
        friendsLoading: false,
      };
    case ADD_FRIEND_FAIL:
      return {
        ...state,
        friendsLoading: false,
      };
    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: state.friends.filter(
          (friendship) => friendship._id !== payload
        ),
        pendings: state.pendings.filter(
          (friendship) => friendship._id !== payload
        ),
        friendsLoading: false,
      };
    case ACCEPT_FRIEND_SUCCESS:
      return {
        ...state,
        friends: [...state.friends, payload],
        pendings: state.pendings.filter(
          (friendship) => friendship._id !== payload._id
        ),
        friendsLoading: false,
      };

    // case ADD_POST:
    //   return {
    //     ...state,
    //     posts: [...state.posts, payload],
    //   };
    // case DELETE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter((post) => post._id !== payload),
    //   };
    // case FIND_POST:
    //   return {
    //     ...state,
    //     post: payload,
    //   };
    // case UPDATE_POST:
    //   const newPosts = state.posts.map((post) =>
    //     post._id === payload._id ? payload : post
    //   );
    //   return {
    //     ...state,
    //     posts: newPosts,
    //   };
    default:
      return state;
  }
};
