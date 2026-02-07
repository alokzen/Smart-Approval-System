import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FileText, Clock, CheckCircle, XCircle, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Pending Approvals",
      value: "15",
      icon: <Clock className="size-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3 from yesterday",
      trend: "up"
    },
    {
      title: "My Requests",
      value: "8",
      icon: <FileText className="size-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "2 in progress",
      trend: "neutral"
    },
    {
      title: "Approved Today",
      value: "12",
      icon: <CheckCircle className="size-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+4 from yesterday",
      trend: "up"
    },
    {
      title: "Overdue",
      value: "3",
      icon: <AlertCircle className="size-5" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "Needs attention",
      trend: "down"
    }
  ];

  const recentActivity = [
    { 
      id: "REQ-2025-00123", 
      title: "New Server Infrastructure Setup", 
      status: "Approved", 
      date: "2025-02-05",
      value: "25.50L",
      statusColor: "success"
    },
    { 
      id: "REQ-2025-00124", 
      title: "Software License Renewal", 
      status: "Pending", 
      date: "2025-02-04",
      value: "8.50L",
      statusColor: "warning"
    },
    { 
      id: "REQ-2025-00125", 
      title: "Contract Placement Approval", 
      status: "Rejected", 
      date: "2025-02-03",
      value: "15.00L",
      statusColor: "destructive"
    },
    { 
      id: "REQ-2025-00122", 
      title: "Equipment Purchase", 
      status: "In Progress", 
      date: "2025-02-03",
      value: "12.00L",
      statusColor: "default"
    }
  ];

  const pendingApprovals = [
    {
      id: "REQ-2025-00126",
      title: "Budget Approval for Q2",
      requester: "John Doe",
      department: "Finance",
      value: "45.00L",
      daysAgo: "2 days ago"
    },
    {
      id: "REQ-2025-00127",
      title: "Hardware Procurement",
      requester: "Jane Smith",
      department: "IT",
      value: "18.50L",
      daysAgo: "1 day ago"
    },
    {
      id: "REQ-2025-00128",
      title: "Vendor Contract Renewal",
      requester: "Mike Wilson",
      department: "Operations",
      value: "32.00L",
      daysAgo: "5 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest approval requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{activity.id}</p>
                      <Badge variant={activity.statusColor as any}>{activity.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">₹{activity.value} • {activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("my-requests")}
            >
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Requests awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{approval.id}</p>
                        <span className="text-xs text-gray-500">{approval.daysAgo}</span>
                      </div>
                      <p className="text-sm text-gray-900 mt-1 font-medium">{approval.title}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                        <span>{approval.requester}</span>
                        <span>•</span>
                        <span>{approval.department}</span>
                        <span>•</span>
                        <span className="font-semibold">₹{approval.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => onNavigate("my-approvals")}
            >
              Review Approvals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 min-h-[44px] touch-manipulation" onClick={() => onNavigate("my-requests")}>
              <FileText className="size-6" />
              <span className="text-sm">Create Request</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 min-h-[44px] touch-manipulation" onClick={() => onNavigate("my-approvals")}>
              <CheckCircle className="size-6" />
              <span className="text-sm">My Approvals</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 min-h-[44px] touch-manipulation" onClick={() => onNavigate("approval-list")}>
              <FileText className="size-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 min-h-[44px] touch-manipulation" onClick={() => onNavigate("dop-policy")}>
              <TrendingUp className="size-6" />
              <span className="text-sm">Configure DOP</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
