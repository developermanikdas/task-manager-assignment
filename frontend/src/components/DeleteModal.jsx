import Modal from "./Modal";
import Button from "./Button";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Task"
    >
      <div className="space-y-6">

        <p className="text-slate-600">
          Are you sure you want to delete this task?
          <br />
          <span className="font-semibold text-red-500">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>

        </div>

      </div>
    </Modal>
  );
}