import { SquareMinus } from "lucide-react";
import { Button } from "@/components/ui";

interface CollapseAllProps {
  onClick?: () => void;
}

export const CollapseAll = ({ onClick }: CollapseAllProps) => {
  return (
    <Button onClick={onClick} variant="link">
      <SquareMinus />
    </Button>
  );
};
