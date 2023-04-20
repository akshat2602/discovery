interface wsPayloadInterface {
  data: string | null;
  file_path: string;
  assessment_id: string;
  port: number | null;
}

interface wsRequestResponseInterface {
  type: string;
  payload: wsPayloadInterface;
}
