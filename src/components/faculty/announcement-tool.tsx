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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { facultyMarkdownAnnouncement } from "@/ai/flows/faculty-markdown-announcement";
import { Loader2, Sparkles, Clipboard } from "lucide-react";

const announcementSchema = z.object({
  announcementText: z
    .string()
    .min(10, "Announcement text must be at least 10 characters long."),
});

export function AnnouncementTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      announcementText: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof announcementSchema>) => {
    setIsLoading(true);
    setMarkdownText("");
    try {
      const result = await facultyMarkdownAnnouncement({
        announcementText: values.announcementText,
      });
      setMarkdownText(result.markdownText);
      toast({
        title: "Success!",
        description: "Markdown generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate markdown. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownText);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Announcement Input</CardTitle>
          <CardDescription>
            Enter the plain text for your announcement below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="announcementText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Announcement Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., The mid-term exams for CS101 will be held next week..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Markdown
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Markdown Preview</CardTitle>
          <CardDescription>
            The generated markdown version of your announcement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {markdownText && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-8 w-8"
                onClick={copyToClipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            )}
            <div className="prose prose-sm dark:prose-invert bg-secondary/50 rounded-md p-4 min-h-[200px] whitespace-pre-wrap">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : markdownText ? (
                markdownText
              ) : (
                <p className="text-muted-foreground text-center">
                  Your generated markdown will appear here.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
