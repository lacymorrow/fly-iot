import { Button, Input } from 'antd';

import Meta from '../../../components/Meta';
import Layout from '../../../templates/MainLayout';
import config from '../../../utils/config';

const Device = () => (
  <Layout
    meta={
      <Meta
        title={`View Device | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h1>Add Device</h1>
    <Input placeholder="Device ID..." />
    <Button type="primary">Add device</Button>
  </Layout>
);

export default Device;
