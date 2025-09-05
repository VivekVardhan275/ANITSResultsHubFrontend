//Faculty markdown announcement flow

'use server';

/**
 * @fileOverview A faculty markdown announcement AI agent.
 *
 * - facultyMarkdownAnnouncement - A function that handles the markdown announcement process.
 * - FacultyMarkdownAnnouncementInput - The input type for the facultyMarkdownAnnouncement function.
 * - FacultyMarkdownAnnouncementOutput - The return type for the facultyMarkdownAnnouncement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FacultyMarkdownAnnouncementInputSchema = z.object({
  announcementText: z
    .string()
    .describe('The announcement text to be converted to markdown format.'),
});
export type FacultyMarkdownAnnouncementInput = z.infer<typeof FacultyMarkdownAnnouncementInputSchema>;

const FacultyMarkdownAnnouncementOutputSchema = z.object({
  markdownText: z
    .string()
    .describe('The announcement text converted to markdown format.'),
});
export type FacultyMarkdownAnnouncementOutput = z.infer<typeof FacultyMarkdownAnnouncementOutputSchema>;

export async function facultyMarkdownAnnouncement(
  input: FacultyMarkdownAnnouncementInput
): Promise<FacultyMarkdownAnnouncementOutput> {
  return facultyMarkdownAnnouncementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'facultyMarkdownAnnouncementPrompt',
  input: {schema: FacultyMarkdownAnnouncementInputSchema},
  output: {schema: FacultyMarkdownAnnouncementOutputSchema},
  prompt: `You are an expert at converting plain text announcements into markdown format.

  Convert the following announcement text into markdown format so that it is easily readable by students:

  Announcement Text: {{{announcementText}}} `,
});

const facultyMarkdownAnnouncementFlow = ai.defineFlow(
  {
    name: 'facultyMarkdownAnnouncementFlow',
    inputSchema: FacultyMarkdownAnnouncementInputSchema,
    outputSchema: FacultyMarkdownAnnouncementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
