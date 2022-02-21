import {
  SPACES_LOADED_SUCCESS,
  SPACES_LOADED_FAIL,
  ADD_SPACE,
  DELETE_SPACE,
  UPDATE_SPACE,
  FIND_SPACE,
} from "../../contexts/constants";

export const spaceReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SPACES_LOADED_SUCCESS:
      return {
        ...state,
        spaces: payload,
        spacesLoading: false,
      };
    case SPACES_LOADED_FAIL:
      return {
        ...state,
        spaces: [],
        spacesLoading: false,
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
    case FIND_SPACE:
      return {
        ...state,
        space: payload,
      };
    case UPDATE_SPACE:
      const newSpaces = state.spaces.map((space) =>
        space._id === payload._id ? payload : space
      );
      return {
        ...state,
        spaces: newSpaces,
      };
    default:
      return state;
  }
};
