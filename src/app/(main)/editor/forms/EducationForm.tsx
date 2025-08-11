import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu != undefined) || [],
      });
    });
    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="max-w-xl mx-auto space-y-0">
      <div className="my-1.5 text-center">
        <div className="text-2xl font-semibold">Education</div>
        <p className="text-sm text-muted-foreground">
          Add as many work educations as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="my-3">
          {fields.map((field, index) => (
            <EducationItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            ></EducationItem>
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

type EducationItemProps = {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
};

const EducationItem = ({ form, index, number, remove }: EducationItemProps) => {
  return (
    <div className="my-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2 mb-2">
        <span className="font-semibold">Work expriences {index + 1}</span>
        <GripHorizontal className="cursor-grab size-5 text-muted-foreground"></GripHorizontal>
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
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
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="my-4"></div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-4"></div>
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="my-4"></div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};

export default EducationForm;
