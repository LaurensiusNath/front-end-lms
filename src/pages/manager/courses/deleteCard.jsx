import React from "react";

export default function DeleteCard(props) {
  const { onDelete, onCancel, isPending, type } = props;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this {`${type}`}?
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onDelete}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
