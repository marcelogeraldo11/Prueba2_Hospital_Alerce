import React from "react";

const SubmitButton = ({ ...props }) => {
  return (
    <input
      type="submit"
      value={props.value}
      className="bg-red-500 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-red-700 hover:cursor-pointer md:w-auto"
    />
  );
};

export default SubmitButton;
