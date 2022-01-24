import Link from 'next/link';

import Meta from '../components/Meta';
import Layout from '../templates/MainLayout';
import config from '../utils/config';

const About = () => (
  <Layout
    meta={
      <Meta
        title={`About | ${config.title}: ${config.tagline}`}
        description={config.description}
      />
    }
  >
    <p>Why we name and shame:</p>
    <p>
      We do not shame just anyone. Instead, we focus on <b>companies</b>,{' '}
      <b>politicians</b>, and <b>police officers</b>. We shame public entities
      that <b>abuse their positions of power</b>.
    </p>
    <p className="mt-10">
      <Link href="/contact">
        <a className="font-bold text-4xl border-4 border-gray-900 transition text-gray-900 hover:text-white hover:bg-gray-900 p-6">
          Do something about it.
        </a>
      </Link>
    </p>
  </Layout>
);

export default About;
