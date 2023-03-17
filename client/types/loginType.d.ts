interface login200ResponseInterface {
  access_token: string;
  refresh_token: string;
  user: {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface loginRequestInterface {
  email: string;
  password: string;
}

interface login400ResponseInterface {
  non_field_errors: string[];
}
