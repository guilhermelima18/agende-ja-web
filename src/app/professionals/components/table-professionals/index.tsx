import { ProfessionalsProps } from "@/hooks/use-professionals";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { phoneMask } from "@/helpers/masks";

type TableProfessionalsProps = {
  professionals: ProfessionalsProps[];
};

export function TableProfessionals({ professionals }: TableProfessionalsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Profissional</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Telefone/Celular</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {professionals.map((professional) => (
          <TableRow key={professional.id}>
            <TableCell>{professional.name}</TableCell>
            <TableCell>{professional.email}</TableCell>
            <TableCell>{phoneMask(professional.phoneNumber)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
