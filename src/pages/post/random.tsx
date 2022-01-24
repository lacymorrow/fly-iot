import { GetServerSideProps } from 'next';

import { getRandomPostId } from '../../lib/posts';

export default function Random() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const id = await getRandomPostId();
  return {
    redirect: {
      permanent: false,
      destination: `/post/${id}`,
    },
  };
};
