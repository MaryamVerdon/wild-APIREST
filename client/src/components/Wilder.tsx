import { Wilder as WilderType } from "../types/Wilder";

interface WilderProps {
  wilder: WilderType;
}

function Wilder({ wilder: { name } }: WilderProps) {
  return (
    <div className="flex bg-white p-4 rounded-2xl mb-4 shadow-md">
      <img
        src={require("../assets/profile.png")}
        alt={name}
        className="h-16 w-16 rounded-full mr-6"
      />

      <div className="flex justify-between w-full  min-w-[200px]">
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {name[0].toUpperCase() + name.split("").splice(1).join("")}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Wilder;
