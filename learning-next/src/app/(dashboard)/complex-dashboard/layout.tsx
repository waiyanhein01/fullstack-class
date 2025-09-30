import React from "react";

// Parallel routes layout
const layout = ({
  children,
  users,
  revenue,
  notification,
  login,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  notification: React.ReactNode;
  login: React.ReactNode;
}) => {
  const isLoggedIn = false;
  return isLoggedIn ? (
    <div>
      <div className="">{children}</div>
      <div className="flex gap-4 mt-5">
        <div className="flex flex-col gap-4">
          <div className="">{users}</div>
          <div className="">{revenue}</div>
        </div>
        <div className="flex flex-1">{notification}</div>
      </div>
    </div>
  ) : (
    <div>{login}</div>
  );
};

export default layout;
