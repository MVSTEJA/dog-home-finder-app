import { FC } from 'react';
import { Link } from 'wouter';

const NotFound: FC = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link href="/">GO HOME</Link>
    </>
  );
};

export default NotFound;
