import React from "react";
import { VStack } from "@/components/ui/layout";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <VStack>{children}</VStack>;
};

export default PublicLayout;
