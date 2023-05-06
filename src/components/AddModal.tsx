import { Button, Modal } from "antd";
import AddUserForm from "./AddUserForm";
import { useState } from "react";

const AddModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOnCandel = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="tableHeader">
        <Button onClick={() => setOpen(true)} type="primary">
          Add
        </Button>
      </header>
      <Modal
        open={open}
        title="Add user"
        footer={null}
        onCancel={handleOnCandel}
      >
        <AddUserForm closeModal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default AddModal;
