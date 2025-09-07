import type { ConceptType } from "@domain/concept/concept.entity";
import { Typography } from "@/components/ui";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getRelativeTime } from "@/shared/utils/format-date";

interface ConceptMetaProps {
  concept?: ConceptType;
}

export const ConceptMeta = ({ concept }: ConceptMetaProps) => {
  return (
    concept && (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-48">
              <Typography className="text-primary" variant="h6">
                epoch
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className="font-normal" variant="h6">
                {getRelativeTime(concept?.createdAt)} ago
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-48">
              <Typography className="text-primary" variant="h6">
                updated
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className="font-normal" variant="h6">
                {getRelativeTime(concept?.updatedAt)} ago
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  );
};
