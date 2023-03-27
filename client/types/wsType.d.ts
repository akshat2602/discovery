interface wsPayloadInterface {
  data: string;
  file_path: string;
}

interface wsRequestResponseInterface {
  type: string;
  payload: wsPayloadInterface;
}
