import type { ThoughtType } from "@domain/thought/thought.entity";
import { ChevronRight } from "lucide-react";
import { Box, Button, HStack, Typography } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fadeOverflow } from "../concepts-sidebar";

export const thoughts = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: new Date("2025-08-28T09:15:30Z"),
    updatedAt: new Date("2025-08-28T09:15:30Z"),
    text: "Just realized that the morning coffee tastes different when you actually pay attention to it instead of rushing through the routine.",
    authorId: "123e4567-e89b-12d3-a456-426614174001",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: new Date("2025-08-29T14:22:15Z"),
    updatedAt: new Date("2025-08-29T14:45:12Z"),
    text: "Why do we call it 'rush hour' when nobody's moving? Traffic paradoxes are everywhere once you start noticing them.",
    authorId: "987fcdeb-51a2-43c7-8def-123456789002",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: new Date("2025-08-30T18:33:45Z"),
    updatedAt: new Date("2025-08-30T18:33:45Z"),
    text: "The best conversations happen when you forget you're having a conversation.",
    authorId: "456789ab-cdef-1234-5678-901234567003",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    createdAt: new Date("2025-08-31T11:07:22Z"),
    updatedAt: new Date("2025-08-31T11:07:22Z"),
    text: "Learning a new skill feels like trying to remember something you never knew. Strange how the brain works.",
    authorId: "789abc12-3def-4567-8901-234567890004",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: new Date("2025-09-01T07:44:18Z"),
    updatedAt: new Date("2025-09-01T08:12:33Z"),
    text: "Books are just dreams that someone else had and decided to write down. What a gift that we can share dreams like that.",
    authorId: "234567ab-cdef-8901-2345-678901234005",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    createdAt: new Date("2025-09-01T13:56:41Z"),
    updatedAt: new Date("2025-09-01T13:56:41Z"),
    text: "The silence between notes is what makes music possible. Maybe the same is true for conversations.",
    authorId: "567890cd-ef12-3456-7890-123456789006",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    createdAt: new Date("2025-09-01T16:29:07Z"),
    updatedAt: new Date("2025-09-01T16:29:07Z"),
    text: "Watched a bird build its nest today. No blueprints, no planning meetings, just instinct and determination. Sometimes I overthink things.",
    authorId: "890123ef-4567-8901-2345-678901234007",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    createdAt: new Date("2025-09-01T20:15:52Z"),
    updatedAt: new Date("2025-09-01T20:15:52Z"),
    text: "Every person you meet is fighting a battle you know nothing about. Kindness costs nothing but means everything.",
    authorId: "123456gh-7890-1234-5678-901234567008",
  },
] as ThoughtType[];

export const RecentThoughts = () => {
  return (
    <Accordion className="h-full" collapsible type="single">
      <AccordionItem className="group/accordion border-0" value="recent">
        <AccordionTrigger asChild className="hover:no-underline">
          <Button
            asChild
            className="border-t group-data-[state=open]/accordion:border-b justify-start p-0 w-full min-w-0 hover:bg-transparent h-[52px]"
            variant="ghost"
          >
            <HStack className="w-full items-center">
              <ChevronRight className="text-accent-foreground transition-transform flex-shrink-0" />
              <Typography
                className="block w-full text-start min-w-0 text-base"
                title="Recent"
              >
                Recent
              </Typography>
            </HStack>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="max-w-full h-48 md:h-64 overflow-hidden pb-0">
          <ScrollArea className="h-full">
            {thoughts.map((t) => (
              <Box
                className="w-full max-w-72 md:max-w-64 min-w-0 p-2 h-8"
                key={t.id}
              >
                <Typography
                  className="truncate block w-full text-primary text-base hover:text-accent-foreground transition-all duration-100 min-w-0 bg-gradient-to-r from-current to-transparent bg-clip-text"
                  style={fadeOverflow}
                  title={t.text}
                >
                  {t.text}
                </Typography>
              </Box>
            ))}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
