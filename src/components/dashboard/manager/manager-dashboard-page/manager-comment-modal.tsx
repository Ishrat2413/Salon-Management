"use client";

import { useEffect, useState } from "react";

type ManagerCommentModalProps = {
  open: boolean;
  onClose: () => void;
  entryId: string | number;
  title?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSave?: (comment: string) => Promise<void> | void;
};

export function ManagerCommentModal({
  open,
  onClose,
  entryId,
  title = "Add Comment",
  submitLabel = "Submit",
  isSubmitting = false,
  onSave,
}: ManagerCommentModalProps) {
  if (!open) return null;

  return (
    <CommentForm
      onClose={onClose}
      entryId={entryId}
      title={title}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onSave={onSave}
    />
  );
}

function CommentForm({
  onClose,
  entryId,
  title,
  submitLabel,
  isSubmitting,
  onSave,
}: {
  onClose: () => void;
  entryId: string | number;
  title: string;
  submitLabel: string;
  isSubmitting: boolean;
  onSave?: (comment: string) => Promise<void> | void;
}) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [prevEntryId, setPrevEntryId] = useState<string | number>(entryId);

  if (entryId !== prevEntryId) {
    setPrevEntryId(entryId);
    setComment("");
    setError("");
  }

  async function handleSubmit() {
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      setError("A comment is required.");
      return;
    }
    setError("");
    if (onSave) {
      await onSave(trimmedComment);
    }
    onClose();
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50'>
      <div className='w-96 rounded-lg bg-white p-6 shadow-lg mx-3'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'>
            ✕
          </button>
        </div>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (error) setError("");
          }}
          placeholder='Enter your comment here...'
          className={`mb-2 w-full rounded-lg border ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-pink-500'} p-3 focus:outline-none`}
          rows={5}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className='flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100'
            disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            disabled={isSubmitting}
            className='rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-70'>
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
