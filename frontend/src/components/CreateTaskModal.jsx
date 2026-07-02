import Modal from "./Modal";
import TaskForm from "./TaskForm";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
  creating,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task">
      <TaskForm
        submitText={creating ? "Creating..." : "Create Task"}
        loading={creating}
        onSubmit={(data) => {
          onCreate(data);
        }}
      />
    </Modal>
  );
}
