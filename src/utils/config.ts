const config = {
  domain: 'https://iot-lacymorrow.vercel.app/',
  totalImages: 21,
  site_name: 'iot',
  email: 'me@lacymorrow.com',
  title: 'Cloud',
  tagline: 'Cloud interface for your IoT hub.',
  description: 'Schedule, control, and monitor your IoT Hub.',
  locale: 'en',
  errorMessage: '',
};

config.errorMessage = `There was an error, please email <a href="mailto:${config.email}">${config.email}</a>`;

export default config;
