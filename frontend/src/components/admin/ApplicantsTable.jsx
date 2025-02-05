import React from "react";
import { MoreHorizontal, FileText, Phone, Mail, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="h-12 w-full animate-pulse bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const ApplicantsTable = ({ applications, isLoading, onStatusChange }) => {
  if (isLoading) return <TableSkeleton />;

  const getStatusBadge = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.Pending;
  };

  return (
    <div className="rounded-xl border bg-white shadow">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">
              <User className="inline mr-2" size={16} />
              Applicant
            </TableHead>
            <TableHead className="font-semibold">
              <Mail className="inline mr-2" size={16} />
              Contact
            </TableHead>
            <TableHead className="font-semibold">
              <FileText className="inline mr-2" size={16} />
              Resume
            </TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((item) => (
            <TableRow key={item._id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{item?.applicant?.fullname}</span>
                  <span className="text-sm text-gray-500">
                    Applied on{" "}
                    {new Date(item?.applicant?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {item?.applicant?.email}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Phone size={14} />
                    {item?.applicant?.phonenumber}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(item?.applicant?.profile?.resume, "_blank")
                    }
                  >
                    <FileText className="mr-2 rounded-xl" size={14} />
                    View Resume
                  </Button>
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status || "Pending"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-0 bg-white">
                    <div className="flex flex-col ">
                      <Button
                        variant="ghost"
                        className="justify-start rounded-none hover:bg-green-50 hover:text-green-600"
                        onClick={() => onStatusChange("Accepted", item._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start rounded-none hover:bg-red-50 hover:text-red-600"
                        onClick={() => onStatusChange("Rejected", item._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
