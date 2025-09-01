import { ChevronRight } from "lucide-react";
import { NewThought } from "@/components/thought/new-thought";
import { Button, Separator } from "@/components/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const ConceptsSection = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <NewThought />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    className="justify-start hover:bg-transparent active:bg-transparent"
                    variant="link"
                  >
                    <ChevronRight />
                    Yo
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
