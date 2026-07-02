import Modal from "./Modal";
import TaskForm from "./TaskForm";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Task"
    >
      <TaskForm
        submitText="Create Task"
        onSubmit={(data) => {
          onCreate(data);
          onClose();
        }}
      />
    </Modal>
  );
}