import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
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
        onFinish={(values: any) => {
          const {
            permanent_address,
            optional_address,
            pincode1,
            pincode2,
            ...rest
          } = values;
          return (
            formProps.onFinish &&
            formProps.onFinish({
              ...rest,
              addresses: {
                data: [
                  { city: permanent_address, pincode: pincode1 },
                  { city: optional_address, pincode: pincode2 },
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

        <Space direction="horizontal">
          <Form.Item name={"permanent_address"}>
            <Input placeholder="permanent address" />
          </Form.Item>
          <Form.Item name={"pincode1"}>
            <Input placeholder="pincode 1" />
          </Form.Item>
        </Space>
        <Row>
          <Space direction="horizontal">
            <Form.Item name={"optional_address"}>
              <Input placeholder="optional address" />
            </Form.Item>
            <Form.Item name={"pincode2"}>
              <Input placeholder="pincode 2" />
            </Form.Item>
          </Space>
        </Row>

        <Button {...saveButtonProps}>save</Button>
      </Form>
    </>
  );
};

export default UserCreate;

// mutation MyMutation($data: [address_insert_input!] = [{city: "testing",pincode:"787767"}, {city: "testing2",pincode:"6767"}]) {
//   insert_user_info(objects: {addresses: {data: $data}, date_of_birth: "7-9-2011", name: "ooooo", job: {data: {job_name: "bbbbb"}}}) {
//     returning {
//       addresses {
//         city
//       }
//       name
//     }
//   }
// }

// mutation MyMutation2($data: job_insert_input = {job_name: "sales"}) {
//   insert_user_info(objects: {name: "test2", job: {data: $data}}) {
//     returning {
//       name
//       job {
//         job_name
//       }
//     }
//   }
// }
