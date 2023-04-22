// @ts-nocheck
import { userGetAPI } from "./userGetAPI";
import { randomUserInterface, Result } from "../types/randomUserType";

const jobTitles = [
  "Product Management - Intern",
  "Senior Software Engineer",
  "Software Developer - Android",
  "Software Developer - iOS",
  "Software Developer - Web",
  "Software Developer - Backend",
  "Software Developer - Full Stack",
  "Software Developer - Machine Learning",
  "Software Developer - Data Science",
  "Software Developer - DevOps",
  "Software Developer - QA",
  "Software Developer - Security",
  "Software Developer - UI/UX",
  "Software Developer - Game Development",
  "Software Developer - Blockchain",
  "Software Developer - Embedded Systems",
];

function randomDate(start: Date, end: Date, rand: number) {
  return new Date(start.getTime() + rand * (end.getTime() - start.getTime()));
}

interface tempJobRoundInterface {
  [key: number]: string[];
}
const jobRounds: tempJobRoundInterface = {
  1: ["Phone Screen", "Coding Challenge"],
  2: ["Take Home Chanllenge", "Coding Challenge"],
  3: ["Live Coding", "Coding Challenge"],
  4: ["Coding Interview", "Technical Interview", "Onsite Interview"],
  5: ["Coding Interview", "Technical Interview", "Onsite Interview"],
};

const jobDescriptions = [
  "Assisting the Product Manager in defining and executing the product roadmap for a specific product or feature",
  "Leading and participating in the design, development, testing, and deployment of complex software systems",
  "Designing and building mobile applications for the Android platform using Java or Kotlin",
  "Designing and building mobile applications for the iOS platform using Swift or Objective-C.",
  "Developing and maintaining web applications using front-end technologies such as HTML, CSS, and JavaScript, as well as back-end technologies such as Node.js and SQL databases.",
  "Developing and maintaining the server-side components of web applications, including database design and management, API development, and server optimization.",
  "Developing and maintaining both the front-end and back-end components of web applications.",
  "Developing and deploying machine learning models for applications such as natural language processing, computer vision, and predictive analytics.",
  "Collecting, cleaning, and analyzing large datasets to extract meaningful insights and build predictive models.",
  "Designing and implementing automated software deployment, monitoring, and management processes to ensure the reliability and scalability of software systems.",
  "Developing and implementing software testing strategies and procedures to ensure the quality and reliability of software products.",
  "Designing and implementing software security measures to protect against cyber attacks and data breaches.",
  "Designing and implementing user interfaces for web and mobile applications that are intuitive and visually appealing.",
  "Designing and developing video games for various platforms, including PC, console, and mobile devices.",
  "Developing and implementing blockchain-based solutions for applications such as cryptocurrency, supply chain management, and digital identity.",
  "Designing and developing software for embedded systems, such as microcontrollers and IoT devices.",
];
const generateJob = async (users: Result[]): Promise<jobInterface> => {
  const rand = Math.random();
  const randNum = Math.floor(rand * jobTitles.length);
  const id = Math.floor(Math.random() * 100000) + "";
  const title = jobTitles[randNum];
  const description = jobDescriptions[randNum];
  const location = "Remote";
  const salary = Math.floor(Math.random() * 100000);
  const postedOn = randomDate(new Date(2023, 1, 1), new Date(), rand);
  const applicants = Math.floor(Math.random() * 100);
  const numRounds = rand * 5 + 2;
  const rounds: jobRoundInterface[] = [];
  let prev = 0;
  for (let i = 1; i <= numRounds; i++) {
    const randRound = Math.floor(Math.random() * jobRounds[i].length);
    const candidateList = Math.floor(Math.random() * 10) + prev;
    rounds.push({
      round: i,
      roundName: jobRounds[i][randRound],
      candidates: users.slice(prev, candidateList),
    });
    prev = candidateList;
  }

  rounds[rounds.length - 1] = { round: rounds.length, roundName: "Offer" };
  return {
    id,
    title,
    description,
    location,
    salary,
    postedOn,
    applicants,
    rounds,
  };
};

const generateJobs = async (numJobs: number): Promise<jobInterface[]> => {
  const jobs: jobInterface[] = [];
  const users = (await (await userGetAPI()).results) as Result[];
  let prev = 0;
  for (let i = 0; i < numJobs; i++) {
    jobs.push(await generateJob(users.slice(prev, prev + 10)));
    prev = prev + 10;
  }
  return jobs;
};

export { generateJobs };
