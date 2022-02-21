import {
  PROJECTS_LOADED_SUCCESS,
  PROJECTS_LOADED_FAIL,
  PROJECT_LOADED_SUCCESS,
  PROJECT_LOADED_FAIL,
  ADD_SPACE,
  DELETE_SPACE,
  UPDATE_PROJECT,
  FIND_SPACE,
} from "../../contexts/constants";

export const projectReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_LOADED_SUCCESS:
      return {
        ...state,
        projects: payload,
        projectsLoading: false,
      };
    case PROJECTS_LOADED_FAIL:
      return {
        ...state,
        projects: [],
        projectsLoading: false,
      };
    case PROJECT_LOADED_SUCCESS:
      return {
        ...state,
        project: payload,
        projectLoading: false,
      };
    case PROJECT_LOADED_FAIL:
      return {
        ...state,
        project: [],
        projectLoading: false,
      };
    case ADD_SPACE:
      return {
        ...state,
        spaces: [...state.spaces, payload],
      };
    case DELETE_SPACE:
      return {
        ...state,
        spaces: state.spaces.filter((space) => space._id !== payload),
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: payload,
      };
    default:
      return state;
  }
};
