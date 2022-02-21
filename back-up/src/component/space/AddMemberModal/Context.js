import { createContext, useReducer, useState } from "react";
export const Context = createContext();
const ContextProvider = ({ children }) => {
  const [preMembers, setPreMembers] = useState([]);
  const setMember = (newMembers) => {
    setPreMembers([...preMembers, newMembers]);
  };
  const removeMember = (_id) => {
    setPreMembers(preMembers.filter((member) => member._id !== _id));
  };

  const ContextData = {
    preMembers,
    setPreMembers,
    setMember,
    removeMember,
  };
  return <Context.Provider value={ContextData}>{children}</Context.Provider>;
};
export default ContextProvider;
