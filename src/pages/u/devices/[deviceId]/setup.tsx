// TODO: Fail if device not activated
import { useState } from 'react';

import { Steps } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Meta from '../../../../components/Meta';
import Event from '../../../../components/setup/Event';
import Info from '../../../../components/setup/Info';
import Layout from '../../../../templates/MainLayout';
import config from '../../../../utils/config';
import { sleep } from '../../../../utils/utils';

const steps = [
  {
    title: 'Device Info',
    content: 'First-content',
  },
  {
    title: 'Schedule',
    content: 'Second-content',
  },
  {
    title: 'Done',
    content: 'Last-content',
  },
];

const Setup = () => {
  const router = useRouter();
  const { deviceId }: { deviceId?: string } = router.query;
  const { data }: any = useSession();
  const [current, setCurrent] = useState(1);

  const stepComplete = async () => {
    // wait
    await sleep(2000);
    setCurrent(current + 1);
  };

  return (
    <Layout
      meta={
        <Meta
          title={`Setup Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Setup Device</h1>
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <br />

      {current === 0 && (
        <Info
          deviceId={deviceId}
          userId={data?.userId}
          onComplete={stepComplete}
        />
      )}

      {/* {current === 1 && (
        <Days
          deviceId={deviceId}
          userId={data?.userId}
          onComplete={stepComplete}
        />
      )} */}

      {current === 1 && (
        <Event
          deviceId={deviceId}
          userId={data?.userId}
          onComplete={stepComplete}
        />
      )}
    </Layout>
  );
};

export default Setup;
