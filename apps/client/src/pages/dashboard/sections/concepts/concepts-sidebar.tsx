import { ConceptType } from "@domain/concept/concept.schema";
import { ChevronRight } from "lucide-react";
import { NewThought } from "@/components/thought/new-thought";
import { Box, Button, Separator, Typography } from "@/components/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
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
  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarHeader className="flex-shrink-0">
        <NewThought />
      </SidebarHeader>
      <Separator className="flex-shrink-0" />
      <ScrollArea className="flex-1 w-full overflow-hidden">
        <SidebarContent className="flex gap-0 mt-2 w-full select-none">
          {concepts.map((c) => (
            <Collapsible
              className="group/collapsible w-full"
              key={c.id}
              title={c.label}
            >
              <SidebarGroup className="p-0 w-full">
                <SidebarGroupLabel
                  asChild
                  className="group/label max-w-62 text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      className="justify-start hover:bg-transparent active:bg-transparent p-0 w-full min-w-0"
                      variant="link"
                    >
                      <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90 flex-shrink-0" />
                      <Typography
                        className="truncate block w-full text-start min-w-0"
                        title={c.label}
                      >
                        {c.label}
                      </Typography>
                    </Button>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {thoughts.map((t) => (
                        <SidebarMenuItem key={t.id}>
                          <SidebarMenuButton
                            asChild
                            className="w-full max-w-62 group/thought hover:bg-transparent cursor-pointer active:bg-transparent"
                          >
                            <Box className="w-full min-w-0 pl-9">
                              <Typography
                                className="truncate block w-full group-hover/thought:text-foreground transition-all duration-100 group-active/thought:text-accent-foreground min-w-0"
                                title={t.text}
                                variant="muted"
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
    </Sidebar>
  );
};
