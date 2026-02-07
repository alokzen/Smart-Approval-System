import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Download, Printer, Eye, Calendar } from "lucide-react";

export function ApprovalList() {
  const approvals = [
    {
      id: "REQ-2025-00123",
      date: "2025-02-05",
      requester: "John Doe",
      department: "IT",
      project: "Cloud Migration",
      type: "Contract Placement",
      value: "25.50L",
      status: "Approved",
      currentApprover: "Alice Williams",
      daysInSystem: 5,
      approvedDate: "2025-02-05"
    },
    {
      id: "REQ-2025-00124",
      date: "2025-02-04",
      requester: "Jane Smith",
      department: "Finance",
      project: "Budget Planning",
      type: "Budget Approval",
      value: "45.00L",
      status: "Pending",
      currentApprover: "Bob Johnson",
      daysInSystem: 6,
      approvedDate: "-"
    },
    {
      id: "REQ-2025-00125",
      date: "2025-02-03",
      requester: "Mike Wilson",
      department: "Operations",
      project: "Facility Upgrade",
      type: "Purchase Request",
      value: "18.50L",
      status: "Rejected",
      currentApprover: "Sarah Chen",
      daysInSystem: 7,
      approvedDate: "-"
    },
    {
      id: "REQ-2025-00122",
      date: "2025-02-03",
      requester: "Mary Brown",
      department: "HR",
      project: "Recruitment",
      type: "Non-Financial",
      value: "-",
      status: "In Progress",
      currentApprover: "David Lee",
      daysInSystem: 7,
      approvedDate: "-"
    },
    {
      id: "REQ-2025-00120",
      date: "2025-02-02",
      requester: "Kevin Davis",
      department: "IT",
      project: "Infrastructure",
      type: "Equipment Purchase",
      value: "12.00L",
      status: "Approved",
      currentApprover: "Alice Williams",
      daysInSystem: 8,
      approvedDate: "2025-02-04"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge variant="success">{status}</Badge>;
      case "Pending":
        return <Badge variant="warning">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      case "In Progress":
        return <Badge variant="default">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Approval List Report</h2>
          <p className="text-gray-500 mt-1">View and export all approval requests</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="size-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date From</Label>
              <div className="relative">
                <Input type="date" defaultValue="2025-01-01" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date To</Label>
              <div className="relative">
                <Input type="date" defaultValue="2025-02-05" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Project</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="cloud">Cloud Migration</SelectItem>
                  <SelectItem value="budget">Budget Planning</SelectItem>
                  <SelectItem value="recruitment">Recruitment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Approval Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="non-financial">Non-Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Requester</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Search requester..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Approver</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Search approver..." className="pl-10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Value Range (Lakhs)</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="From" defaultValue="0" />
                <span className="text-gray-500">to</span>
                <Input type="number" placeholder="To" defaultValue="100" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button>
              <Search className="size-4 mr-2" />
              Search
            </Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Results: {approvals.length} approvals found</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Dept/Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Approver</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">{approval.id}</TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>{approval.requester}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{approval.department}</div>
                        <div className="text-gray-500">{approval.project}</div>
                      </div>
                    </TableCell>
                    <TableCell>{approval.type}</TableCell>
                    <TableCell>{approval.value !== "-" ? `₹${approval.value}` : "-"}</TableCell>
                    <TableCell>{getStatusBadge(approval.status)}</TableCell>
                    <TableCell>{approval.currentApprover}</TableCell>
                    <TableCell>{approval.daysInSystem}</TableCell>
                    <TableCell>{approval.approvedDate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        <Eye className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
            <p className="text-sm text-gray-600">
              Showing 1 to {approvals.length} of {approvals.length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Page 1 of 1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Download className="size-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900">Export Options</p>
              <p className="text-sm text-blue-700 mt-1">Download this report in various formats</p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="outline" className="bg-white min-h-[44px] touch-manipulation">
                Excel
              </Button>
              <Button variant="outline" className="bg-white min-h-[44px] touch-manipulation">
                PDF
              </Button>
              <Button variant="outline" className="bg-white min-h-[44px] touch-manipulation">
                CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
