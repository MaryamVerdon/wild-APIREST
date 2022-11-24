import clsx from "clsx";
import { useState } from "react";

export default function Skill({ title, votes }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={clsx(
        "transition-all duration-500 flex items-center mr-4 mb-3 bg-black/5 hover:bg-black/10 p-1 pl-2 pr-2 rounded-xl cursor-pointer border hover:border-black/5 "
      )}
    >
      {title}
      <div
        className={clsx(
          `items-center flex bg-black/30 text-white rounded-[9999px] h-[25px] pr-2 pl-2 justify-center ml-2 transition-all duration-1000`
        )}
      >
        <div
          style={{ rotate: isHovered ? "0deg x" : "360deg x" }}
          className={clsx(`transition-all duration-1000`)}
        >
          {votes}
        </div>
      </div>
    </li>
  );
}
