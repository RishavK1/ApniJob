import React, { useEffect, useState } from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { Eye, MoreHorizontal, Search, Building2 } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-40"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="h-4 bg-gray-200 rounded w-8 ml-auto"></div>
    </td>
  </tr>
);

const EmptyState = ({ message, icon: Icon }) => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-gray-100 rounded-full">
        <Icon className="w-6 h-6 text-gray-500" />
      </div>
    </div>
    <p className="text-gray-500">{message}</p>
  </div>
);

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [filterJobs, setFilterJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);

    const userJobs = allAdminJobs.filter((job) => job.createdBy === user._id);

    if (searchJobByText) {
      const filtered = userJobs.filter(
        (job) =>
          job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(userJobs);
    }
  }, [searchJobByText, allAdminJobs, user]);

  if (loading) {
    return (
      <div className="bg-white  border rounded-3xl shadow-sm overflow-hidden">
        <table className="min-w-full  ">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle empty states
  if (allAdminJobs.filter((job) => job.createdBy === user._id).length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm">
        <EmptyState
          message="You haven't posted any jobs yet"
          icon={Building2}
        />
      </div>
    );
  }

  if (filterJobs.length === 0 && searchJobByText) {
    return (
      <div className="bg-white rounded-3xl shadow-sm">
        <EmptyState message="No jobs found" icon={Search} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-400 shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {job?.company?.logo ? (
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <span className="font-medium">{job?.company?.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{job?.title}</td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-1.5 bg-white shadow-lg rounded-xl border border-gray-200">
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">View Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
