import { createContext, useReducer, useState, useContext } from "react";
import { projectReducer } from "../component/reducer/projectReducer";
import { SpaceContext } from "../contexts/SpaceContext";
import {
  apiUrl,
  PROJECTS_LOADED_SUCCESS,
  PROJECTS_LOADED_FAIL,
  ADD_project,
  DELETE_project,
  UPDATE_PROJECT,
  FIND_project,
  LOCAL_STORAGE_SPACE_NAME,
  PROJECT_LOADED_SUCCESS,
  PROJECT_LOADED_FAIL,
} from "./constants";
import axios from "axios";

export const ProjectContext = createContext();
const ProjectContextProvider = ({ children }) => {
  // Avatar for project context
  const projectAvatars = [
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
  const [projectState, dispatch] = useReducer(projectReducer, {
    locationBar: [],
    space: null,
    project: null,
    projects: [],
    projectsLoading: true,
    projectLoading: true,
  });
  const { projects, project } = projectState;
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  const [preMembers, setPreMembers] = useState([]);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    rank: 1,
    image: "http://localhost:5000/images/default-project.jpg",
    members: [],
  });
  const {
    spaceState: { space, spaces, spacesLoading },
    getSpaces,
  } = useContext(SpaceContext);
  // Get all projects
  const getProjects = async (spaceId) => {
    try {
      const response = await axios.get(`${apiUrl}/projects`, {
        params: { spaceId },
      });
      if (response.data.success) {
        dispatch({
          type: PROJECTS_LOADED_SUCCESS,
          payload: response.data.projects,
        });
      }
    } catch (error) {
      dispatch({ type: PROJECTS_LOADED_FAIL });
    }
  };
  // Get single projects
  const getOneProject = async (projectId) => {
    console.log("getOneProject");
    try {
      const response = await axios.get(`${apiUrl}/projects`, {
        params: { projectId },
      });
      if (response.data.success) {
        dispatch({
          type: PROJECT_LOADED_SUCCESS,
          payload: response.data.projects[0],
        });
      }
    } catch (error) {
      dispatch({ type: PROJECT_LOADED_FAIL });
    }
  };

  // Add project
  // const addproject = async (newproject) => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/projects`, newproject);
  //     if (response.data.success) {
  //       dispatch({ type: ADD_project, payload: response.data.project });
  //       return response.data;
  //     }
  //   } catch (error) {
  //     return error.response.data
  //       ? error.response.data
  //       : { success: false, message: "server error" };
  //   }
  // };
  // Delete project
  // const deleteproject = async (projectId) => {
  //   try {
  //     const response = await axios.delete(`${apiUrl}/projects/${projectId}`);
  //     if (response.data.success) {
  //       dispatch({ type: DELETE_project, payload: projectId });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Find post when user click editIcon
  // const findproject = async (projectId) => {
  //   const project = projectState.projects.find(
  //     (project) => project._id === projectId
  //   );
  //   dispatch({ type: FIND_project, payload: project });
  // };

  // Detail Space when user click ChooseIcon
  const chooseItem = async (itemId) => {
    function findNestedObj(entireObj, keyToFind, valToFind) {
      let foundObj;
      JSON.stringify(entireObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
          foundObj = nestedValue;
        }
        return nestedValue;
      });
      return foundObj;
    }

    let newStorage = [];
    const space = spaces.find((space) => space._id === itemId);
    const project = findNestedObj(projects, "_id", itemId);
    if (space) {
      newStorage = [space];
    } else {
      const localSpace = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SPACE_NAME)
      );
      const findIndex = localSpace.findIndex(
        (item) => item._id === project._id
      );
      if (findIndex === -1) {
        newStorage = [...localSpace, project];
      } else {
        localSpace.splice(findIndex + 1, localSpace.length - findIndex - 1);
        newStorage = localSpace;
      }
    }
    localStorage.setItem(LOCAL_STORAGE_SPACE_NAME, JSON.stringify(newStorage));
  };
  // const chooseSpace = async (spaceId) => {

  //   let newStorage = [];
  //   const space = spaces.find((space) => space._id === spaceId);
  //   const project = findNestedObj(projects, "_id", itemId);
  //   if (space) {
  //     newStorage = [space];
  //   } else {
  //     const localSpace = JSON.parse(
  //       localStorage.getItem(LOCAL_STORAGE_SPACE_NAME)
  //     );
  //     const findIndex = localSpace.findIndex(
  //       (item) => item._id === project._id
  //     );
  //     if (findIndex === -1) {
  //       newStorage = [...localSpace, project];
  //     } else {
  //       localSpace.splice(findIndex + 1, localSpace.length - findIndex - 1);
  //       newStorage = localSpace;
  //     }
  //   }
  //   localStorage.setItem(LOCAL_STORAGE_SPACE_NAME, JSON.stringify(newStorage));
  // };

  // Update project
  const updateProject = async (updatedProject) => {
    try {
      const response = await axios.put(
        `${apiUrl}/projects/${updatedProject._id}`,
        updatedProject
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_PROJECT, payload: response.data.project });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };

  // project context data
  const projectContextData = {
    projectState,
    getProjects,
    chooseItem,
    updateProject,
    // addproject,
    showToast,
    setShowToast,
    // deleteproject,
    // findproject,
    // updateproject,
    projectAvatars,
    preMembers,
    setPreMembers,
    newPost,
    setNewPost,
    getOneProject,
    showAddMembersModal,
    setShowAddMembersModal,
  };
  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
export default ProjectContextProvider;
