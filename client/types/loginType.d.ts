interface login200ResponseInterface {
  access_token: string;
  refresh_token: string;
}

interface loginRequestInterface {
  email: string;
  password: string;
}

interface userResponseInterface {
  pk: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
}
