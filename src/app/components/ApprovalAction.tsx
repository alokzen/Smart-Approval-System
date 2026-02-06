import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowLeft, Download, CheckCircle, XCircle, RotateCcw, MessageSquare } from "lucide-react";
import { Separator } from "./ui/separator";

interface ApprovalActionProps {
  onNavigate: (screen: string) => void;
  requestId?: string;
}

export function ApprovalAction({ onNavigate, requestId = "REQ-2025-00110" }: ApprovalActionProps) {
  const [action, setAction] = useState<string>("");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("my-approvals")} className="min-h-[44px] min-w-[44px] touch-manipulation shrink-0">
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Approval Action - {requestId}</h2>
          <p className="text-gray-500 mt-1">Review and take action on this approval request</p>
        </div>
      </div>

      {/* Request Details */}
      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Request Number</Label>
              <p className="font-medium mt-1">{requestId}</p>
            </div>
            <div>
              <Label className="text-gray-600">Status</Label>
              <div className="mt-1">
                <Badge variant="warning">PENDING</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Title</Label>
              <p className="font-medium mt-1">New Server Infrastructure Setup</p>
            </div>
            <div>
              <Label className="text-gray-600">Requester</Label>
              <p className="font-medium mt-1">John Doe, IT Manager</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Department / Project</Label>
              <p className="font-medium mt-1">IT / Cloud Migration</p>
            </div>
            <div>
              <Label className="text-gray-600">Approval Type</Label>
              <p className="font-medium mt-1">Contract Placement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Value</Label>
              <p className="font-medium mt-1 text-lg">₹25.50 Lakhs</p>
            </div>
            <div>
              <Label className="text-gray-600">Request Date</Label>
              <p className="font-medium mt-1">January 30, 2025</p>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-gray-600">Background & Need</Label>
            <p className="mt-2 text-gray-700 leading-relaxed">
              We need to upgrade our server infrastructure to support the growing demands of our cloud migration project. 
              The current servers are reaching end-of-life and need replacement. This investment will ensure business 
              continuity and support our digital transformation initiatives.
            </p>
          </div>

          <div>
            <Label className="text-gray-600">Value Break-up</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Value (Lakhs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 text-sm">Hardware</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Servers, Storage</td>
                    <td className="px-4 py-2 text-sm text-right">₹15.00</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Software</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Licenses</td>
                    <td className="px-4 py-2 text-sm text-right">₹8.50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Services</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Implementation</td>
                    <td className="px-4 py-2 text-sm text-right">₹2.00</td>
                  </tr>
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm" colSpan={2}>Total</td>
                    <td className="px-4 py-2 text-sm text-right">₹25.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Workflow History */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow History</CardTitle>
          <CardDescription>Track the approval progress through different levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level D1 - Approved */}
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Level D1: Jane Smith</p>
                  <p className="text-sm text-gray-600">Senior Manager</p>
                </div>
                <Badge variant="success">APPROVED</Badge>
              </div>
              <div className="mt-2 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Approved on:</span> January 31, 2025
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Comments:</span> "Looks good, proceeding to next level. All documentation is in order."
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Level D2 - Current */}
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 ring-4 ring-blue-200">
              <span className="text-sm font-bold text-blue-700">D2</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Level D2: Bob Johnson (Current)</p>
                  <p className="text-sm text-gray-600">Director</p>
                </div>
                <Badge variant="warning">PENDING</Badge>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border-2 border-blue-300">
                <p className="text-sm text-blue-700 font-medium">
                  ⏰ Awaiting your action since 5 days
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Level - Awaiting */}
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gray-500">FA</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Final Level: Alice Williams</p>
                  <p className="text-sm text-gray-600">Chief Information Officer</p>
                </div>
                <Badge variant="secondary">AWAITING</Badge>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  Will be notified after Level D2 approval
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Document Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">PDF</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Quote_ABC_Technologies.pdf</p>
                  <p className="text-xs text-gray-500">2.4 MB</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">DOC</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Technical_Specification.docx</p>
                  <p className="text-xs text-gray-500">1.8 MB</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Action */}
      <Card className="border-2 border-blue-500">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-900">Your Action (Level D2)</CardTitle>
          <CardDescription>Choose your action and provide comments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <Label>Select Action *</Label>
            <RadioGroup value={action} onValueChange={setAction}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all min-h-[44px] touch-manipulation ${
                    action === "approve" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setAction("approve")}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="approve" id="approve" />
                    <Label htmlFor="approve" className="cursor-pointer flex items-center gap-2">
                      <CheckCircle className="size-5 text-green-600" />
                      <span>Approve</span>
                    </Label>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all min-h-[44px] touch-manipulation ${
                    action === "reject" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-300"
                  }`}
                  onClick={() => setAction("reject")}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="reject" id="reject" />
                    <Label htmlFor="reject" className="cursor-pointer flex items-center gap-2">
                      <XCircle className="size-5 text-red-600" />
                      <span>Reject</span>
                    </Label>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all min-h-[44px] touch-manipulation ${
                    action === "return" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
                  }`}
                  onClick={() => setAction("return")}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="return" id="return" />
                    <Label htmlFor="return" className="cursor-pointer flex items-center gap-2">
                      <RotateCcw className="size-5 text-orange-600" />
                      <span>Return</span>
                    </Label>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all min-h-[44px] touch-manipulation ${
                    action === "clarify" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setAction("clarify")}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="clarify" id="clarify" />
                    <Label htmlFor="clarify" className="cursor-pointer flex items-center gap-2">
                      <MessageSquare className="size-5 text-blue-600" />
                      <span>Clarify</span>
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {action === "reject" && (
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason Code *</Label>
              <Select>
                <SelectTrigger id="rejection-reason">
                  <SelectValue placeholder="Select reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget constraints</SelectItem>
                  <SelectItem value="incomplete">Incomplete documentation</SelectItem>
                  <SelectItem value="policy">Policy violation</SelectItem>
                  <SelectItem value="alternative">Alternative solution available</SelectItem>
                  <SelectItem value="timing">Timing not appropriate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="comments">Comments *</Label>
            <Textarea 
              id="comments" 
              placeholder="Enter your comments here..."
              rows={4}
            />
            <p className="text-xs text-gray-500">Comments are mandatory for all actions</p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onNavigate("my-approvals")} className="min-h-[44px] touch-manipulation">
              Cancel
            </Button>
            <Button size="lg" disabled={!action} className="min-h-[44px] touch-manipulation">
              Submit Action
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
