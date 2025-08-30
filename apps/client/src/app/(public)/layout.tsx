import { VStack } from "@/components/ui/layout";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack className="w-screen h-screen justify-center items-center">
      {children}
    </VStack>
  );
};

export default PublicLayout;
