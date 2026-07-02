import { useEffect, useState } from "react";
import Button from "./Button";

export default function TaskForm({
  initialData,
  onSubmit,
  submitText = "Save",
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

useEffect(() => {
  setForm({
    title: initialData?.title || "",
    description: initialData?.description || "",
  });
}, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      title: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        {submitText}
      </Button>
    </form>
  );
}