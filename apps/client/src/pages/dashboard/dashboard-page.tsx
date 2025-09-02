import { ConceptType } from "@domain/concept/concept.schema";
import { Separator, VStack } from "@/components/ui";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { ConceptsSection } from "./sections/concepts/concepts-section";
import { WorkspaceSection } from "./sections/workspace/workspace-section";

const concepts = [
  {
    id: "d2f1c9d0-1234-4e57-9c4a-82d2dbb5d991",
    createdAt: new Date("2025-01-02T10:15:00Z"),
    updatedAt: new Date("2025-01-02T10:15:00Z"),
    label: "Luxury Travel Experience",
    authorId: "a1b2c3d4-5678-4e90-ab12-34cd56ef7890",
  },
  {
    id: "9b8e7c6d-4321-4f23-9a87-1234567890ab",
    createdAt: new Date("2025-01-05T14:20:00Z"),
    updatedAt: new Date("2025-01-05T15:45:00Z"),
    label: "Sustainable Villa Stays",
    authorId: "f9e8d7c6-1111-4a22-b333-444455556666",
  },
  {
    id: "3c2d1e0f-9876-4abc-8def-567890abcdef",
    createdAt: new Date("2025-01-07T08:00:00Z"),
    updatedAt: new Date("2025-01-07T08:30:00Z"),
    label: "Private Island Dining",
    authorId: "11223344-5566-7788-99aa-bbccddeeff00",
  },
  {
    id: "abc12345-6789-4def-bc01-23456789abcd",
    createdAt: new Date("2025-01-10T12:10:00Z"),
    updatedAt: new Date("2025-01-10T13:15:00Z"),
    label: "Exclusive Motorsport Package",
    authorId: "22334455-6677-8899-aabb-ccddeeff0011",
  },
  {
    id: "5678abcd-1234-4ef0-9abc-111122223333",
    createdAt: new Date("2025-01-12T09:45:00Z"),
    updatedAt: new Date("2025-01-12T10:00:00Z"),
    label: "Wine & Culinary Tours",
    authorId: "33445566-7788-99aa-bbcc-ddeeff001122",
  },
  {
    id: "7890bcde-4321-4fed-8765-abcdef123456",
    createdAt: new Date("2025-01-15T16:20:00Z"),
    updatedAt: new Date("2025-01-15T16:30:00Z"),
    label: "Art & Culture Retreats",
    authorId: "44556677-8899-aabb-ccdd-eeff00112233",
  },
  {
    id: "1357ace0-2468-4bdf-9ace-02468ace1357",
    createdAt: new Date("2025-01-18T11:00:00Z"),
    updatedAt: new Date("2025-01-18T11:05:00Z"),
    label: "Private Jet Journeys",
    authorId: "55667788-99aa-bbcc-ddee-ff0011223344",
  },
  {
    id: "2468bdf1-1357-4cea-8024-68ace13579bd",
    createdAt: new Date("2025-01-20T18:15:00Z"),
    updatedAt: new Date("2025-01-20T18:25:00Z"),
    label: "Wellness & Spa Escapes",
    authorId: "66778899-aabb-ccdd-eeff-001122334455",
  },
  {
    id: "9999abcd-8888-4777-aaaa-bbbbccccdddd",
    createdAt: new Date("2025-01-22T07:30:00Z"),
    updatedAt: new Date("2025-01-22T08:00:00Z"),
    label: "Gastronomic Adventures",
    authorId: "778899aa-bbcc-ddee-ff00-112233445566",
  },
  {
    id: "ffff1111-2222-4333-aaaa-bbbbccccdddd",
    createdAt: new Date("2025-01-25T19:40:00Z"),
    updatedAt: new Date("2025-01-25T19:55:00Z"),
    label: "Historical Landmark Residencies",
    authorId: "8899aabb-ccdd-eeff-0011-223344556677",
  },
] as ConceptType[];

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <ConceptsSection concepts={concepts} />
      <VStack className="w-full h-screen">
        <DashboardHeader />
        <Separator />
        <WorkspaceSection />
      </VStack>
    </SidebarProvider>
  );
};
