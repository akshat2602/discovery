import { Box, Button, Text } from "@chakra-ui/react";

import { useState } from "react";

import { useBearStore } from "../../store/bearStore";

import { AiFillFile } from "react-icons/ai";
import { FcCollapse as Collapse, FcExpand as Expand } from "react-icons/fc";

import { ContextForFolders } from "./ContextFolder";
import { ContextForFiles } from "./ContextFile";
// import { IconPack } from "../assets/IconPack";

interface TreeProps {
  data: folderStructureInterface;
  ws: WebSocket | null;
  addOrUpdateTab: (path: string) => void;
  setX: (x: number) => void;
  setY: (y: number) => void;
  setContextForFileOpen: (open: boolean) => void;
  setContextForFolderOpen: (open: boolean) => void;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

const Tree: React.FC<TreeProps> = ({
  data,
  ws,
  addOrUpdateTab,
  setX,
  setY,
  setContextForFileOpen,
  setContextForFolderOpen,
  setPath,
}) => {
  const [visible, setVisible] = useState<{ [key: string]: Boolean }>({});

  const toggleVisibility = (name: string) => {
    setVisible({ ...visible, [name]: !visible[name] });
  };

  const handleDoubleClick = (path: string) => {
    const readFileRequest = {
      type: "readFile",
      payload: {
        path: path,
        data: null,
      },
    };
    addOrUpdateTab(path);
    ws?.send(JSON.stringify(readFileRequest));
  };

  const handleContextForFolders = (
    e: React.MouseEvent<Element, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();
    setContextForFolderOpen(true);
    setX(e.clientX);
    setY(e.clientY);
    setPath(name);
  };

  const handleContextForFiles = (
    e: React.MouseEvent<Element, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();
    setContextForFileOpen(true);
    setX(e.clientX);
    setY(e.clientY);
    setPath(name);
  };

  return (
    <Box style={{ paddingLeft: "10px", color: "white" }}>
      {data.contents ? (
        <Button
          onContextMenu={(e) => handleContextForFolders(e, data.name)}
          onClick={() => toggleVisibility(data.name)}
          style={{
            paddingTop: "6px",
            fontSize: "15px",
            backgroundColor: "transparent",
            color: "white",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {visible[data.name] ? <Collapse /> : <Expand />}
          &nbsp;
          {data.name}
        </Button>
      ) : (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <AiFillFile
            color="gray"
            display="block"
            style={{ marginTop: "7px" }}
          />
          <Text
            onContextMenu={(e) => handleContextForFiles(e, data.name)}
            onDoubleClick={() => handleDoubleClick(data.name)}
            style={{
              fontSize: "15px",
              cursor: "pointer",
              marginLeft: "5px",
              paddingTop: "6px",
            }}
          >
            {data.name}
          </Text>
        </Box>
      )}
      {visible[data.name] &&
        data.contents &&
        data.contents.map((child) => (
          <Tree
            key={child.name}
            data={child}
            ws={ws}
            addOrUpdateTab={addOrUpdateTab}
            setX={setX}
            setY={setY}
            setContextForFileOpen={setContextForFileOpen}
            setContextForFolderOpen={setContextForFolderOpen}
            setPath={setPath}
          />
        ))}
    </Box>
  );
};

export const FolderStructureComponent = () => {
  const [folderStructure, addOrUpdateTab] = useBearStore((state) => [
    state.folderStructure,
    state.addOrUpdateTab,
  ]);

  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [contextForFolderOpen, setContextForFolderOpen] =
    useState<Boolean>(false);
  const [contextForFileOpen, setContextForFileOpen] = useState<Boolean>(false);
  const [path, setPath] = useState<string>("");

  const ws = useBearStore((state) => state.wsForEditor);

  return (
    <>
      {contextForFileOpen && x && y && (
        <ContextForFiles x={x} y={y} setOpen={setContextForFileOpen} />
      )}
      {contextForFolderOpen && x && y && (
        <ContextForFolders
          x={x}
          y={y}
          setOpen={setContextForFolderOpen}
          path={path}
        />
      )}
      {folderStructure && (
        <Tree
          data={folderStructure}
          ws={ws}
          addOrUpdateTab={addOrUpdateTab}
          setX={setX}
          setY={setY}
          setContextForFileOpen={setContextForFileOpen}
          setContextForFolderOpen={setContextForFolderOpen}
          setPath={setPath}
        />
      )}
    </>
  );
};
