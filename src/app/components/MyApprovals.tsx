import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Eye, Clock, AlertCircle, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MyApprovalsProps {
  onNavigate: (screen: string, requestId?: string) => void;
}

export function MyApprovals({ onNavigate }: MyApprovalsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["pending", "clarifications"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const pendingApprovals = [
    {
      id: "REQ-2025-00110",
      date: "2025-01-30",
      requester: "John Doe",
      title: "Contract Placement",
      department: "IT",
      project: "Cloud Migration",
      value: "25.50L",
      daysAgo: 5,
      priority: "high"
    },
    {
      id: "REQ-2025-00108",
      date: "2025-01-29",
      requester: "Mary Brown",
      title: "Purchase Request",
      department: "Finance",
      project: "Budget Planning",
      value: "15.00L",
      daysAgo: 6,
      priority: "medium"
    },
    {
      id: "REQ-2025-00106",
      date: "2025-01-28",
      requester: "Alice Wilson",
      title: "Equipment Purchase",
      department: "Operations",
      project: "Facility Upgrade",
      value: "8.50L",
      daysAgo: 7,
      priority: "low"
    }
  ];

  const clarificationsSought = [
    {
      id: "REQ-2025-00105",
      date: "2025-01-28",
      requester: "Kevin Wilson",
      title: "Budget Approval",
      department: "Finance",
      status: "Pending Clarification",
      clarificationDate: "2025-01-30"
    },
    {
      id: "REQ-2025-00102",
      date: "2025-01-25",
      requester: "Sarah Johnson",
      title: "Vendor Contract",
      department: "Operations",
      status: "Pending Clarification",
      clarificationDate: "2025-01-29"
    }
  ];

  const approvedHistory = [
    {
      id: "REQ-2025-00100",
      date: "2025-01-25",
      requester: "Michael Chen",
      title: "Software License Renewal",
      value: "12.00L",
      approvedDate: "2025-01-27"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Approvals</h2>
          <p className="text-gray-500 mt-1">Review and approve pending requests</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold mt-2">{pendingApprovals.length}</p>
              </div>
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clarifications Sought</p>
                <p className="text-3xl font-bold mt-2">{clarificationsSought.length}</p>
              </div>
              <div className="size-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="size-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved This Week</p>
                <p className="text-3xl font-bold mt-2">{approvedHistory.length}</p>
              </div>
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending for Approval */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("pending")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("pending") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              Pending for Approval
              <Badge variant="destructive">{pendingApprovals.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("pending") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department/Project</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id} className={approval.daysAgo > 5 ? "bg-orange-50" : ""}>
                    <TableCell className="font-medium">{approval.id}</TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>{approval.requester}</TableCell>
                    <TableCell>{approval.title}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{approval.department}</div>
                        <div className="text-gray-500">{approval.project}</div>
                      </div>
                    </TableCell>
                    <TableCell>₹{approval.value}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {approval.daysAgo > 5 && <AlertCircle className="size-4 text-orange-500" />}
                        <span className={approval.daysAgo > 5 ? "text-orange-600 font-medium" : ""}>
                          {approval.daysAgo} days
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          approval.priority === "high" 
                            ? "destructive" 
                            : approval.priority === "medium" 
                            ? "warning" 
                            : "secondary"
                        }
                      >
                        {approval.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => onNavigate("approval-action", approval.id)}>
                          Review
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

      {/* Clarifications Sought */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("clarifications")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("clarifications") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              Clarifications Sought
              <Badge variant="warning">{clarificationsSought.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("clarifications") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Clarification Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clarificationsSought.map((clarification) => (
                  <TableRow key={clarification.id}>
                    <TableCell className="font-medium">{clarification.id}</TableCell>
                    <TableCell>{clarification.date}</TableCell>
                    <TableCell>{clarification.requester}</TableCell>
                    <TableCell>{clarification.title}</TableCell>
                    <TableCell>{clarification.department}</TableCell>
                    <TableCell>
                      <Badge variant="warning">{clarification.status}</Badge>
                    </TableCell>
                    <TableCell>{clarification.clarificationDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => onNavigate("approval-action", clarification.id)}>
                          View
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

      {/* Approval History */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSection("history")}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {expandedSections.includes("history") ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              Approval History
              <Badge variant="secondary">{approvedHistory.length}</Badge>
            </CardTitle>
          </div>
        </CardHeader>
        {expandedSections.includes("history") && (
          <CardContent>
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedHistory.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">{approval.id}</TableCell>
                    <TableCell>{approval.date}</TableCell>
                    <TableCell>{approval.requester}</TableCell>
                    <TableCell>{approval.title}</TableCell>
                    <TableCell>₹{approval.value}</TableCell>
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
          </CardContent>
        )}
      </Card>
    </div>
  );
}
