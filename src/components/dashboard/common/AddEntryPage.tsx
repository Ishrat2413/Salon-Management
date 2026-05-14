"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

type InitialData = {
  employee?: string;
  salon?: string;
  amount?: number | string;
  tip?: number | string;
  notes?: string;
};

const braiders = [
  {
    id: 1,
    name: "Sarah Jenkins",
    service: "$120.00",
    tip: "$15.00",
  },
  {
    id: 2,
    name: "Emma Watson",
    service: "$120.00",
    tip: "$15.00",
  },
];

export default function AddEntryForm({
  initialData,
}: {
  initialData?: InitialData;
}) {
  const [employeeValue, setEmployeeValue] = useState<string | undefined>(
    initialData?.employee,
  );
  const [salonValue, setSalonValue] = useState<string | undefined>(
    initialData?.salon,
  );
  const [totalPrice, setTotalPrice] = useState<string>(
    initialData?.amount ? String(initialData.amount) : "",
  );
  const [tipValue, setTipValue] = useState<string>(
    initialData?.tip ? String(initialData.tip) : "",
  );
  const [notes, setNotes] = useState<string | undefined>(initialData?.notes);

  return (
    <div className='min-h-screen p-4'>
      <Card className='mx-auto rounded-2xl border border-gray-100 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            Add New Entry
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className='space-y-8 overflow-x-auto'>
            {/* Primary Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
              {/* Employee Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Employee name
                </label>

                <Select
                  value={employeeValue}
                  onValueChange={(v) => setEmployeeValue(v ?? undefined)}>
                  <SelectTrigger className='w-full h-11'>
                    <SelectValue
                      placeholder={employeeValue || "Select an employee"}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='Sarah Jenkins'>Sarah Jenkins</SelectItem>
                    <SelectItem value='Emma Watson'>Emma Watson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salon Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Salon Name
                </label>

                <Select
                  value={salonValue}
                  onValueChange={(v) => setSalonValue(v ?? undefined)}>
                  <SelectTrigger className='w-full h-11'>
                    <SelectValue placeholder={salonValue || "Select a salon"} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='salon-1'>Salon 1</SelectItem>
                    <SelectItem value='salon-2'>Salon 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing + Tip */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Pricing Box */}
              <div className='space-y-4 rounded-xl bg-gray-50 p-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-gray-700'>
                    Total price
                  </label>

                  <Input
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    placeholder='$ 0.00'
                    className='h-11'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-pink-600'>
                    Add Hair?
                  </label>

                  <Input placeholder='$ 0.00' className='h-11' />
                </div>
              </div>

              {/* Tip */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Tip (Optional)
                </label>

                <Input
                  value={tipValue}
                  onChange={(e) => setTipValue(e.target.value)}
                  placeholder='$ 0.00'
                  className='h-11'
                />
              </div>
            </div>

            {/* Notes */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>
                Notes (Optional)
              </label>

              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Notes (Optional)'
                className='min-h-30'
              />
            </div>

            {/* Split Service Toggle */}
            <div className='flex items-center justify-between rounded-xl bg-gray-50 p-4'>
              <div>
                <h3 className='font-semibold text-gray-800'>
                  Split Service/Tip among Braiders?
                </h3>

                <p className='text-xs text-gray-400'>
                  Enable this to distribute earnings across multiple team
                  members.
                </p>
              </div>

              <Switch />
            </div>

            {/* Braider Table */}
            <div className='overflow-x-auto rounded-2xl border border-gray-200 bg-white'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'>
                      Braider Name
                    </th>

                    <th className='whitespace-nowrap px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500'>
                      Service $
                    </th>

                    <th className='whitespace-nowrap px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500'>
                      Tip $
                    </th>

                    <th className='whitespace-nowrap px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {braiders.map((braider) => (
                    <tr
                      key={braider.id}
                      className='border-t border-gray-100 transition-colors hover:bg-gray-50/70'>
                      <td className='px-6 py-4'>
                        <Select>
                          <SelectTrigger className='h-11 w-full border-gray-200 bg-white'>
                            <SelectValue placeholder={braider.name} />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value='sarah'>Sarah Jenkins</SelectItem>
                            <SelectItem value='emma'>Emma Watson</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>

                      <td className='px-6 py-4 text-center'>
                        <span className='font-medium text-gray-700'>
                          {braider.service}
                        </span>
                      </td>

                      <td className='px-6 py-4 text-center'>
                        <span className='font-medium text-gray-700'>
                          {braider.tip}
                        </span>
                      </td>

                      <td className='px-6 py-4 text-right'>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='h-9 w-9 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Braider */}
            <div>
              <Button
                type='button'
                variant='ghost'
                className='gap-1 px-0 text-pink-600 hover:bg-transparent hover:text-pink-700'>
                <span className='text-lg'>+</span>
                Add Braider
              </Button>
            </div>

            {/* Actions */}
            <div className='flex justify-end gap-4 pt-4'>
              <Button type='button' variant='outline' className='px-8'>
                Cancel
              </Button>

              <Button
                type='submit'
                className='bg-pink-600 px-8 hover:bg-pink-700'>
                Save Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
