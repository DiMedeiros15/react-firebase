import React from "react";

const UserItem = ({ user, deleteUser }) => {
  return (
    <div className="user-item">
      <li>{user.name}</li>
      <li>{user.email}</li>
      <button className="delete-btn" onClick={() => deleteUser(user.id)}>
        X
      </button>
    </div>
  );
};

export default UserItem;
