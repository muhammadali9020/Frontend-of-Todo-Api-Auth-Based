import React from "react";

const Button = (props) => {
  return (
    <button className=" bg-green-400 hover:bg-green-500 text-white font-bold my-2 hover:bg-green-5400 w-full p-2 rounded-xs">
      {props.name}
    </button>
  );
};

export default Button;
