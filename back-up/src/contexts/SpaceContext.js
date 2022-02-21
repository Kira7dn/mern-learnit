import { createContext, useReducer, useState } from "react";
import { spaceReducer } from "../component/reducer/spaceReducer";
import {
  apiUrl,
  SPACES_LOADED_SUCCESS,
  SPACES_LOADED_FAIL,
  ADD_SPACE,
  DELETE_SPACE,
  UPDATE_SPACE,
  FIND_SPACE,
} from "./constants";
import axios from "axios";

export const SpaceContext = createContext();
const SpaceContextProvider = ({ children }) => {
  // Avatar for space context
  const spaceAvatars = [
    "https://cdn-icons-png.flaticon.com/128/1256/1256650.png",
    "https://cdn-icons.flaticon.com/png/128/3153/premium/3153391.png?token=exp=1642256742~hmac=32d94b849646392567ee78093b423a4b",
    "https://cdn-icons.flaticon.com/png/128/2622/premium/2622923.png?token=exp=1642256742~hmac=e20cc469b9faacc89820e81094d998d3",
    "https://cdn-icons.flaticon.com/png/128/3281/premium/3281323.png?token=exp=1642256742~hmac=b9e64ecbb3865a1e5283648f344fe770",
    "https://cdn-icons-png.flaticon.com/128/6607/6607447.png",
    "https://cdn-icons-png.flaticon.com/128/6607/6607463.png",
    "https://cdn-icons-png.flaticon.com/128/6607/6607416.png",
    "https://cdn-icons-png.flaticon.com/128/6607/6607618.png",
    "https://cdn-icons-png.flaticon.com/128/6607/6607431.png",
    "https://cdn-icons-png.flaticon.com/128/6607/6607614.png",
    "https://cdn-icons.flaticon.com/png/128/1184/premium/1184710.png?token=exp=1642256872~hmac=cdf39e594fb3ad34594b050f2182d4ae",
    "https://cdn-icons.flaticon.com/png/128/1365/premium/1365369.png?token=exp=1642256872~hmac=cbee42364e3607ac4f7f3f5c52fcb003",
    "https://cdn-icons.flaticon.com/png/128/1376/premium/1376421.png?token=exp=1642256872~hmac=1afb972b106b2bea0ec028ee4ba4d71b",
    "https://cdn-icons-png.flaticon.com/128/3174/3174847.png",
    "https://cdn-icons.flaticon.com/png/128/3187/premium/3187907.png?token=exp=1642256872~hmac=a081796715e23346450e46350694d9e0",
    "https://cdn-icons.flaticon.com/png/128/2041/premium/2041643.png?token=exp=1642256872~hmac=ec1fc0b06f2df80c62fda39d1ed5ad7b",
  ];
  // State
  const [spaceState, dispatch] = useReducer(spaceReducer, {
    space: null,
    spaces: [],
    spacesLoading: true,
  });
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
  const [showUpdateSpaceModal, setShowUpdateSpaceModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  // Get all spaces
  const getSpaces = async () => {
    try {
      const response = await axios.get(`${apiUrl}/spaces`);
      if (response.data.success) {
        dispatch({
          type: SPACES_LOADED_SUCCESS,
          payload: response.data.spaces,
        });
      }
    } catch (error) {
      dispatch({ type: SPACES_LOADED_FAIL });
    }
  };

  // Add space
  const addSpace = async (newSpace) => {
    try {
      const response = await axios.post(`${apiUrl}/spaces`, newSpace);
      if (response.data.success) {
        dispatch({ type: ADD_SPACE, payload: response.data.space });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // Delete space
  const deleteSpace = async (spaceId) => {
    try {
      const response = await axios.delete(`${apiUrl}/spaces/${spaceId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_SPACE, payload: spaceId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user click editIcon
  const findSpace = async (postId) => {
    const post = spaceState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_SPACE, payload: post });
  };

  // Update post
  const updateSpace = async (updatedSpace) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedSpace._id}`,
        updatedSpace
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_SPACE, payload: response.data.space });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  // Post context data
  const spaceContextData = {
    spaceState,
    getSpaces,
    showAddSpaceModal,
    setShowAddSpaceModal,
    addSpace,
    showToast,
    setShowToast,
    deleteSpace,
    findSpace,
    updateSpace,
    showUpdateSpaceModal,
    setShowUpdateSpaceModal,
    spaceAvatars,
    showAddMembersModal,
    setShowAddMembersModal,
  };
  return (
    <SpaceContext.Provider value={spaceContextData}>
      {children}
    </SpaceContext.Provider>
  );
};
export default SpaceContextProvider;
