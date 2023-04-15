interface wsPayloadInterface {
  data: string | null;
  file_path: string;
  assessment_id: string;
}

interface wsRequestResponseInterface {
  type: string;
  payload: wsPayloadInterface;
}
