
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge';

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, ].map((item, index) => (
            <TableRow key={index}>
              <TableCell>20-11-2024</TableCell>
              <TableCell>Full Stack Developer</TableCell>
              <TableCell>Microsoft</TableCell>
              <TableCell className="text-right"><Badge className="bg-black text-white hover:bg-black">Accepted</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable