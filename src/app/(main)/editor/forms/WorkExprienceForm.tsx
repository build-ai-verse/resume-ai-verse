import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { workExprienceSchema, WorkExprienceValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const WorkExprienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExprienceValues>({
    resolver: zodResolver(workExprienceSchema),
    defaultValues: {
      workExpriences: resumeData.workExpriences || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        workExpriences:
          values.workExpriences?.filter((exp) => exp != undefined) || [],
      });
    });
    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExpriences",
  });

  return (
    <div className="max-w-xl mx-auto space-y-0">
      <div className="my-1.5 text-center">
        <div className="text-2xl font-semibold">Work expriences</div>
        <p className="text-sm text-muted-foreground">
          Add as many work expriences as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="my-3">
          {fields.map((field, index) => (
            <WorkExprienceItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            ></WorkExprienceItem>
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Work Exprience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

type WorkExprienceItemProps = {
  form: UseFormReturn<WorkExprienceValues>;
  index: number;
  remove: (index: number) => void;
};

const WorkExprienceItem = ({ form, index, remove }: WorkExprienceItemProps) => {
  return (
    <div className="my-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2 mb-2">
        <span className="font-semibold">Work expriences {index + 1}</span>
        <GripHorizontal className="cursor-grab size-5 text-muted-foreground"></GripHorizontal>
      </div>
      <FormField
        control={form.control}
        name={`workExpriences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="my-4"></div>
      <FormField
        control={form.control}
        name={`workExpriences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="my-4"></div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExpriences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExpriences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="my-4"></div>
      <FormDescription>
        Leave <span className="semi-bold">end date</span> empty if your are
        currently here
      </FormDescription>
      <div className="my-4"></div>
      <FormField
        control={form.control}
        name={`workExpriences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="my-4"></div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};

export default WorkExprienceForm;
