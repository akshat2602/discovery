interface folderStructureInterface {
  type: "directory" | "file";
  name: string;
  contents: folderStructureInterface[] | null;
}
