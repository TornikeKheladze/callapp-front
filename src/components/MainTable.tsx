import { Button, Table, Modal } from "antd";
import { useState } from "react";
import { Store, UserInfo } from "../types/global";
import "../App.css";
import useUserStore from "../store/store";
import AddModal from "./AddModal";
import AddUserForm from "./AddUserForm";
import { Link } from "react-router-dom";

const MainTable: React.FC = () => {
  const { data, deleteUser } = useUserStore((state: Store) => state);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    gender: "",
    address: {
      street: "",
      city: "",
    },
    phone: "",
  });

  const handleDelete = (email: string) => {
    deleteUser(email);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string, record: UserInfo) => (
        <span>
          {record.address.street}, {record.address.city}
        </span>
      ),
    },
    {
      key: "delete",
      render: (text: string, record: UserInfo) => {
        return (
          <Button
            className="delete"
            type="primary"
            onClick={() => {
              setOpenDeleteModal(true);
              setCurrentUser(record);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button style={{ fontSize: "25px" }} type="link">
        <Link to={"/chart"}>Statistics</Link>
      </Button>
      <AddModal />
      <Modal
        open={openDeleteModal}
        onOk={() => {
          handleDelete(currentUser.email);
          setOpenDeleteModal(false);
        }}
        onCancel={() => setOpenDeleteModal(false)}
      >
        <h1>Are you sure to delete {currentUser.name}?</h1>
      </Modal>
      <Modal
        open={openEditModal}
        title="Edit User"
        footer={null}
        onCancel={() => setOpenEditModal(false)}
      >
        <AddUserForm
          defaultValues={currentUser}
          closeModal={() => setOpenEditModal(false)}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => {
              setCurrentUser(record);
              setOpenEditModal(true);
            },
            style: { cursor: "pointer" },
          };
        }}
      />
      ;
    </>
  );
};

export default MainTable;
