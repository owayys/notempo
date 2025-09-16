import type { ConceptType } from "@domain/concept/concept.entity";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ConceptCrumbsProps {
  concept?: ConceptType;
}

export const ConceptCrumbs = ({ concept }: ConceptCrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Nexus</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {concept && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
        <BreadcrumbItem>
          <BreadcrumbPage>{concept?.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
