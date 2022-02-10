import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import notify from '../../utils/notify';

const Days = ({
  deviceId,
  userId,
  onComplete,
}: {
  deviceId?: string;
  userId: string;
  onComplete: Function;
}) => {
  const [form] = useForm();

  const onFinish = async (values: any) => {
    const { name } = values;
    if (!name || !deviceId) {
      return;
    }

    const response = await fetch('/api/devices/edit/name', {
      body: JSON.stringify({ deviceId, userId, name }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await response.json();
    if (response.status === 200) {
      // Redirect on success
      notify({
        type: 'success',
        message: `Renamed Device`,
        description: result?.data?.message,
      });

      onComplete();
      return;
    }

    // Error
    notify({
      type: 'error',
      message: `Error renaming device`,
      description: result?.error?.message,
    });
  };

  return (
    <Space>
      <Form
        form={form}
        // onValuesChange={onValuesChange}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        name="device"
        autoComplete="off"
        labelWrap
      >
        <Form.Item
          name="frequency"
          label="How often do you want this event to occur?"
        >
          <Radio.Group>
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Passengers' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="passenger name"
                      style={{ width: '60%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* <Form.Item>
          <Button htmlType="button" onClick={onSkip}>
            Skip
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    </Space>
  );
};

export default Days;
