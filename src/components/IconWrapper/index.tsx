import React from "react";

type IconWrapperProps = {
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  active?: boolean;
};

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, onClick, height = 14, width = 14, active }) => {
  return (
    <div
      className={`rounded-[7px] p-2.5 cursor-pointer transition-colors duration-200 ${
        active ? "bg-background shadow-feed-icon hover:bg-background/60" : "bg-transparent hover:bg-subbackground/70"
      }`}
      onClick={onClick}
    >
      <img src={icon} alt="icon" height={height} width={width} />
    </div>
  );
};

export default IconWrapper;
