import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Cal from '../../components/Cal';
import Meta from '../../components/Meta';
import { getAllEventsByUserId } from '../../lib/db/event';
import { ScheduleProps } from '../../lib/db/event.types';
import Layout from '../../templates/MainLayout';
import config from '../../utils/config';

const Schedule = ({ deviceEvents }: ScheduleProps) => {
  return (
    <Layout
      meta={
        <Meta
          title={`Schedule | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Schedule</h1>
      <Cal deviceEvents={deviceEvents} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (typeof session?.userId === 'string') {
    const deviceEvents = await getAllEventsByUserId(session.userId);
    return { props: { deviceEvents } };
  }

  return {
    redirect: {
      destination: "/?error='noSession",
      permanent: false,
    },
  };
};

export default Schedule;
