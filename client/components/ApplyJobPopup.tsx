import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const ApplyJobPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        bgColor={"primary.400"}
        width="170px"
        my={4}
        py={2}
        onClick={handleOpen}
      >
        <Text fontSize={16} fontWeight={"medium"} noOfLines={1}>
          Apply
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent bgColor="light.50" px={4} pb="6" pt="4">
          <ModalHeader fontSize={18} fontWeight={"semibold"} textColor="white">
            Enter your details
          </ModalHeader>
          <ModalCloseButton pt="9" pr="9" />
          <ModalBody>
            <FormControl>
              <FormLabel fontSize={12} fontWeight={"semibthinold"}>
                Name
              </FormLabel>
              <Input
                type="text"
                border={"none"}
                bgColor="dark.50"
                fontWeight={"medium"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={12} fontWeight={"semibthinold"}>
                Email
              </FormLabel>
              <Input
                type="email"
                border={"none"}
                bgColor="dark.50"
                fontWeight={"medium"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel
                fontSize={12}
                fontWeight={"semibthinold"}
                textColor="white"
              >
                Upload PDF
              </FormLabel>
              <Input
                type="file"
                border={"none"}
                bgColor="dark.50"
                fontWeight={"thin"}
                fontSize="12"
                padding={2}
              />
            </FormControl>
            <Button bgColor={"primary.400"} width="170px" my={4} py={2}>
              <Text fontSize={16} fontWeight={"medium"} noOfLines={1}>
                Submit
              </Text>
            </Button>
            <Button
              width="170px"
              my={4}
              py={2}
              onClick={() => setIsOpen(false)}
            >
              <Text fontSize={16} fontWeight={"medium"} noOfLines={1}>
                Cancel
              </Text>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplyJobPopup;
