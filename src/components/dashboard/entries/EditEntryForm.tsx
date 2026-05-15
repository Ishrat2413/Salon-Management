"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useForm } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { salonService } from "@/lib/api/services/salon.service";
import { userService } from "@/lib/api/services/user.service";

const salonEntrySchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  salonId: z.string().min(1, "Salon is required"),
  totalPrice: z.coerce.number().min(0, "Price must be positive"),
  tips: z.coerce.number().min(0, "Tips must be positive"),
  addHair: z.coerce.number().min(0, "Add hair must be positive"),
  notes: z.string().optional(),
  isSplit: z.boolean().default(false),
  splits: z
    .array(
      z.object({
        employeeId: z.string().min(1, "Employee is required"),
        totalPrice: z.coerce.number().min(0),
        tips: z.coerce.number().min(0),
      }),
    )
    .optional(),
});

type SalonEntryFormInput = z.input<typeof salonEntrySchema>;
export type SalonEntryFormValues = z.output<typeof salonEntrySchema>;

interface SalonEntryFormProps {
  initialData?: Partial<SalonEntryFormValues>;
  initialDisplayData?: {
    employeeName?: string;
    salonName?: string;
    splits?: Array<{
      employeeId: string;
      employeeName?: string;
      totalPrice: number;
      tips: number;
    }>;
  };
  onSubmit: (values: SalonEntryFormValues) => void;
  isPending?: boolean;
  title: string;
}

export function EditEntryForm({
  initialData,
  initialDisplayData,
  onSubmit,
  isPending,
  title,
}: SalonEntryFormProps) {
  const [salons, setSalons] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  const form = useForm<SalonEntryFormInput, undefined, SalonEntryFormValues>({
    resolver: zodResolver(salonEntrySchema),
    defaultValues: {
      employeeId: initialData?.employeeId || "",
      salonId: initialData?.salonId || "",
      totalPrice: initialData?.totalPrice || 0,
      tips: initialData?.tips || 0,
      addHair: initialData?.addHair || 0,
      notes: initialData?.notes || "",
      isSplit: initialData?.isSplit || false,
      splits: initialData?.splits || [],
    },
  });

  useEffect(() => {
    form.reset({
      employeeId: initialData?.employeeId || "",
      salonId: initialData?.salonId || "",
      totalPrice: initialData?.totalPrice || 0,
      tips: initialData?.tips || 0,
      addHair: initialData?.addHair || 0,
      notes: initialData?.notes || "",
      isSplit: initialData?.isSplit || false,
      splits: initialData?.splits || [],
    });
  }, [form, initialData]);

  const {
    fields: splitFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "splits",
  });

  const isSplit = useWatch({ control: form.control, name: "isSplit" });
  const watchedTotalPrice = useWatch({
    control: form.control,
    name: "totalPrice",
  });
  const watchedSplits = useWatch({ control: form.control, name: "splits" });
  const selectedEmployeeId = useWatch({
    control: form.control,
    name: "employeeId",
  });
  const selectedSalonId = useWatch({ control: form.control, name: "salonId" });

  const employeeNameById = useMemo(() => {
    return new Map(
      employees.map((employee) => [
        String(employee.id),
        employee.fullName as string,
      ]),
    );
  }, [employees]);

  const salonNameById = useMemo(() => {
    return new Map(
      salons.map((salon) => [String(salon.id), salon.name as string]),
    );
  }, [salons]);

  const selectedEmployeeLabel =
    employeeNameById.get(String(selectedEmployeeId)) ||
    initialDisplayData?.employeeName ||
    "Select an employee";

  const selectedSalonLabel =
    salonNameById.get(String(selectedSalonId)) ||
    initialDisplayData?.salonName ||
    "Select a salon";

  const splitRows = (watchedSplits || []) as Array<{
    employeeId: string;
    totalPrice: number;
    tips: number;
  }>;

  useEffect(() => {
    async function fetchData() {
      const [salonRes, userRes] = await Promise.all([
        salonService.getSalons({ limit: 100 }),
        userService.getUsers({ limit: 100 }),
      ]);
      if (salonRes.success) setSalons(salonRes.data);
      if (userRes.success) setEmployees(userRes.data);
    }
    fetchData();
  }, []);

  return (
    <div className='min-h-screen p-4'>
      <Card className='mx-auto rounded-2xl border border-gray-100 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='employeeId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-11'>
                            <span className='flex-1 text-left text-sm text-foreground'>
                              {selectedEmployeeLabel}
                            </span>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='salonId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salon Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-11'>
                            <span className='flex-1 text-left text-sm text-foreground'>
                              {selectedSalonLabel}
                            </span>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {salons.map((salon) => (
                            <SelectItem key={salon.id} value={salon.id}>
                              {salon.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-4 rounded-xl bg-gray-50 p-4'>
                  <FormField
                    control={form.control}
                    name='totalPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            value={field.value as number | string | undefined}
                            placeholder='$ 0.00'
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='addHair'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-pink-600'>
                          Add Hair?
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            value={field.value as number | string | undefined}
                            placeholder='$ 0.00'
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='tips'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tip (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          value={field.value as number | string | undefined}
                          placeholder='$ 0.00'
                          className='h-11'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='Notes (Optional)'
                        className='min-h-30'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isSplit'
                render={({ field }) => (
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
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />

              {isSplit && (
                <div className='space-y-4 rounded-2xl border border-gray-200 bg-white p-4'>
                  <div className='flex items-center justify-between gap-4'>
                    <div>
                      <h3 className='text-sm font-semibold text-gray-800'>
                        Split Service/Tip among Braiders
                      </h3>
                      <p className='text-xs text-gray-500'>
                        Add or remove braiders and adjust their share here.
                      </p>
                    </div>

                    <Button
                      type='button'
                      variant='ghost'
                      className='gap-1 px-0 text-pink-600 hover:bg-transparent hover:text-pink-700'
                      onClick={() =>
                        append({ employeeId: "", totalPrice: 0, tips: 0 })
                      }>
                      <span className='text-lg'>+</span>
                      Add Braider
                    </Button>
                  </div>

                  <div className='overflow-x-auto rounded-xl border border-gray-200'>
                    <table className='w-full'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'>
                            Braider Name
                          </th>
                          <th className='whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500'>
                            Service $
                          </th>
                          <th className='whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500'>
                            %
                          </th>
                          <th className='whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500'>
                            Tip $
                          </th>
                          <th className='whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500'>
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {splitFields.length > 0 ? (
                          splitFields.map((splitField, index) => {
                            const currentEmployeeId =
                              splitRows[index]?.employeeId || "";
                            const displayName =
                              initialDisplayData?.splits?.find(
                                (split) =>
                                  split.employeeId === currentEmployeeId,
                              )?.employeeName ||
                              employeeNameById.get(String(currentEmployeeId)) ||
                              "Select a braider";

                            return (
                              <tr
                                key={splitField.id}
                                className='border-t border-gray-100'>
                                <td className='px-4 py-3'>
                                  <FormField
                                    control={form.control}
                                    name={`splits.${index}.employeeId`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          value={field.value}
                                          onValueChange={field.onChange}>
                                          <FormControl>
                                            <SelectTrigger className='h-11 w-full border-gray-200 bg-white'>
                                              <span className='flex-1 text-left text-sm text-foreground'>
                                                {employeeNameById.get(
                                                  String(field.value),
                                                ) ||
                                                  initialDisplayData?.splits?.find(
                                                    (split) =>
                                                      split.employeeId ===
                                                      field.value,
                                                  )?.employeeName ||
                                                  displayName}
                                              </span>
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {employees.map((employee) => (
                                              <SelectItem
                                                key={employee.id}
                                                value={employee.id}>
                                                {employee.fullName}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </td>

                                <td className='px-4 py-3'>
                                  <FormField
                                    control={form.control}
                                    name={`splits.${index}.totalPrice`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type='number'
                                            value={
                                              field.value as
                                                | number
                                                | string
                                                | undefined
                                            }
                                            className='h-11'
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </td>

                                <td className='px-4 py-3 text-center'>
                                  {(() => {
                                    const parentTotal = Number(
                                      watchedTotalPrice || 0,
                                    );
                                    const splitValue = Number(
                                      splitRows[index]?.totalPrice || 0,
                                    );
                                    if (!parentTotal) return "-";
                                    const pct =
                                      (splitValue / parentTotal) * 100;
                                    return `${pct.toFixed(1)}%`;
                                  })()}
                                </td>

                                <td className='px-4 py-3'>
                                  <FormField
                                    control={form.control}
                                    name={`splits.${index}.tips`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            type='number'
                                            value={
                                              field.value as
                                                | number
                                                | string
                                                | undefined
                                            }
                                            className='h-11'
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </td>

                                <td className='px-4 py-3 text-right'>
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='h-9 w-9 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500'
                                    onClick={() => remove(index)}>
                                    <Trash2 className='h-4 w-4' />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className='px-6 py-6 text-center text-sm text-gray-500'>
                              No split braiders added yet. Use Add Braider to
                              create one.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className='flex justify-end gap-4 pt-4 '>
                <Button
                  type='button'
                  variant='outline'
                  className='px-8 py-4'
                  onClick={() => window.history.back()}>
                  Cancel
                </Button>

                <Button
                  type='submit'
                  className='bg-pink-600 px-8 hover:bg-pink-700 py-4'
                  disabled={isPending}>
                  {isPending ? "Updating..." : "Update Entry"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
