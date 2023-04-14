// import { useBearStore } from "../../store/bearStore";
import { Box, Button } from "@chakra-ui/react";

interface ContextForFoldersProps {
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  x: number;
  y: number;
  path: string | null;
}

export const ContextForFolders: React.FC<ContextForFoldersProps> = ({
  setOpen,
  x,
  y,
  path,
}) => {
  // const setPath = createFileOrFolderStore((state) => state.setPath);
  // const setIsFile = createFileOrFolderStore((state) => state.setIsFile);

  // const createDirectory = (e) => {
  //   setPath(path);
  //   setIsFile(0);
  // };

  // const createFile = (e) => {
  //   setPath(path);
  //   setIsFile(1);
  // };

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
        // onClick={createDirectory}
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
        Create Folder
      </Button>
      <Button
        // onClick={createFile}
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
        Create File
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
        Delete Folder
      </Button>
    </Box>
  );
};
