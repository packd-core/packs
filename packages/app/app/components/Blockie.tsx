import React, { FC } from "react";
import makeBlockie from "ethereum-blockies-base64";

interface BlockieProps {
  address: string;
  size?: number;
}

const Blockie: FC<BlockieProps> = ({ address, size = 50 }) => {
  return (
    <img
      src={makeBlockie(address)}
      alt="Blockie"
      style={{
        borderRadius: "50%", // Make the image round
        height: size, // Set the height
        width: size, // Set the width
      }}
    />
  );
};

export default Blockie;
