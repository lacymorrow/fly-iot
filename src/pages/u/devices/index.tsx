import { Button, Card, List } from 'antd';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

import Meta from '../../../components/Meta';
import { getAllDevicesByUserId } from '../../../lib/db/device';
import Layout from '../../../templates/MainLayout';
import config from '../../../utils/config';

const Devices = (props: {
  devices: { deviceId: string; deviceName?: string }[];
}) => {
  const { devices } = props;
  return (
    <Layout
      meta={
        <Meta
          title={`View Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Your devices</h1>
      {devices ? (
        <List
          size="large"
          itemLayout="vertical"
          dataSource={devices}
          renderItem={(device) => (
            <List.Item key={device.deviceId}>
              <Card title={device.deviceName || `Device ${device.deviceId}`}>
                {device.deviceId}
                <Button type="primary">
                  <Link href={`/u/devices/${device.deviceId}/setup`}>
                    <a>Setup device</a>
                  </Link>
                </Button>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <h3>You haven&apos;t added any devices yet...</h3>
      )}
      <Button type="primary">
        <Link href={`/u/devices/add`}>
          <a>Add a new device</a>
        </Link>
      </Button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (typeof session?.userId === 'string') {
    const devices = await getAllDevicesByUserId(session.userId);
    return { props: { devices } };
  }

  return {
    redirect: {
      destination: "/?error='noSession",
      permanent: false,
    },
  };
};

export default Devices;
