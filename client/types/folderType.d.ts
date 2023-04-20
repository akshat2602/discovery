interface folderStructureInterface {
  type: "directory" | "file";
  name: string;
  contents: folderStructureInterface[] | null;
}

interface containerCreateInterface {
  assessment_id: string;
}
