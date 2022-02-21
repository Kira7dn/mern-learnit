import { createContext, useReducer } from "react";
import { friendReducer } from "../component/reducer/friendReducer";
import axios from "axios";
import {
  apiUrl,
  FRIENDS_LOADED_SUCCESS,
  FRIENDS_LOADED_FAIL,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  DELETE_FRIEND_SUCCESS,
  ACCEPT_FRIEND_SUCCESS,
} from "./constants";

export const FriendContext = createContext();
const FriendContextProvider = ({ children }) => {
  // State
  const [friendState, dispatch] = useReducer(friendReducer, {
    friendsLoading: true,
    friends: [],
    users: [],
    pendings: [],
    friend: null,
  });
  // Get all friends
  const getFriends = async () => {
    try {
      const response = await axios.get(`${apiUrl}/friend`);
      if (response.data.success) {
        dispatch({
          type: FRIENDS_LOADED_SUCCESS,
          payload: response.data.friends,
        });
      }
    } catch (error) {
      dispatch({ type: FRIENDS_LOADED_FAIL });
    }
  };
  // Search friend
  const getUsers = async (/* searchParam */) => {
    try {
      const response = await axios.get(
        `${apiUrl}/friend/search` /* searchParam */
      );
      if (response.data.success) {
        dispatch({
          type: USERS_LOADED_SUCCESS,
          payload: response.data.users,
        });
      }
    } catch (error) {
      dispatch({ type: USERS_LOADED_FAIL });
    }
  };
  // Add friend
  const addFriend = async (friendId) => {
    try {
      const response = await axios.post(`${apiUrl}/friend/add`, {
        friendId: friendId,
      });
      if (response.data.success) {
        dispatch({
          type: ADD_FRIEND_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: ADD_FRIEND_FAIL });
    }
  };
  // Delete friend
  const deleteFriend = async (friendShipId) => {
    try {
      const response = await axios.delete(`${apiUrl}/friend/${friendShipId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_FRIEND_SUCCESS,
          payload: response.data.friendshipId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Accept friend
  const acceptFriend = async (friendShipId) => {
    try {
      const response = await axios.put(`${apiUrl}/friend/${friendShipId}`);
      if (response.data.success) {
        dispatch({
          type: ACCEPT_FRIEND_SUCCESS,
          payload: response.data.friendship,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Context data
  const friendContextData = {
    getFriends,
    friendState,
    getUsers,
    addFriend,
    deleteFriend,
    acceptFriend,
  };
  //   Return provider
  return (
    <FriendContext.Provider value={friendContextData}>
      {children}
    </FriendContext.Provider>
  );
};
export default FriendContextProvider;
