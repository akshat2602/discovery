import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg";

interface LogoProps {
  height?: number;
  width?: number;
}

const Logo: React.FC<LogoProps> = ({ height, width }) => {
  return (
    <Image
      src={logo.src}
      height={height ? height : "25"}
      width={width ? width : "25"}
      alt="logo"
    ></Image>
  );
};

export default React.memo(Logo);
