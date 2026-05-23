"use client";

import React, { useState } from "react";
import { Lock, KeyRound, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/actions/auth/useAuth";

export default function ChangePasswordForm() {
  const { mutate: changePassword, isPending } = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    changePassword(
      {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setError("");
        },
      }
    );
  };

  return (
    <div className='bg-white rounded-[12px] shadow-sm border border-[#C7B29B] overflow-hidden mt-6'>
      <div className='p-8'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2 bg-pink-50 rounded-lg text-pink-600'>
            <Lock size={20} />
          </div>
          <h2 className='text-xl font-semibold text-gray-900'>Change Password</h2>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <PasswordField
            label='Current Password'
            name='oldPassword'
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder='Enter current password'
          />
          <PasswordField
            label='New Password'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
            placeholder='Minimum 8 characters'
          />
          <PasswordField
            label='Confirm New Password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Repeat new password'
          />

          {error && <p className='text-sm text-red-500 mt-2 ml-1'>{error}</p>}

          <div className='pt-6 flex justify-end'>
            <button
              type='submit'
              disabled={isPending}
              className='h-12 px-10 rounded-xl bg-pink-600 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70'>
              {isPending ? (
                <Loader2 size={18} className='animate-spin' />
              ) : (
                <Save size={18} />
              )}
              {isPending ? "Changing..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full'>
        <div className='sm:w-40 shrink-0'>
          <p className='text-[15px] text-[#898580] mb-0.5'>{label}</p>
        </div>

        <div className='flex-1 relative w-full'>
          <div className='w-full border border-[#C7B29B] rounded-md px-3 py-2 bg-white flex items-center gap-2'>
            <KeyRound size={16} className='text-gray-400' />
            <input
              type={showPassword ? "text" : "password"}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className='flex-1 outline-none text-[15px] text-[#445571] bg-transparent placeholder:text-gray-300'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-gray-400 hover:text-pink-600 transition-colors p-1'>
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
