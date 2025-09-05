"use client";

import { ConceptType } from "@domain/concept/concept.schema";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "@/components/auth/logout-button";
import { CollapseAll } from "@/components/concept/collapse-all";
import { NewThought } from "@/components/thought/new-thought";
import { Box, Button, HStack, Separator, Typography } from "@/components/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { thoughts } from "./concept-history";

interface ConceptsSidebarProps {
  concepts: ConceptType[];
}

export const ConceptsSidebar = ({ concepts }: ConceptsSidebarProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string, open: boolean) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (open) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const collapseAll = () => setOpenItems(new Set());

  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarHeader className="flex-shrink-0">
        <HStack className="w-full justify-center">
          <NewThought />
          <CollapseAll onClick={collapseAll} />
        </HStack>
      </SidebarHeader>
      <Separator className="flex-shrink-0" />
      <ScrollArea className="flex-1 w-full overflow-hidden">
        <SidebarContent className="flex gap-0 mt-2 w-full select-none">
          {concepts.map((c) => (
            <Collapsible
              className="group/collapsible w-full"
              key={c.id}
              onOpenChange={(open) => toggleItem(c.id, open)}
              open={openItems.has(c.id)}
              title={c.label}
            >
              <SidebarGroup className="p-0 w-full">
                <SidebarGroupLabel
                  asChild
                  className="group/label max-w-72 md:max-w-64 overflow-hidden mx-auto text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      className="justify-start p-0 w-full min-w-0 hover:bg-transparent"
                      variant="ghost"
                    >
                      <ChevronRight className="text-accent-foreground transition-transform group-data-[state=open]/collapsible:rotate-90 flex-shrink-0" />
                      <Typography
                        className="block w-full text-start min-w-0 text-base"
                        style={{
                          background:
                            "linear-gradient(to right, currentColor 90%, transparent 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        title={c.label}
                      >
                        {c.label}
                      </Typography>
                    </Button>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="gap-0">
                      {thoughts.map((t) => (
                        <SidebarMenuItem key={t.id}>
                          <SidebarMenuButton
                            asChild
                            className="w-full max-w-70 md:max-w-62 group/thought hover:bg-transparent cursor-pointer active:bg-transparent"
                          >
                            <Box className="w-full min-w-0 pl-10 h-8">
                              <Box className="absolute left-4.75 top-0 bottom-0 w-px h-full my-auto bg-accent-foreground opacity-50 group-hover/thought:bg-accent-foreground group-hover/thought:w-0.5 group-hover/thought:opacity-75 group-hover/thought:rounded transition-all duration-100" />
                              <Typography
                                className="truncate block w-full text-primary group-hover/thought:text-accent-foreground transition-all duration-100 min-w-0 bg-gradient-to-r from-current to-transparent bg-clip-text"
                                style={{
                                  background:
                                    "linear-gradient(to right, currentColor 90%, transparent 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                                title={t.text}
                              >
                                {t.text}
                              </Typography>
                            </Box>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter>
        <HStack>
          <LogoutButton />
        </HStack>
      </SidebarFooter>
    </Sidebar>
  );
};
