"use client";

import { useState } from "react";

type ManagerCommentModalProps = {
  open: boolean;
  onClose: () => void;
  entryId: number;
};

export function ManagerCommentModal({
  open,
  onClose,
  entryId,
}: ManagerCommentModalProps) {
  if (!open) return null;

  return <CommentForm onClose={onClose} entryId={entryId} />;
}

function CommentForm({
  onClose,
  entryId,
}: {
  onClose: () => void;
  entryId: number;
}) {
  const [comment, setComment] = useState("");

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50'>
      <div className='w-96 rounded-lg bg-white p-6 shadow-lg mx-3'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>Add Comment</h3>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'>
            ✕
          </button>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Enter your comment here...'
          className='mb-4 w-full rounded-lg border border-gray-300 p-3 focus:border-pink-500 focus:outline-none'
          rows={5}
        />
        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100'>
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              console.log("Comment saved:", { entryId, comment });
              onClose();
            }}
            className='rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
