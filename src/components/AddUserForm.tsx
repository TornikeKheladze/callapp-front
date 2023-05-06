import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import useUserStore from "../store/store";
import { AddUserFormProps } from "../types/global";

const AddUserForm: React.FC<AddUserFormProps> = ({
  closeModal,
  defaultValues,
}) => {
  const { addUser, editUser } = useUserStore((store) => store);
  const [myForm] = Form.useForm();

  useEffect(() => {
    myForm.resetFields();
  }, [defaultValues]);

  const onFinish = async (values: any) => {
    const userData = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      address: { street: values.street, city: values.city },
      phone: values.phone,
    };
    if (defaultValues) {
      editUser({ ...userData, id: defaultValues.id });
    } else {
      addUser(userData);
    }
    closeModal();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={myForm}
      name="user"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={
        defaultValues && { ...defaultValues, ...defaultValues.address }
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="street"
        name="street"
        rules={[{ required: true, message: "Please input your street!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="city"
        name="city"
        rules={[{ required: true, message: "Please input your city!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
