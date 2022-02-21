import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

const User = () => {
  const [newUser, setNewUser] = useState({
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("birthdate", newUser.birthdate);
    formData.append("name", newUser.name);

    axios
      .put(`${apiUrl}/auth/avatar`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name="photo"
        onChange={handlePhoto}
      />
      <input type="submit" />
    </form>
  );
};

export default User;
