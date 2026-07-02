import Modal from "./Modal";
import TaskForm from "./TaskForm";

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
  onSave,
  saving,
}) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <TaskForm
        initialData={task}
        submitText={saving ? "Saving..." : "Save Changes"}
        loading={saving}
        onSubmit={(data) => {
          onSave(data);
        }}
      />
    </Modal>
  );
}
