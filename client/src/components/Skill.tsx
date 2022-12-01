import clsx from "clsx";

interface SkillProps {
  title: string;
}

const Skill = ({ title }: SkillProps) => {
  return (
    <li
      className={clsx(
        "transition-all duration-500 flex items-center mr-4 mb-3 bg-black/5 hover:bg-black/10 p-1 pl-2 pr-2 rounded-xl cursor-pointer border hover:border-black/5 "
      )}
    >
      {title}
    </li>
  );
};

export default Skill;
