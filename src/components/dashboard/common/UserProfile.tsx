"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Edit2, Home, Locate, Mail, MapPin, Phone, Save } from "lucide-react";
import React, { useState } from "react";

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  salonName: string;
  salonLocation: string;
}

export default function UserProfile() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData | null>(() => {
    if (user) {
      return {
        name: user.name ?? "Sarah Johnson",
        title: user.title ?? "Hair Braiding Specialist",
        email: user.email ?? "sarah.j@salon.com",
        phone: user.phone ?? "(555) 123-4567",
        location: user.location ?? "Main Street Salon",
        salonName: user.salonName ?? "Main Street Salon",
        salonLocation: user.salonLocation ?? "Main Street Salon",
      };
    }
    return null;
  });
  const [savedData, setSavedData] = useState<ProfileData | null>(() => {
    if (user) {
      return {
        name: user.name ?? "Sarah Johnson",
        title: user.title ?? "Hair Braiding Specialist",
        email: user.email ?? "sarah.j@salon.com",
        phone: user.phone ?? "(555) 123-4567",
        location: user.location ?? "Main Street Salon",
        salonName: user.salonName ?? "Main Street Salon",
        salonLocation: user.salonLocation ?? "Main Street Salon",
      };
    }
    return null;
  });

  if (!user || !formData || !savedData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : prev,
    );
  };

  const handleSave = () => {
    if (formData) setSavedData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='max-w-200 mx-auto'>
        <div className='bg-white rounded-[12px] shadow-sm border border-[#C7B29B] overflow-hidden'>
          <div className='p-8'>
            {/* Header */}
            <div className='flex items-center gap-5'>
              <div className='w-20 h-20 rounded-full bg-linear-to-br from-[#D23599] to-[#805C3CDB] flex items-center justify-center text-white text-4xl font-semibold shadow-md shrink-0'>
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                {isEditing ? (
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='text-2xl font-bold text-gray-900 border-b-2 outline-none bg-transparent'
                  />
                ) : (
                  <h1 className='text-2xl font-medium text-[#1F1A17]'>
                    {formData.name}
                  </h1>
                )}
                {isEditing ? (
                  <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Your title'
                    className='text-[#625750] border-b border-gray-300 focus:border-pink-500 outline-none w-full bg-transparent placeholder:text-gray-300 mt-2'
                  />
                ) : (
                  <p className='text-[#625750] mt-1'>
                    {formData.title || (
                      <span className='text-gray-300 italic'>No title set</span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Fields Grid */}
            <div className='mt-9 grid grid-cols-2 gap-x-8 gap-y-6'>
              <DetailField
                icon={<Mail className='w-6 h-6' />}
                label='Email'
                name='email'
                value={formData.email}
                isEditing={isEditing}
                onChange={handleChange}
                type='email'
              />
              <DetailField
                icon={<Phone className='w-6 h-6' />}
                label='Phone'
                name='phone'
                value={formData.phone}
                placeholder='Add phone number'
                isEditing={isEditing}
                onChange={handleChange}
              />
              <DetailField
                icon={<MapPin className='w-6 h-6' />}
                label='Location'
                name='location'
                value={formData.location}
                placeholder='Add location'
                isEditing={isEditing}
                onChange={handleChange}
              />
              <DetailField
                icon={<Home className='w-6 h-6' />}
                label='Salon Name'
                name='salonName'
                value={formData.salonName}
                placeholder='Add salon name'
                isEditing={isEditing}
                onChange={handleChange}
              />
              <div className='col-span-2'>
                <DetailField
                  icon={<Locate className='w-6 h-6' />}
                  label='Salon Location'
                  name='salonLocation'
                  value={formData.salonLocation}
                  placeholder='Add salon location'
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className='pt-6'>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className='w-full py-3.5 border border-[#7A5A3A] hover:bg-gray-50 rounded-[8px] font-medium text-[#7A5A3A] transition flex items-center justify-center gap-2 cursor-pointer'>
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className='flex gap-3'>
              <button
                onClick={handleCancel}
                className='flex-1 py-3.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-[12px] font-medium text-gray-700 transition'>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='flex-1 py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-[12px] font-medium transition flex items-center justify-center gap-2'>
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailField({
  icon,
  label,
  name,
  value,
  placeholder = "",
  isEditing,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className='flex '>
      <div className='w-12 h-12 flex items-start justify-center text-[#445571] shrink-0 mt-0.5'>
        {icon}
      </div>
      <div className=''>
        <p className='text-[15px] text-[#898580] mb-0.5'>{label}</p>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className='w-full border-b border-gray-300 focus:border-pink-500 outline-none text-[15px] text-#445571] py-0.5 bg-transparent placeholder:text-[#445571] placeholder:font-normal'
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
  );
}
