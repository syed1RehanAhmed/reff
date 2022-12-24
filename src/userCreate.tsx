import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  useForm,
  useTable,
} from "@pankod/refine-antd";
import { useDelete } from "@pankod/refine-core";
import React from "react";

interface user_Info {
  name: string;
  id: string;
  job: any;
  addresses: any;
}

export const UserCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<user_Info>({
    action: "create",
    resource: "user_info",
    metaData: {
      fields: ["id", "name", { job: ["job_name"] }],
    },
  });

  return (
    <>
      <Form
        {...formProps}
        onFinish={(values) => {
          return (
            formProps.onFinish &&
            formProps.onFinish({
              ...values,
              addresses: {
                data: [
                  { city: "testing1234", pincode: "787767" },
                  { city: "testing343", pincode: "6767" },
                ],
              },
            })
          );
        }}
      >
        <Row>
          <Col span={8}>
            <Form.Item name="name" required>
              <Input placeholder="user Name"></Input>
            </Form.Item>
            <Form.Item name={["job", "data", "job_name"]} required>
              <Input placeholder="job Name"></Input>
            </Form.Item>
            <Form.Item name={"date_of_birth"}>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Button {...saveButtonProps}>save</Button>
      </Form>
    </>
  );
};

export default UserCreate;
