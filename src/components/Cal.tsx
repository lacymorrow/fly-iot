import { FC, useState } from 'react';

import moment from 'moment';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
// @ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

const Cal: FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
    },
  ]);

  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    console.log(data);
  };

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '75vh' }}
    />
  );
};

export default Cal;
