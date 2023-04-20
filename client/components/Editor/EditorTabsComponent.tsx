import { Box } from "@chakra-ui/react";

import { EditorButtonComponent } from "./EditorButton";

import { useBearStore } from "../../store/bearStore";

export const EditorTabsComponent = () => {
  const availableTabs = useBearStore((state) => state.availableTabs);

  return (
    <Box
      display={"flex"}
      // pt={"5px"}
      // pb={"5px"}
      h={"3vh"}
      // borderBottom={"1px solid #1f1f1f"}
    >
      {Object.keys(availableTabs).length > 0 &&
        Object.entries(availableTabs).map((entries) => {
          return (
            <EditorButtonComponent
              path={entries[0]}
              isActive={entries[1]}
              key={entries[0]}
            />
          );
        })}
    </Box>
  );
};
