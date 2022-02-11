/*
	Typing - Start with DB types (search for "any")
	Device Ports

	Dashboard
	Add device
	Remove Device
	Assign port to schedule
	Edit Schedule
	View Schedule
	Clear Schedule
	Setup Wizard
	meta
	loading states
	type: any

	Distinction between devices, ports, events needs to be clear
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
      }, 2000);
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
          IoT{' '}
          <span className="font-extrabold text-white bg-gray-900 p-1">
            Scheduler
          </span>
          .
        </p>
      </div>
    </HomeLayout>
  );
};

export default Index;
