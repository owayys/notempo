"use client";

import type { ConceptType } from "@domain/concept/concept.entity";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { NewThought } from "@/components/thought/new-thought";
import { Button, HStack, Separator, Typography } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { RecentThoughts } from "./sidebar/recent-thoughts";

interface ConceptsSidebarProps {
  concepts?: ConceptType[];
}

export const fadeOverflow = {
  background: "linear-gradient(to right, currentColor 80%, transparent 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const ConceptsSidebar = ({ concepts }: ConceptsSidebarProps) => {
  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarHeader className="flex-shrink-0">
        <HStack className="w-full justify-center">
          <NewThought />
          <LogoutButton />
        </HStack>
      </SidebarHeader>
      <Separator className="flex-shrink-0" />
      <SidebarContent className="flex gap-0 mt-2 w-full select-none">
        <ScrollArea className="flex-1 w-full overflow-hidden">
          {concepts?.map((c) => (
            <SidebarGroup className="p-0 w-full" key={c.id}>
              <SidebarGroupLabel
                asChild
                className="group/label max-w-72 md:max-w-64 overflow-hidden mx-auto text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm w-full"
              >
                <Button
                  asChild
                  className="justify-start px-4  w-full min-w-0 hover:bg-transparent"
                  variant="ghost"
                >
                  <Link href={`/dashboard/${c.id}`}>
                    <Typography
                      className="block w-full text-start min-w-0 text-base"
                      style={fadeOverflow}
                      title={c.label}
                    >
                      {c.label}
                    </Typography>
                  </Link>
                </Button>
              </SidebarGroupLabel>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-0">
        <RecentThoughts />
      </SidebarFooter>
    </Sidebar>
  );
};
