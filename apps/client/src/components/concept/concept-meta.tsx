import { Typography } from "@/components/ui";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export const ConceptMeta = () => {
  return (
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
              Sometime ago
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
              Just now
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
