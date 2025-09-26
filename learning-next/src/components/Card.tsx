import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border rounded-lg flex items-center justify-center p-28 m-10">
      {children}
    </div>
  );
};

export default Card;
