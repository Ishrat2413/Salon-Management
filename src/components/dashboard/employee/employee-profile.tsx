"use client";

import {
  Mail,
  Phone,
  MapPin,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeProfile() {
  return (
    <div className="min-h-screen bg-[#FFF9F8] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* Profile Card */}
        <Card className="border-[#E5D1CC] shadow-sm">
          <CardContent className="p-8">

            {/* Header */}
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-amber-600 text-2xl font-semibold text-white">
                S
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Sarah Johnson
                </h1>
                <p className="font-medium text-gray-500">
                  Hair Braiding Specialist
                </p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">

              {/* Email */}
              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-[#3E5C76]">
                    sarah.j@salon.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-medium text-[#3E5C76]">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium text-[#3E5C76]">
                    Main Street Salon
                  </p>
                </div>
              </div>

              {/* Salon Name */}
              <div className="flex gap-3">
                <Store className="mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">Salon Name</p>
                  <p className="font-medium text-[#3E5C76]">
                    Main Street Salon
                  </p>
                </div>
              </div>

              {/* Salon Location */}
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-400">
                    Salon Location
                  </p>
                  <p className="font-medium text-[#3E5C76]">
                    Main Street Salon
                  </p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card className="border-[#E5D1CC] shadow-sm">
          <CardContent className="p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Specializations
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                "Box Braids",
                "Knotless Braids",
                "Cornrows",
                "Twist Braids",
                "Fulani Braids",
                "Faux Locs",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-pink-50 px-4 py-2 text-sm font-medium text-pink-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <Button className="w-full bg-white text-[#7B6159] hover:bg-gray-50">
          Edit Profile
        </Button>

      </div>
    </div>
  );
}