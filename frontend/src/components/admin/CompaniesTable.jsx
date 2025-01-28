import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of recent registered companies </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar>
              <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg" />
            </Avatar>
          </TableCell>
          <TableCell>Freepik</TableCell>
          <TableCell>12-02-2024</TableCell>
                  <TableCell className="text-right cursor-pointer">
                      <Popover>
                          <PopoverTrigger><MoreHorizontal></MoreHorizontal></PopoverTrigger>
                          <PopoverContent className="w-32">
                              <div className="flex items-center gap-2 w-fit cursor-pointer">
                                  <Edit2 className="w-4"></Edit2>
                                  <span>Edit</span>
                              </div>
                          </PopoverContent>
                      </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
