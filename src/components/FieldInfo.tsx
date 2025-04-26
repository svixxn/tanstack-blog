import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
    </>
  );
}
