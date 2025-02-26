import React from "react";
import { BlockUser } from "./userblock";

export function UsersList({ users }) {
  return (
    <>
      <div className="text">
        <h1>Users</h1>
      </div>
      <div className="users-list">
        <BlockUser
          userId="userId"
          username="username"
          email="email"
          credit="credit"
          provider="provider"
        />
        {users.length > 0 ? (
          users.map((user) => (
            <BlockUser
              key={user.userId}
              userId={user.userId}
              username={user.username}
              email={user.email}
              credit={user.credit}
              provider={user.provider}
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  );
}
