import {
  Button,
  Col,
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
  job: { job_name: string };
}

export const UserCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<user_Info>({
    action: "create",
    resource: "user_info",
  });

  return (
    <>
      <Form {...formProps}>
        <Row>
          <Col span={8}>
            <Form.Item name="name" required>
              <Input placeholder="user Name"></Input>
            </Form.Item>
            <Form.Item name={["job", "job_name"]} required>
              <Input placeholder="job Name"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Button {...saveButtonProps}>save</Button>
      </Form>
    </>
  );
};

export default UserCreate;
