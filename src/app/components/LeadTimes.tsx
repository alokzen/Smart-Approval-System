import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Download, Printer, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

export function LeadTimes() {
  const departmentData = [
    { name: "IT Department", avgDays: 10.2, percentage: 100 },
    { name: "Finance", avgDays: 8.5, percentage: 83 },
    { name: "HR", avgDays: 6.3, percentage: 62 },
    { name: "Operations", avgDays: 8.8, percentage: 86 }
  ];

  const stageData = [
    { stage: "Stage D1 (Recommendation)", avgDays: 3.2, percentage: 38 },
    { stage: "Stage D2 (Recommendation)", avgDays: 4.1, percentage: 48 },
    { stage: "Final Approval", avgDays: 1.2, percentage: 14 }
  ];

  const monthlyTrend = [
    { month: "Jan", days: 9.2 },
    { month: "Feb", days: 8.8 },
    { month: "Mar", days: 9.5 },
    { month: "Apr", days: 8.2 },
    { month: "May", days: 7.8 },
    { month: "Jun", days: 8.5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Approval Lead Times Report</h2>
          <p className="text-gray-500 mt-1">Analytics on approval processing times</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="min-h-[44px] touch-manipulation">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="min-h-[44px] touch-manipulation">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Period</Label>
              <Select defaultValue="3months">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last 1 Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last 1 Year</SelectItem>
                </SelectContent>
              </Select>
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
                </SelectContent>
              </Select>
            </div>
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
          </div>
          <Button className="mt-4">Generate Report</Button>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Approval Time</p>
                <p className="text-3xl font-bold mt-2">8.5 days</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <TrendingDown className="size-4" />
                  <span className="text-sm font-medium">-5% from last period</span>
                </div>
              </div>
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SLA Compliance</p>
                <p className="text-3xl font-bold mt-2">85%</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <TrendingUp className="size-4" />
                  <span className="text-sm font-medium">+3% from last period</span>
                </div>
              </div>
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Approvals</p>
                <p className="text-3xl font-bold mt-2">450</p>
                <div className="flex items-center gap-1 mt-2 text-blue-600">
                  <TrendingUp className="size-4" />
                  <span className="text-sm font-medium">+12% from last period</span>
                </div>
              </div>
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">450</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Average Approval Time by Department */}
      <Card>
        <CardHeader>
          <CardTitle>Average Approval Time by Department</CardTitle>
          <CardDescription>Processing time across different departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-gray-600">{dept.avgDays} days</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      dept.avgDays > 9 
                        ? "bg-red-500" 
                        : dept.avgDays > 8 
                        ? "bg-orange-500" 
                        : "bg-green-500"
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Spent at Each Stage */}
        <Card>
          <CardHeader>
            <CardTitle>Time Spent at Each Stage</CardTitle>
            <CardDescription>Average days per approval stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <Badge variant="outline">{stage.avgDays} days</Badge>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Total Average Time</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">8.5 days</p>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis (Last 6 Months)</CardTitle>
            <CardDescription>Monthly average approval times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyTrend.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-700">{data.month}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(data.days / 12) * 100}%` }}
                      >
                        <span className="text-xs font-medium text-white">{data.days}</span>
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <div className="w-16 flex items-center justify-end">
                      {data.days < monthlyTrend[index - 1].days ? (
                        <Badge variant="success" className="text-xs">
                          <TrendingDown className="size-3 mr-1" />
                          {((monthlyTrend[index - 1].days - data.days) / monthlyTrend[index - 1].days * 100).toFixed(0)}%
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          <TrendingUp className="size-3 mr-1" />
                          {((data.days - monthlyTrend[index - 1].days) / monthlyTrend[index - 1].days * 100).toFixed(0)}%
                        </Badge>
                      )}
                    </div>
                  )}
                  {index === 0 && <div className="w-16"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottleneck Analysis */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-900">Bottleneck Analysis</CardTitle>
          <CardDescription className="text-orange-700">Areas requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-white">1</span>
              </div>
              <div>
                <p className="font-medium text-orange-900">Stage D2 has highest average time (4.1 days)</p>
                <p className="text-sm text-orange-700 mt-1">Consider adding additional approvers or automating certain checks at this level</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <div>
                <p className="font-medium text-orange-900">IT Department shows 20% above average</p>
                <p className="text-sm text-orange-700 mt-1">High volume of requests may require process optimization or resource allocation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-white">3</span>
              </div>
              <div>
                <p className="font-medium text-orange-900">Contract Placement approvals take longest</p>
                <p className="text-sm text-orange-700 mt-1">Review DOP thresholds and approval requirements for this category</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
