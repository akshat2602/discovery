import Head from "next/head";
import JobPostings from "./jobpostings";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Discovery</title>
        <meta name="description" content="Discovery | Find Jobs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobPostings />
    </>
  );
};

export default Home;
