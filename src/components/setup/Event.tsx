import { useState } from 'react';

import { Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { DeviceSetupProps } from '../../lib/db/device.types';
import notify from '../../utils/notify';

const { RangePicker } = DatePicker;

const Event = ({ device, onComplete }: DeviceSetupProps) => {
  const { deviceId, registeredToUser: userId } = device;

  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [isAlwaysOn, setIsAlwaysOn] = useState(false);
  const [eventRange, setEventRange] = useState({
    start: undefined,
    stop: undefined,
  });

  const onSkip = () => {
    onComplete();
  };

  const onValuesChange = (values: any) => {
    if (values.alwaysOn) {
      setIsAlwaysOn(values.alwaysOn);
    } else {
      setIsAlwaysOn(false);
    }

    if (values.eventRange) {
      const [start, stop] = values.eventRange;
      setEventRange({ start: start?.toDate(), stop: stop?.toDate() });
    }
  };

  const onFinish = async (values: any) => {
    const {
      alwaysOn,
      eventName,
      eventRange: [start, stop],
    } = values;

    // Todo: should we require an stop time?
    if (!alwaysOn && (!start || !stop)) {
      // Not always on, start and stop required
      return;
    }

    setLoading(true);

    let response;
    if (alwaysOn) {
      // Turn on device
      response = await fetch('/api/devices/control/on', {
        body: JSON.stringify({
          deviceId,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    } else {
      // Schedule an event
      response = await fetch('/api/devices/add/event', {
        body: JSON.stringify({
          deviceId,
          userId,
          event: {
            name: eventName || 'Event',
            start: start.toDate(),
            stop: stop.toDate(),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }

    setLoading(false);

    const result = await response.json();
    if (response.status === 200) {
      // Redirect on success
      notify({
        type: 'success',
        message: `Device updated`,
        description: result?.data?.message,
      });

      onComplete();
      return;
    }

    // Error
    notify({
      type: 'error',
      message: `Error updating device`,
      description: result?.error?.message,
    });
  };

  return (
    <Space>
      <Form
        form={form}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="event"
        autoComplete="off"
        labelWrap
      >
        <Form.Item name="alwaysOn" label="Always on" valuePropName="checked">
          <Switch checked={isAlwaysOn} />
        </Form.Item>
        {/* Todo: allow scheduling alwaysOn start at a future time */}
        <Form.Item label="Event nickname" name="eventName">
          <Input placeholder="My fun event" />
        </Form.Item>
        <Form.Item
          name="eventRange"
          label="Start/Stop date and time"
          rules={[
            {
              type: 'array' as const,
              required: true,
              message: 'Please select time!',
            },
          ]}
        >
          <RangePicker
            showNow
            showTime
            disabled={isAlwaysOn}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        {(isAlwaysOn || eventRange.start) && (
          <h3>
            This device will run{' '}
            <span>
              {isAlwaysOn
                ? 'indefinitely'
                : `from ${eventRange?.start} to ${eventRange.stop}`}
            </span>
          </h3>
        )}
        <Form.Item>
          <Button htmlType="button" onClick={onSkip}>
            Skip creating event (you can still control this device manually)
          </Button>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Event;
