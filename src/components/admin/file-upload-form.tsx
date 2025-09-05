"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";

const years = ["2023-24", "2022-23", "2021-22"];
const departments = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];

const fileUploadSchema = z.object({
  year: z.string({ required_error: "Please select a year." }),
  department: z.string({ required_error: "Please select a department." }),
  resultsFile: z
    .any()
    .refine((files) => files?.length == 1, "File is required.")
    .refine(
      (files) => files?.[0]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Only .xlsx files are accepted."
    ),
});

export function FileUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
  });

  const onSubmit = async (values: z.infer<typeof fileUploadSchema>) => {
    setIsLoading(true);
    // Simulate API call for file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Upload Successful!",
      description: `Results for ${values.department} ${values.year} have been uploaded.`,
    });
    
    form.reset({
      year: undefined,
      department: undefined,
      resultsFile: undefined,
    });
    // In a real app, you would clear the file input differently.
    // For this example, we rely on the form.reset() which works for controlled components.
    const fileInput = document.getElementById('resultsFile') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = '';
    }
    
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results Upload</CardTitle>
        <CardDescription>
          Select the academic year, department, and the results file (.xlsx).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an academic year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map(dep => (
                            <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="resultsFile"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Results File</FormLabel>
                    <FormControl>
                        <Input 
                            id="resultsFile"
                            type="file" 
                            accept=".xlsx"
                            onChange={(e) => field.onChange(e.target.files)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="mr-2 h-4 w-4" />
              )}
              Upload File
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
