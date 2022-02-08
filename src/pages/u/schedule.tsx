import Cal from '../../components/Cal';
import Meta from '../../components/Meta';
import Layout from '../../templates/MainLayout';
import config from '../../utils/config';

const Schedule = () => (
  <Layout
    meta={
      <Meta
        title={`Schedule | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <h1>Schedule</h1>
    <Cal />
  </Layout>
);

export default Schedule;
