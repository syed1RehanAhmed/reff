import { Button, Table, useTable } from "@pankod/refine-antd";
import { useDelete, useNavigation } from "@pankod/refine-core";
import React from "react";

interface user_Info {
  name: string;
  id: string;
  job: any;
}

export const List1: React.FC = () => {
  const { tableProps } = useTable<user_Info>({
    resource: "user_info",
    metaData: {
      fields: ["id", "name", { job: ["id", "job_name"] }],
    },
  });
  const { create } = useNavigation();
  const { mutateAsync } = useDelete();
  console.log(tableProps);
  return (
    <>
      <Button onClick={() => create("user_info")}>Create</Button>
      <Table {...tableProps} rowKey="id">
        <Table.Column title="Name" dataIndex={"name"} />
        <Table.Column title="Job Name" dataIndex={["job", "job_name"]} />
        <Table.Column
          title="Edit"
          render={(val, record: any) => {
            console.log(record);

            return (
              <>
                <Button
                  onClick={() =>
                    mutateAsync(
                      {
                        resource: "job",
                        id: record?.job?.id,
                      },

                      {
                        onSuccess() {
                          mutateAsync({
                            resource: "user_info",
                            id: record?.id,
                          });
                        },
                      }
                    )
                  }
                >
                  Delete
                </Button>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

export default List1;
