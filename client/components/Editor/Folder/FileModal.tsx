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

export const FileModal = () => {
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

  const createFile = () => {
    const wsReq: wsRequestResponseInterface = {
      type: "createFile",
      payload: {
        file_path: path + "/" + name,
        data: null,
        assessment_id: router.query.assessmentId as string,
      },
    };
    ws?.send(JSON.stringify(wsReq));
    setName("");
  };

  return (
    <Modal isOpen={path !== null && isFile === 1} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a File</ModalHeader>
        <ModalBody>
          <Input
            placeholder="File Name"
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
          <Button onClick={createFile}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
