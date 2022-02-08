import Meta from '../../components/Meta';
import Layout from '../../templates/MainLayout';
import config from '../../utils/config';

const Dashboard = () => (
  <Layout
    meta={
      <Meta
        title={`Dashboard | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h1>Dashboard</h1>
  </Layout>
);

export default Dashboard;
