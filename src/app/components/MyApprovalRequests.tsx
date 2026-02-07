import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface MyApprovalRequestsProps {
  onNavigate: (screen: string, requestId?: string) => void;
}

export function MyApprovalRequests({ onNavigate }: MyApprovalRequestsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["draft", "clarification", "progress"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const draftRequests = [
    {
      id: "REQ-2025-00120",
      date: "2025-02-04",
      title: "New Server Setup",
      type: "Contract Placement",
      department: "IT",
      value: "25.50L"
    },
    {
      id: "REQ-2025-00118",
      date: "2025-02-03",
      title: "Software License",
      type: "Purchase",
      department: "IT",
      value: "8.50L"
    }
  ];

  const clarificationRequests = [
    {
      id: "REQ-2025-00115",
      date: "2025-02-02",
      title: "Budget Approval",
      type: "Financial",
      department: "Finance",
      status: "Pending Clarification",
      requestedBy: "John Smith"
    },
    {
      id: "REQ-2025-00112",
      date: "2025-02-01",
      title: "Vendor Contract",
      type: "Contract",
      department: "Operations",
      status: "Pending Clarification",
      requestedBy: "Alice Williams"
    }
  ];

  const inProgressRequests = [
    {
      id: "REQ-2025-00110",
      date: "2025-01-30",
      title: "Contract Placement",
      type: "Contract Placement",
      department: "HR",
      value: "25.50L",
      status: "At Level D2",
      currentApprover: "Bob Johnson"
    },
    {
      id: "REQ-2025-00105",
      date: "2025-01-28",
      title: "Purchase Request",
      type: "Purchase",
      department: "IT",
      value: "12.00L",
      status: "At Final Approval",
      currentApprover: "Jane Smith"
    }
  ];

  const approvedRequests = [
    {
      id: "REQ-2025-00100",
      date: "2025-01-25",
      title: "Equipment Purchase",
      type: "Purchase",
      department: "Operations",
      value: "8.50L",
      approvedDate: "2025-01-27",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Approval Requests</h2>
          <p className="text-gray-500 mt-1">Create and manage your approval requests</p>
        </div>
        <Button onClick={() => onNavigate("create-request")} size="lg" className="min-h-[44px] touch-manipulation shrink-0">
          <Plus className="size-5 mr-2" />
          Create New Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input placeholder="Search by Request #..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Approval Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="non-financial">Non-Financial</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* In-Draft Requests */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("draft")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("draft") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              In-Draft Requests
              <Badge variant="secondary">{draftRequests.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("draft") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {draftRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.department}</TableCell>
                    <TableCell>₹{request.value}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => onNavigate("create-request", request.id)}>
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Pending for Clarifications */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("clarification")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("clarification") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              Pending for Clarifications
              <Badge variant="destructive">{clarificationRequests.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("clarification") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clarificationRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      <Badge variant="warning">{request.status}</Badge>
                    </TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="default">
                          Respond
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        )}
      </Card>

      {/* In Progress Requests */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("progress")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("progress") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              In Progress Requests
              <Badge variant="default">{inProgressRequests.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("progress") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Approver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inProgressRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>₹{request.value}</TableCell>
                    <TableCell>
                      <Badge variant="default">{request.status}</Badge>
                    </TableCell>
                    <TableCell>{request.currentApprover}</TableCell>
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
          </CardContent>
        )}
      </Card>

      {/* Approved Requests */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("approved")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("approved") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              Approved Requests
              <Badge variant="success">{approvedRequests.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("approved") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>₹{request.value}</TableCell>
                    <TableCell>{request.approvedDate}</TableCell>
                    <TableCell>
                      <Badge variant="success">{request.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="size-4" />
                        </Button>
                        <Button size="sm" variant="default">
                          Update Closure
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
