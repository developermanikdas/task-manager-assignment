import Modal from "./Modal";
import TaskForm from "./TaskForm";

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
  onSave,
}) {
  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Task"
    >
      <TaskForm
        initialData={task}
        submitText="Save Changes"
        onSubmit={(data) => {
          onSave(data);
          onClose();
        }}
      />
    </Modal>
  );
}