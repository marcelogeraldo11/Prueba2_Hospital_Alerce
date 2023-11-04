import React from "react";

const Title = ({ ...props }) => {
  return (
    <div className="mt-10">
      <h1 className="text-red-500 font-black text-6xl">
        {props.blue}
        <span className="text-black"> {props.black}</span>
      </h1>
    </div>
  );
};

export default Title;
