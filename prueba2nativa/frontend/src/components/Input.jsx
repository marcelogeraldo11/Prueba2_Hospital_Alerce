import React from "react";

const Input = ({ ...props }) => {
  return (
    <div className="my-5">
      <label className=" uppercase text-gray-600 block text-xl font-bold">
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Input;
