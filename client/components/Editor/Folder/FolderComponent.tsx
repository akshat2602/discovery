// @ts-nocheck
import { Box, Button, Text } from "@chakra-ui/react";
import { AiFillFile } from "react-icons/ai";
import { FcCollapse as Collapse, FcExpand as Expand } from "react-icons/fc";
import IconPack from "../../../public/IconPack";

import { useState } from "react";
import { useRouter } from "next/router";

import { useBearStore } from "../../../store/bearStore";

import { ContextForFolders } from "./ContextFolder";
import { ContextForFiles } from "./ContextFile";

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
  const router = useRouter();
  const handleDoubleClick = (path: string) => {
    const readFileRequest: wsRequestResponseInterface = {
      type: "readFile",
      payload: {
        file_path: path,
        data: null,
        assessment_id: router.query.assessmentId as string,
        port: null,
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
            paddingTop: "2%",
            // fontSize: "15px",
            backgroundColor: "transparent",
            color: "white",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {visible[data.name] ? <Collapse /> : <Expand />}
          &nbsp;
          {data.name.split("/")[data.name.split("/").length - 1]}
        </Button>
      ) : (
        <Box style={{ display: "flex", alignItems: "center" }}>
          {IconPack.hasOwnProperty(data.name.split(".").pop()!) ? (
            IconPack[data.name.split(".").pop()!]
          ) : (
            <AiFillFile
              color="gray"
              display="block"
              style={{ marginTop: "7px" }}
            />
          )}

          <Text
            onContextMenu={(e) => handleContextForFiles(e, data.name)}
            onDoubleClick={() => handleDoubleClick(data.name)}
            style={{
              // fontSize: "15px",
              cursor: "pointer",
              marginLeft: "2%",
              paddingTop: "2%",
            }}
          >
            {data.name.split("/")[data.name.split("/").length - 1]}
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
          data={folderStructure.contents![0]}
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
