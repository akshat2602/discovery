import { Box, Button } from "@chakra-ui/react";

interface ContextForFilesProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
}

export const ContextForFiles: React.FC<ContextForFilesProps> = ({
  setOpen,
  x,
  y,
}) => {
  return (
    <Box
      onMouseLeave={() => {
        setOpen(false);
      }}
      style={{
        width: "100px",
        position: "fixed",
        fontSize: "0px",
        left: x,
        top: y,
        border: "1px solid black",
      }}
    >
      <Button
        // onClick={deleteFile}
        style={{
          color: "white",
          backgroundColor: "#22212c",
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          cursor: "pointer",
        }}
      >
        Delete File
      </Button>
      <Button
        style={{
          color: "white",
          backgroundColor: "#22212c",
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          cursor: "pointer",
        }}
      >
        Rename File
      </Button>
    </Box>
  );
};
