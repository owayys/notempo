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
                  className="group/label max-w-68 md:max-w-60 overflow-hidden mx-auto text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      className="justify-start p-0 w-full min-w-0"
                      variant="ghost"
                    >
                      <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90 flex-shrink-0" />
                      <Typography
                        className="block w-full text-start min-w-0"
                        style={{
                          background:
                            "linear-gradient(to right, currentColor 90%, transparent 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        title={c.label}
                        variant="muted"
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
                            className="w-full max-w-70 md:max-w-62 group/thought hover:bg-transparent cursor-pointer active:bg-transparent"
                          >
                            <Box className="w-full min-w-0 pl-12">
                              <Box className="absolute left-7 top-0 bottom-0 w-px h-2/3 my-auto bg-muted-foreground opacity-50 group-hover/thought:bg-accent-foreground group-hover/thought:w-0.5 transition-all duration-100" />
                              <Typography
                                className="truncate block w-full group-hover/thought:text-primary transition-all duration-100 min-w-0 bg-gradient-to-r from-current to-transparent bg-clip-text"
                                style={{
                                  background:
                                    "linear-gradient(to right, currentColor 90%, transparent 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
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
