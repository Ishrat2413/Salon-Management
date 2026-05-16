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
import { useCreateSalonEntryMutation } from "@/actions/salon-entry/useSalonEntry";
import { toast } from "sonner";

type InitialData = {
  employee?: string;
  clientName?: string;
  serviceName?: string;
  salon?: string;
  amount?: number | string;
  tip?: number | string;
  notes?: string;
};

type SplitEntry = {
  id: string;
  employeeId: string;
  totalPrice: string;
  tips: string;
};

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
  const [splits, setSplits] = useState<SplitEntry[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: salonsData, isLoading: isLoadingSalons } = useSalonsQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
  });

  const { data: servicesData, isLoading: isLoadingServices } = useServicesQuery(
    {
      page: 1,
      limit: 100,
      searchTerm: "",
    },
  );

  const { data: usersData, isLoading: isLoadingUsers } = useUsersQuery({
    page: 1,
    limit: 100,
    searchTerm: "",
    salonId: salonValue,
    enabled: !!salonValue,
  });

  const { mutate: createEntry, isPending } = useCreateSalonEntryMutation();

  const salons = salonsData?.data || [];
  const services = servicesData?.data || [];
  const employees = usersData?.data || [];

  const handleAddBraider = () => {
    setSplits([
      ...splits,
      { id: Date.now().toString(), employeeId: "", totalPrice: "", tips: "" },
    ]);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!salonValue) newErrors.salon = "Salon is required";
    if (!employeeValue) newErrors.employee = "Employee is required";
    if (!serviceNameValue) newErrors.service = "Service is required";
    if (!totalPrice) newErrors.totalPrice = "Total price is required";

    const basePrice = Number(totalPrice) || 0;
    const hairPrice = Number(addHair) || 0;
    const mainTip = Number(tipValue) || 0;
    const finalTotalPrice = basePrice + hairPrice;

    if (splitService) {
      const totalSplitsPrice = splits.reduce(
        (sum, s) => sum + (Number(s.totalPrice) || 0),
        0,
      );
      const totalSplitsTips = splits.reduce(
        (sum, s) => sum + (Number(s.tips) || 0),
        0,
      );

      if (totalSplitsPrice > finalTotalPrice) {
        newErrors.splitsPrice = `Sum of splits ($${totalSplitsPrice}) exceeds total ($${finalTotalPrice})`;
      }

      if (totalSplitsTips > mainTip) {
        newErrors.splitsTips = `Sum of split tips ($${totalSplitsTips}) exceeds main tip ($${mainTip})`;
      }

      splits.forEach((s, i) => {
        if (!s.employeeId) newErrors[`splitEmployee_${i}`] = "Required";
        if (!s.totalPrice) newErrors[`splitPrice_${i}`] = "Required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const basePrice = Number(totalPrice) || 0;
    const hairPrice = Number(addHair) || 0;
    const mainTip = Number(tipValue) || 0;
    const finalTotalPrice = basePrice + hairPrice;

    const formattedSplits = splits.map((s) => ({
      employeeId: s.employeeId,
      totalPrice: Number(s.totalPrice) || 0,
      tips: s.tips ? Number(s.tips) : undefined,
    }));

    const payload = {
      salonId: salonValue,
      employeeId: employeeValue,
      serviceId: serviceNameValue,
      clientName: clientName || undefined,
      totalPrice: finalTotalPrice,
      tips: mainTip || undefined,
      addHair: hairPrice || undefined,
      notes: notes || undefined,
      isSplit: splitService,
      splits: splitService ? formattedSplits : [],
    };

    createEntry(payload);
  };

  const inputClasses =
    "h-11 rounded-lg border-gray-200 focus:ring-pink-500 focus:border-pink-500 px-3";
  const labelClasses = "text-sm font-semibold text-gray-700 mb-1 block";
  const errorClasses = "text-xs text-red-500 mt-1";

  return (
    <div className='min-h-screen p-4 bg-gray-50/30'>
      <Card className='mx-auto p-8 rounded-3xl border-0 shadow-xl shadow-gray-200/50 bg-white'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-3xl font-bold text-gray-900'>
            Add New Entry
          </CardTitle>
          <p className='text-gray-500 text-sm'>
            Fill in the details for the new salon service entry.
          </p>
        </CardHeader>

        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit} className='space-y-10'>
            {/* Section 1: Basic Info */}
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Salon Name */}
                <div className='w-full'>
                  <label className={labelClasses}>Salon Name</label>
                  <Select
                    value={salonValue}
                    onValueChange={(v) => {
                      setSalonValue(v ?? undefined);
                      setEmployeeValue(undefined);
                      setErrors((prev) => ({ ...prev, salon: "" }));
                    }}>
                    <SelectTrigger className={inputClasses + " w-full px-3"}>
                      <SelectValue
                        placeholder={
                          isLoadingSalons
                            ? "Loading salons..."
                            : "Select a salon"
                        }>
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
                  {errors.salon && (
                    <p className={errorClasses}>{errors.salon}</p>
                  )}
                </div>

                {/* Employee Name */}
                <div className='w-full'>
                  <label className={labelClasses}>Employee name</label>
                  <Select
                    value={employeeValue}
                    onValueChange={(v) => {
                      setEmployeeValue(v ?? undefined);
                      setErrors((prev) => ({ ...prev, employee: "" }));
                    }}
                    disabled={!salonValue}>
                    <SelectTrigger className={inputClasses + " w-full px-3"}>
                      <SelectValue
                        placeholder={
                          !salonValue
                            ? "Select a salon first"
                            : isLoadingUsers
                              ? "Loading employees..."
                              : "Select an employee"
                        }>
                        {
                          employees.find((e: any) => e.id === employeeValue)
                            ?.fullName
                        }
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
                  {errors.employee && (
                    <p className={errorClasses}>{errors.employee}</p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Service Name */}
                <div className='w-full'>
                  <label className={labelClasses}>Service name</label>
                  <Select
                    value={serviceNameValue}
                    onValueChange={(v) => {
                      setServiceNameValue(v ?? undefined);
                      setErrors((prev) => ({ ...prev, service: "" }));
                    }}>
                    <SelectTrigger className={inputClasses + " w-full px-3"}>
                      <SelectValue
                        placeholder={
                          isLoadingServices
                            ? "Loading services..."
                            : "Select a service"
                        }>
                        {
                          services.find((s: any) => s.id === serviceNameValue)
                            ?.name
                        }
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
                  {errors.service && (
                    <p className={errorClasses}>{errors.service}</p>
                  )}
                </div>

                {/* Client Name */}
                <div className='w-full'>
                  <label className={labelClasses}>Client Name</label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder='Enter client name'
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Pricing */}
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Total Price */}
                <div className='space-y-2'>
                  <label className={labelClasses}>Total price</label>
                  <Input
                    value={totalPrice}
                    onChange={(e) => {
                      setTotalPrice(e.target.value);
                      setErrors((prev) => ({ ...prev, totalPrice: "" }));
                    }}
                    placeholder='$ 0.00'
                    type='number'
                    min='0'
                    className={inputClasses}
                  />
                  {errors.totalPrice && (
                    <p className={errorClasses}>{errors.totalPrice}</p>
                  )}
                </div>

                {/* Add Hair */}
                <div className='space-y-2'>
                  <label className={labelClasses + " text-pink-600"}>
                    Add Hair?
                  </label>
                  <Input
                    value={addHair}
                    onChange={(e) => setAddHair(e.target.value)}
                    placeholder='$ 0.00'
                    type='number'
                    min='0'
                    className={inputClasses}
                  />
                </div>

                {/* Tip */}
                <div className='space-y-2'>
                  <label className={labelClasses}>Tip (Optional)</label>
                  <Input
                    value={tipValue}
                    onChange={(e) => setTipValue(e.target.value)}
                    placeholder='$ 0.00'
                    type='number'
                    min='0'
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className='space-y-2'>
              <label className={labelClasses}>Notes (Optional)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Add any additional notes here...'
                className='min-h-24 rounded-xl border-gray-200 focus:ring-pink-500 focus:border-pink-500 px-3 py-2'
              />
            </div>

            {/* Split Service Section */}
            <div className='space-y-6 pt-4'>
              <div className='flex items-center justify-between p-1'>
                <div>
                  <h3 className='text-lg font-bold text-gray-900'>
                    Split Service/Tip among Braiders?
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Enable this to distribute earnings across multiple team
                    members.
                  </p>
                </div>
                <Switch
                  checked={splitService}
                  onCheckedChange={setSplitService}
                />
              </div>

              {splitService && (
                <div className='space-y-6 animate-in fade-in slide-in-from-top-4 duration-300'>
                  <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white'>
                    <table className='w-full'>
                      <thead className='bg-gray-50/50'>
                        <tr>
                          <th className='px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500'>
                            Braider Name
                          </th>
                          <th className='px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 w-40'>
                            Service $
                          </th>
                          <th className='px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 w-40'>
                            Tip $
                          </th>
                          <th className='px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500 w-20'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-50'>
                        {splits.map((split, index) => (
                          <tr
                            key={split.id}
                            className='hover:bg-gray-50/30 transition-colors'>
                            <td className='px-6 py-4'>
                              <Select
                                value={split.employeeId}
                                onValueChange={(val) => {
                                  const newSplits = [...splits];
                                  newSplits[index].employeeId = val;
                                  setSplits(newSplits);
                                  setErrors((prev) => ({
                                    ...prev,
                                    [`splitEmployee_${index}`]: "",
                                  }));
                                }}>
                                <SelectTrigger
                                  className={inputClasses + " w-full bg-white"}>
                                  <SelectValue placeholder='Select Employee'>
                                    {
                                      employees.find(
                                        (e: any) => e.id === split.employeeId,
                                      )?.fullName
                                    }
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {employees.map((employee: any) => (
                                    <SelectItem
                                      key={employee.id}
                                      value={employee.id}>
                                      {employee.fullName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors[`splitEmployee_${index}`] && (
                                <p className={errorClasses}>
                                  {errors[`splitEmployee_${index}`]}
                                </p>
                              )}
                            </td>
                            <td className='px-6 py-4'>
                              <Input
                                value={split.totalPrice}
                                onChange={(e) => {
                                  const newSplits = [...splits];
                                  newSplits[index].totalPrice = e.target.value;
                                  setSplits(newSplits);
                                  setErrors((prev) => ({
                                    ...prev,
                                    [`splitPrice_${index}`]: "",
                                    splitsPrice: "",
                                  }));
                                }}
                                placeholder='0.00'
                                type='number'
                                min='0'
                                className={inputClasses + " bg-white"}
                              />
                              {errors[`splitPrice_${index}`] && (
                                <p className={errorClasses}>
                                  {errors[`splitPrice_${index}`]}
                                </p>
                              )}
                            </td>
                            <td className='px-6 py-4'>
                              <Input
                                value={split.tips}
                                onChange={(e) => {
                                  const newSplits = [...splits];
                                  newSplits[index].tips = e.target.value;
                                  setSplits(newSplits);
                                  setErrors((prev) => ({
                                    ...prev,
                                    splitsTips: "",
                                  }));
                                }}
                                placeholder='0.00'
                                type='number'
                                min='0'
                                className={inputClasses + " bg-white"}
                              />
                            </td>
                            <td className='px-6 py-4 text-right'>
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  setSplits(
                                    splits.filter((_, i) => i !== index),
                                  )
                                }
                                className='h-10 w-10 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors'>
                                <Trash2 className='h-5 w-5' />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {splits.length === 0 && (
                      <div className='py-12 text-center text-gray-400 bg-white'>
                        No braiders added. Use the button below to start
                        splitting.
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleAddBraider}
                      className='w-fit h-11 px-6 rounded-xl border-dashed border-2 border-gray-200 text-pink-600 hover:border-pink-500 hover:bg-pink-50/30 transition-all'>
                      <span className='text-xl mr-2'>+</span>
                      Add Braider to Split
                    </Button>
                    {errors.splitsPrice && (
                      <p className={errorClasses}>{errors.splitsPrice}</p>
                    )}
                    {errors.splitsTips && (
                      <p className={errorClasses}>{errors.splitsTips}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className='flex items-center justify-end gap-4 pt-8 border-t border-gray-100'>
              <Button
                type='button'
                variant='ghost'
                className='h-12 px-8 rounded-xl text-gray-500 hover:bg-gray-100'>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isPending}
                className='h-12 px-10 rounded-xl bg-pink-600 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 active:scale-95 transition-all'>
                {isPending ? "Saving Entry..." : "Save Entry"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
