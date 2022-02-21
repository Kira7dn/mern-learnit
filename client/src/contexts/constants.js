export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://shrouded-caverns-39567.herokuapp.com/api";
export const imgUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/images"
    : "https://shrouded-caverns-39567.herokuapp.com/images";
export const LOCAL_STORAGE_TOKEN_NAME = "work-space";
export const LOCAL_STORAGE_SPACE_NAME = "your-space";
export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
export const FRIENDS_LOADED_SUCCESS = "FRIENDS_LOADED_SUCCESS";
export const FRIENDS_LOADED_FAIL = "FRIENDS_LOADED_FAIL";
export const USERS_LOADED_SUCCESS = "USERS_LOADED_SUCCESS";
export const USERS_LOADED_FAIL = "USERS_LOADED_FAIL";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAIL = "ADD_FRIEND_FAIL";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";
export const ACCEPT_FRIEND_SUCCESS = "ACCEPT_FRIEND_SUCCESS";
export const SPACES_LOADED_SUCCESS = "SPACES_LOADED_SUCCESS";
export const SPACES_LOADED_FAIL = "SPACES_LOADED_FAIL";
export const ADD_SPACE = "ADD_SPACE";
export const DELETE_SPACE = "DELETE_SPACE";
export const UPDATE_SPACE = "UPDATE_SPACE";
export const FIND_SPACE = "FIND_SPACE";
export const PROJECTS_LOADED_SUCCESS = "PROJECTS_LOADED_SUCCESS";
export const PROJECTS_LOADED_FAIL = "PROJECTS_LOADED_FAIL";
export const CHOOSE_SPACE = "CHOOSE_SPACE";
export const PROJECT_LOADED_SUCCESS = "CHOOSE_SPACE";
export const PROJECT_LOADED_FAIL = "CHOOSE_SPACE";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
