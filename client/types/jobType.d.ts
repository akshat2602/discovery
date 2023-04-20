interface jobInterface {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  postedOn: Date;
  applicants: number;
  rounds: jobRoundInterface[];
}

interface jobRoundInterface {
  round: number;
  roundName: string;
}
