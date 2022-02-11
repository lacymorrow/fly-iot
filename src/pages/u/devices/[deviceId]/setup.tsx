// TODO: Fail if device not activated
import { useState } from 'react';

import { Button, Result, Space, Steps } from 'antd';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

import Meta from '../../../../components/Meta';
import Event from '../../../../components/setup/Event';
import Info from '../../../../components/setup/Info';
import { getDeviceById } from '../../../../lib/db/device';
import { DeviceType } from '../../../../lib/db/device.types';
import Layout from '../../../../templates/MainLayout';
import config from '../../../../utils/config';
import { queryParamString, sleep } from '../../../../utils/utils';

const steps = [
  {
    title: 'Device Info',
  },
  {
    title: 'Schedule',
  },
  {
    title: 'Complete',
  },
];

const Setup = ({ device }: { device: DeviceType }) => {
  const { deviceId } = device;
  const [current, setCurrent] = useState(0);

  const nextStep = async () => {
    setCurrent((current + 1) % steps.length);
  };

  const prevStep = async () => {
    setCurrent((current - 1) % steps.length);
  };

  const onComplete = async () => {
    // wait (for suspense)
    await sleep(1000);
    nextStep();
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

      <Space>
        {current === 0 && <Info device={device} onComplete={onComplete} />}

        {current === 1 && <Event device={device} onComplete={onComplete} />}

        {current === 2 && (
          <Result
            status="success"
            title="Your device has been activated!"
            subTitle={`Device ${deviceId} has been added to your account and is ready for use.`}
            extra={[
              <Button type="primary" key="dashboard">
                Dashboard
              </Button>,
              <Button key="settings">
                <Link href={`/u/devices/${deviceId}`}>
                  <a>Device Settings</a>
                </Link>
              </Button>,
            ]}
          />
        )}
      </Space>

      <Space>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prevStep}>
            Previous
          </Button>
        )}
      </Space>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const session = await getSession(context);
  if (typeof session?.userId === 'string' && params?.deviceId) {
    const device = await getDeviceById(queryParamString(params.deviceId));
    return { props: { device, userId: session.userId } };
  }

  return {
    redirect: {
      destination: "/?error='auth",
      permanent: false,
    },
  };
};

export default Setup;
