import React from "react";

interface PromptTileProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const PromptTile: React.FC<PromptTileProps> = ({ icon, text, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="border p-3 px-5 cursor-pointer flex hover:border-placeholder-gray items-center gap-2 border-menu-gray rounded-full hover:bg-menu-gray"
    >
      {icon}
      <p className="text-placeholder-gray text-sm">{text}</p>
    </div>
  );
};

export default PromptTile;
