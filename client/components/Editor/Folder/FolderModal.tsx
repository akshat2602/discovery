import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { useRouter } from "next/router";

import { useBearStore } from "../../../store/bearStore";

export const FolderModal = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { onClose } = useDisclosure();
  const [path, isFile, setPath, setIsFile, ws] = useBearStore((state) => [
    state.path,
    state.isFile,
    state.setPath,
    state.setIsFile,
    state.wsForEditor,
  ]);
  const assessmentID = router.query.assessmentId as string;
  const createFolder = () => {
    const wsReq: wsRequestResponseInterface = {
      type: "createFolder",
      payload: {
        file_path: path + "/" + name,
        data: null,
        assessment_id: assessmentID,
        port: null,
      },
    };
    ws?.send(JSON.stringify(wsReq));
    setName("");
  };

  return (
    <Modal isOpen={path !== null && isFile === 0} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Folder</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Folder Name"
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              setName("");
              setPath(null);
              setIsFile(-1);
              onClose();
            }}
          >
            Close
          </Button>
          <Button onClick={createFolder}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
