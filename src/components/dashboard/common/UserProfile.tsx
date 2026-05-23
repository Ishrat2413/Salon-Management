"use client";

import {
  useCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/actions/admin/useUsers";
import { useAuth } from "@/components/providers/auth-provider";
import { Edit2, Save } from "lucide-react";
import React, { useState } from "react";

interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export default function UserProfile() {
  const { user, updateCurrentUserInfo } = useAuth();
  const {
    data: currentUserResponse,
    isPending: isCurrentUserPending,
    isFetching: isCurrentUserFetching,
  } = useCurrentUserQuery(Boolean(user));
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const profileUser = currentUserResponse?.data ?? user;
  const createFormData = (source: typeof profileUser): ProfileFormData => ({
    fullName: source?.fullName ?? "",
    phoneNumber: source?.phoneNumber ?? "",
    address: source?.address ?? "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  if (!profileUser) return null;

  const isProfileLoading =
    Boolean(user) &&
    !currentUserResponse?.data &&
    (isCurrentUserPending || isCurrentUserFetching);

  if (isProfileLoading) {
    return (
      <div className='min-h-screen py-12 px-4'>
        <div className='max-w-200 mx-auto'>
          <div className='bg-white rounded-[12px] shadow-sm border border-[#C7B29B] overflow-hidden p-8'>
            <div className='animate-pulse'>
              <div className='flex items-center gap-5'>
                <div className='w-20 h-20 rounded-full bg-[#E8DED4]' />
                <div className='flex-1'>
                  <div className='h-7 w-56 bg-[#E8DED4] rounded mb-3' />
                  <div className='h-4 w-40 bg-[#EFE6DD] rounded' />
                </div>
              </div>
              <div className='mt-9 space-y-5'>
                <div className='h-12 w-full bg-[#F5EEE7] rounded-md' />
                <div className='h-12 w-full bg-[#F5EEE7] rounded-md' />
                <div className='h-12 w-full bg-[#F5EEE7] rounded-md' />
                <div className='h-12 w-full bg-[#F5EEE7] rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: (data) => {
        if (data?.data) {
          updateCurrentUserInfo(data.data);
        } else {
          updateCurrentUserInfo(formData);
        }
        setIsEditing(false);
      },
    });
  };

  const handleStartEditing = () => {
    setFormData(createFormData(profileUser));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(createFormData(profileUser));
    setIsEditing(false);
  };

  const avatarInitial = (isEditing ? formData.fullName : profileUser.fullName)
    .charAt(0)
    .toUpperCase();

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='max-w-200 mx-auto'>
        <div className='bg-white rounded-[12px] shadow-sm border border-[#C7B29B] overflow-hidden'>
          <div className='p-8'>
            {/* Header */}
            <div className='flex items-center gap-5'>
              <div className='w-20 h-20 rounded-full bg-linear-to-br from-[#D23599] to-[#805C3CDB] flex items-center justify-center text-white text-4xl font-semibold shadow-md shrink-0'>
                {avatarInitial || "?"}
              </div>
              <div className='flex-1 min-w-0'>
                {isEditing ? (
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='text-2xl font-bold text-gray-900 border-b-2 outline-none bg-transparent'
                  />
                ) : (
                  <h1 className='text-2xl font-medium text-[#1F1A17]'>
                    {profileUser.fullName}
                  </h1>
                )}
                <p className='text-[#625750] mt-1'>
                  {profileUser.role} ({profileUser.status ?? "Unknown"})
                </p>
              </div>
            </div>

            {/* Fields Grid */}
            <div className='mt-9 grid grid-cols-1 gap-y-6'>
              <DetailField
                label='Email'
                value={profileUser.email}
                isEditing={false}
                readOnly
              />
              <DetailField
                label='Phone'
                name='phoneNumber'
                value={
                  isEditing
                    ? formData.phoneNumber
                    : (profileUser.phoneNumber ?? "")
                }
                placeholder='Add phone number'
                isEditing={isEditing}
                onChange={handleChange}
              />
              <DetailField
                label='Address'
                name='address'
                value={
                  isEditing ? formData.address : (profileUser.address ?? "")
                }
                placeholder='Add address'
                isEditing={isEditing}
                onChange={handleChange}
              />
              <DetailField
                label='Salon Location'
                value={profileUser.salon?.address ?? "N/A"}
                isEditing={false}
                readOnly
              />
              {profileUser.role !== "ADMIN" ? (
                <DetailField
                  label='Commission Rate'
                  value={
                    profileUser.commissionRate
                      ? `${profileUser.commissionRate.rate}%`
                      : "Not Set"
                  }
                  isEditing={false}
                  readOnly
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className='pt-6'>
          {!isEditing ? (
            <button
              onClick={handleStartEditing}
              className='w-full py-3.5 border border-[#7A5A3A] hover:bg-gray-50 rounded-[8px] font-medium text-[#7A5A3A] transition flex items-center justify-center gap-2 cursor-pointer'>
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className='flex gap-3'>
              <button
                onClick={handleCancel}
                className='flex-1 py-3.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-[12px] font-medium text-gray-700 transition cursor-pointer'>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className='flex-1 py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-[12px] font-medium transition flex items-center justify-center gap-2 cursor-pointer'>
                <Save size={18} />
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  name,
  value,
  placeholder = "",
  isEditing = false,
  onChange,
  type = "text",
  readOnly = false,
}: {
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div className='w-full'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full'>
        <div className='sm:w-40 shrink-0'>
          <p className='text-[15px] text-[#898580] mb-0.5'>{label}</p>
        </div>

        <div className='flex-1'>
          <div className='w-full border border-[#C7B29B] rounded-md px-3 py-2 bg-white'>
            {isEditing && !readOnly ? (
              <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className='w-full outline-none text-[15px] text-[#445571] bg-transparent placeholder:text-gray-300'
              />
            ) : (
              <p className='text-sm font-medium text-[#445571] truncate'>
                {value || (
                  <span className='text-gray-300 font-normal italic'>
                    {placeholder}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
