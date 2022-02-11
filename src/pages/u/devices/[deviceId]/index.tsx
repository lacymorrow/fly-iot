import { EllipsisOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Dropdown,
  Menu,
  PageHeader,
  Tag,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Meta from '../../../../components/Meta';
import Layout from '../../../../templates/MainLayout';
import config from '../../../../utils/config';

const { Paragraph } = Typography;

const Device = () => {
  const router = useRouter();
  const { deviceId }: { deviceId?: string } = router.query;
  // const [loading, setLoading] = useState(false);

  const routes = [
    {
      path: '/u/dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/u/devices',
      breadcrumbName: 'Devices',
    },
    {
      path: `/u/devices/${deviceId || ''}`,
      breadcrumbName: deviceId || 'This device',
    },
  ];

  return (
    <Layout
      meta={
        <Meta
          title={`View Device | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Card>
        <PageHeader
          title={`Device 1`}
          className="site-page-header"
          subTitle={deviceId}
          tags={<Tag color="blue">Active</Tag>}
          extra={[
            <Button key="2">
              <Link href={`/u/devices/${deviceId}/schedule`}>
                <a>Device Schedule</a>
              </Link>
            </Button>,
            <Button key="1" type="primary">
              <Link href={`/u/devices/${deviceId}/setup`}>
                <a>Setup Device</a>
              </Link>
            </Button>,
            <Dropdown
              key="more"
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button type="link">
                      <Link href={`/u/devices/${deviceId}/settings`}>
                        <a>Settings</a>
                      </Link>
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button type="link" danger>
                      <Link href={`/u/devices/${deviceId}/delete`}>
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
          breadcrumb={{ routes }}
        >
          <Paragraph>Your device is ready to be setup.</Paragraph>
        </PageHeader>
      </Card>
    </Layout>
  );
};

export default Device;
