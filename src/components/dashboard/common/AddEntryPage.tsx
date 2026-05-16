"use client";

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
import { useState } from "react";
import { useSalonsQuery } from "@/actions/admin/useSalons";
import { useServicesQuery } from "@/actions/admin/useServices";
import { useUsersQuery } from "@/actions/admin/useUsers";

type InitialData = {
  employee?: string;
  clientName?: string;
  serviceName?: string;
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
  const [clientName, setClientName] = useState<string>(
    initialData?.clientName ?? "",
  );
  const [serviceNameValue, setServiceNameValue] = useState<string | undefined>(
    initialData?.serviceName,
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
  const [addHair, setAddHair] = useState<string>("");
  const [splitService, setSplitService] = useState<boolean>(false);

  const { data: salonsData, isLoading: isLoadingSalons } = useSalonsQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const { data: servicesData, isLoading: isLoadingServices } = useServicesQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const { data: usersData, isLoading: isLoadingUsers } = useUsersQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
    salonId: salonValue,
    enabled: !!salonValue,
  });

  const salons = salonsData?.data || [];
  const services = servicesData?.data || [];
  const employees = usersData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      salonId: salonValue,
      employeeId: employeeValue,
      clientName,
      serviceId: serviceNameValue,
      totalPrice,
      addHair,
      tip: tipValue,
      notes,
      splitService,
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className='min-h-screen p-4'>
      <Card className='mx-auto rounded-2xl border border-gray-100 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            Add New Entry
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-8 overflow-x-auto'>
            {/* Row 1: Salon Name + Client Name */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
              {/* Salon Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Salon Name
                </label>

                <Select
                  value={salonValue}
                  onValueChange={(v) => {
                    setSalonValue(v ?? undefined);
                    setEmployeeValue(undefined); // Reset employee when salon changes
                  }}>
                  <SelectTrigger className='w-full h-11'>
                    <SelectValue
                      placeholder={isLoadingSalons ? "Loading salons..." : "Select a salon"}
                    >
                      {salons.find((s: any) => s.id === salonValue)?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {salons.map((salon: any) => (
                      <SelectItem key={salon.id} value={salon.id}>
                        {salon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Client Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Client Name
                </label>

                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder='Enter client name'
                  className='h-11'
                />
              </div>
            </div>

            {/* Row 2: Service Name + Employee Name */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
              {/* Service Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Service name
                </label>

                <Select
                  value={serviceNameValue}
                  onValueChange={(v) => setServiceNameValue(v ?? undefined)}>
                  <SelectTrigger className='w-full h-11'>
                    <SelectValue placeholder={isLoadingServices ? "Loading services..." : "Select a service"}>
                      {services.find((s: any) => s.id === serviceNameValue)?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {services.map((service: any) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Employee Name */}
              <div className='w-full space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Employee name
                </label>

                <Select
                  value={employeeValue}
                  onValueChange={(v) => setEmployeeValue(v ?? undefined)}
                  disabled={!salonValue}>
                  <SelectTrigger className='w-full h-11'>
                    <SelectValue
                      placeholder={
                        !salonValue
                          ? "Select a salon first"
                          : isLoadingUsers
                          ? "Loading employees..."
                          : "Select an employee"
                      }
                    >
                      {employees.find((e: any) => e.id === employeeValue)?.fullName}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {employees.map((employee: any) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.fullName}
                      </SelectItem>
                    ))}
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

                  <Input
                    value={addHair}
                    onChange={(e) => setAddHair(e.target.value)}
                    placeholder='$ 0.00'
                    className='h-11'
                  />
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

              <Switch
                checked={splitService}
                onCheckedChange={setSplitService}
              />
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
