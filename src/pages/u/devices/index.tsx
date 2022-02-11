import { EllipsisOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Dropdown,
  List,
  Menu,
  PageHeader,
  Space,
  Tag,
} from 'antd';
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
      <Space direction="vertical" align="center">
        <h1>Your devices</h1>
        {devices ? (
          <List
            size="large"
            itemLayout="vertical"
            dataSource={devices}
            renderItem={(device) => (
              <List.Item key={device.deviceId}>
                <Card>
                  <PageHeader
                    title={device.deviceName || `Device ${device.deviceId}`}
                    className="site-page-header"
                    subTitle={
                      <Link href={`/u/devices/${device.deviceId}`}>
                        <a>{device.deviceId}</a>
                      </Link>
                    }
                    tags={<Tag color="blue">Active</Tag>} // TODO
                    extra={[
                      <Button key="2">
                        <Link href={`/u/devices/${device.deviceId}/setup`}>
                          <a>Setup Device</a>
                        </Link>
                      </Button>,
                      <Button key="1" type="primary">
                        <Link href={`/u/devices/${device.deviceId}`}>
                          <a>View Device</a>
                        </Link>
                      </Button>,
                      <Dropdown
                        key="more"
                        overlay={
                          <Menu>
                            <Menu.Item>
                              <Button type="link">
                                <Link
                                  href={`/u/devices/${device.deviceId}/settings`}
                                >
                                  <a>Settings</a>
                                </Link>
                              </Button>
                            </Menu.Item>
                            <Menu.Item>
                              <Button type="link" danger>
                                <Link
                                  href={`/u/devices/${device.deviceId}/delete`}
                                >
                                  <a>Delete</a>
                                </Link>
                              </Button>
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button
                          style={{
                            border: 'none',
                            padding: 0,
                          }}
                        >
                          <EllipsisOutlined
                            style={{
                              fontSize: 20,
                              verticalAlign: 'top',
                            }}
                          />
                        </Button>
                      </Dropdown>,
                    ]}
                    avatar={{
                      src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
                    }}
                  ></PageHeader>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <h3>You haven&apos;t added any devices yet...</h3>
        )}
        <Button type="primary" className="mb-12">
          <Link href={`/u/devices/add`}>
            <a>Add a new device</a>
          </Link>
        </Button>
      </Space>
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
