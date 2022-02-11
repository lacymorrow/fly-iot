import { useEffect, useState } from 'react';

import moment from 'moment';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ScheduleProps } from '../lib/db/event.types';

const localizer = momentLocalizer(moment);
// const ColoredDateCellWrapper = ({ children }) =>
//   cloneElement(Children.only(children), {
//     style: {
//       backgroundColor: 'purple',
//     },
//   });

// @ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

const Cal = ({ deviceEvents }: ScheduleProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const initialEvents: Event[] = [];
    deviceEvents.forEach((deviceEvent) => {
      deviceEvent.events.map((event) =>
        initialEvents.push({
          allDay: false,
          title: event.name || 'Event',
          start: moment(event.start).toDate(),
          end: moment(event.stop).toDate(),
          resource: deviceEvent.device.deviceId,
        })
      );
    });
    setEvents(initialEvents);
  }, [deviceEvents]);

  const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
    console.log(data);
    // const { start, end } = data;
    // setEvents((currentEvents) => {
    //   const firstEvent = {
    //     title: 'asd',
    //     start: new Date(start),
    //     end: new Date(end),
    //   };
    //   return [...currentEvents, firstEvent];
    // });
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    console.log(data);
  };

  return (
    <DnDCalendar
      defaultView="month"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      style={{ height: '65vh' }}
      // components={{
      //   timeSlotWrapper: ColoredDateCellWrapper,
      // }}
      // resizable
      showMultiDayTimes
    />
  );
};

export default Cal;
