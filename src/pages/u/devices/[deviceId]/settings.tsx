import { Button } from 'antd';

import Meta from '../../../../components/Meta';
import Layout from '../../../../templates/MainLayout';
import config from '../../../../utils/config';

const Settings = () => (
  <Layout
    meta={
      <Meta
        title={`Settings | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h1>Device Settings</h1>
    <Button>
      Unlock device (for use without login, use QR code to change device
      settings)
    </Button>
  </Layout>
);

export default Settings;
