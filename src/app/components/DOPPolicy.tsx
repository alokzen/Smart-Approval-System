import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
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
import { Plus, Edit, Trash2, Save, X, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function DOPPolicy() {
  const [isAddingNew, setIsAddingNew] = useState(false);

  const policies = [
    {
      id: 1,
      department: "IT",
      project: "All Projects",
      approvalType: "Contract Placement",
      valueFrom: 0,
      valueTo: 5,
      approvalLevel: "Divisional Manager",
      status: "Active",
      validFrom: "2025-01-01",
      validUpto: "2025-12-31"
    },
    {
      id: 2,
      department: "IT",
      project: "All Projects",
      approvalType: "Contract Placement",
      valueFrom: 5.01,
      valueTo: 25,
      approvalLevel: "Chief Information Officer",
      status: "Active",
      validFrom: "2025-01-01",
      validUpto: "2025-12-31"
    },
    {
      id: 3,
      department: "IT",
      project: "All Projects",
      approvalType: "Contract Placement",
      valueFrom: 25.01,
      valueTo: 100,
      approvalLevel: "Managing Director",
      status: "Active",
      validFrom: "2025-01-01",
      validUpto: "2025-12-31"
    },
    {
      id: 4,
      department: "Finance",
      project: "All Projects",
      approvalType: "Budget Approval",
      valueFrom: 0,
      valueTo: 10,
      approvalLevel: "Finance Manager",
      status: "Active",
      validFrom: "2025-01-01",
      validUpto: "2025-12-31"
    },
    {
      id: 5,
      department: "Finance",
      project: "All Projects",
      approvalType: "Budget Approval",
      valueFrom: 10.01,
      valueTo: 50,
      approvalLevel: "Chief Financial Officer",
      status: "Active",
      validFrom: "2025-01-01",
      validUpto: "2025-12-31"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configure Delegation of Power Policy</h2>
          <p className="text-gray-500 mt-1">Define approval authority levels based on value ranges</p>
        </div>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="size-5 mr-2" />
              Add New Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New DOP Policy</DialogTitle>
              <DialogDescription>
                Create a new delegation of power policy for financial approvals
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valid-from">Valid From Date *</Label>
                  <Input id="valid-from" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valid-upto">Valid Upto Date *</Label>
                  <Input id="valid-upto" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Department</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Select>
                    <SelectTrigger id="project">
                      <SelectValue placeholder="All Projects (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="cloud">Cloud Migration</SelectItem>
                      <SelectItem value="budget">Budget Planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approval-type">Approval Type (Financial) *</Label>
                <Select>
                  <SelectTrigger id="approval-type">
                    <SelectValue placeholder="Select approval type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contract">Contract Placement</SelectItem>
                    <SelectItem value="purchase">Purchase Request</SelectItem>
                    <SelectItem value="budget">Budget Approval</SelectItem>
                    <SelectItem value="vendor">Vendor Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value-from">Value From (Lakhs) *</Label>
                  <Input id="value-from" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value-to">Value To (Lakhs) *</Label>
                  <Input id="value-to" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approval-level">Final Approval by Level *</Label>
                <Select>
                  <SelectTrigger id="approval-level">
                    <SelectValue placeholder="Select approval level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="divisional">Divisional Manager</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="cio">Chief Information Officer</SelectItem>
                    <SelectItem value="cfo">Chief Financial Officer</SelectItem>
                    <SelectItem value="md">Managing Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingNew(false)}>
                  <Save className="size-4 mr-2" />
                  Save Policy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Valid From Date</Label>
              <div className="relative">
                <Input type="date" defaultValue="2025-01-01" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Valid Upto Date</Label>
              <div className="relative">
                <Input type="date" defaultValue="2025-12-31" />
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
                  <SelectItem value="contract">Contract Placement</SelectItem>
                  <SelectItem value="budget">Budget Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button>Apply Filters</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>

      {/* DOP Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active DOP Policies</CardTitle>
          <CardDescription>Current delegation of power policies for financial approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Department</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Approval Type</TableHead>
                  <TableHead>Value Range (Lakhs)</TableHead>
                  <TableHead>Final Approval Level</TableHead>
                  <TableHead>Valid Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium">{policy.department}</TableCell>
                    <TableCell>{policy.project}</TableCell>
                    <TableCell>{policy.approvalType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">₹{policy.valueFrom}</Badge>
                        <span className="text-gray-400">to</span>
                        <Badge variant="outline">₹{policy.valueTo}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{policy.approvalLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{policy.validFrom}</div>
                        <div className="text-gray-500">to {policy.validUpto}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">{policy.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="size-4" />
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
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">ℹ️</span>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-blue-900">Important Notes:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>DOP policies apply only to Financial approval types</li>
                <li>Value ranges must not overlap for same Department/Project/Approval Type combination</li>
                <li>Only one policy can be active for same conditions at a time</li>
                <li>Policies must have valid date ranges</li>
                <li>Deactivated policies cannot be used for new requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
