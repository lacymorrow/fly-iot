import ContactForm from '../components/forms/ContactForm';
import Meta from '../components/Meta';
import Layout from '../templates/AltLayout';
import config from '../utils/config';

const Contact = () => {
  return (
    <Layout
      meta={
        <Meta
          title={`Contact | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <div className="sm:table-cell w-full p-12 text-white font-bold mb-9">
        <h2 className="text-2xl mb-4">Contact us for more info</h2>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
