/*
  brand login/logout
  video autoplay
  meta
	pagination
	votes
	sharing
	flag
	comments
	loading states
	type: any
*/

import { useEffect, useState } from 'react';

import Meta from '../components/Meta';
import { BigTitle } from '../styles';
import HomeLayout from '../templates/MainLayout';
import config from '../utils/config';
import { generateRandom } from '../utils/utils';

const Index = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Runs on mount only
    setImageIndex(generateRandom(config.totalImages));

    // Fade in clipped image
    if (!active) {
      setTimeout(() => {
        setActive(true);
      }, 2500);
    }
  }, []);

  return (
    <HomeLayout
      meta={
        <Meta
          title={`About | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <Meta
        title={`${config.title}: ${config.tagline}`}
        description={config.description}
      />

      <BigTitle
        className="text-8xl sm:text-12xl"
        active={active}
        src={`/assets/images/shots/${imageIndex}.jpg`}
        content={config.title}
      >
        {config.title}
      </BigTitle>

      <div className="text-center">
        <p className="font-bold text-3xl mb-12">
          Shedding light on{' '}
          <span className="font-extrabold text-white bg-gray-900 p-1">
            abuses of authority
          </span>
          .
        </p>
      </div>
    </HomeLayout>
  );
};

export default Index;
