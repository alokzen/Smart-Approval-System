import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { ArrowLeft, Upload, X, Plus, Save, Send } from "lucide-react";
import { Badge } from "./ui/badge";

interface CreateRequestProps {
  onNavigate: (screen: string) => void;
  requestId?: string;
}

export function CreateRequest({ onNavigate, requestId }: CreateRequestProps) {
  const [category, setCategory] = useState<"financial" | "non-financial">("financial");
  const [attachments, setAttachments] = useState<string[]>(["Quote_ABC_Technologies.pdf", "Technical_Specification.docx"]);

  const valueBreakup = [
    { seq: 1, item: "Hardware", description: "Servers, Storage", value: 15.00 },
    { seq: 2, item: "Software", description: "Licenses", value: 8.50 },
    { seq: 3, item: "Services", description: "Implementation", value: 2.00 },
  ];

  const totalValue = valueBreakup.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("my-requests")} className="min-h-[44px] min-w-[44px] touch-manipulation shrink-0">
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
            {requestId ? "Edit Approval Request" : "Create Approval Request"}
          </h2>
          <p className="text-gray-500 mt-1">
            Request Number: <span className="font-medium">REQ-2025-00123</span> (Auto-generated)
          </p>
        </div>
      </div>

      {/* Header Information */}
      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Enter the basic information about your approval request</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Approval Title *</Label>
              <Input 
                id="title" 
                placeholder="Enter approval title"
                defaultValue="New Server Infrastructure Setup"
              />
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <RadioGroup value={category} onValueChange={(value: any) => setCategory(value)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="financial" id="financial" />
                  <Label htmlFor="financial" className="font-normal cursor-pointer">Financial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-financial" id="non-financial" />
                  <Label htmlFor="non-financial" className="font-normal cursor-pointer">Non-Financial</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="approval-type">Type of Approval *</Label>
              <Select defaultValue="contract">
                <SelectTrigger id="approval-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract Placement Approval</SelectItem>
                  <SelectItem value="purchase">Purchase Request</SelectItem>
                  <SelectItem value="budget">Budget Approval</SelectItem>
                  <SelectItem value="vendor">Vendor Contract</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Configurable codes as per company's needs</p>
            </div>

            {category === "financial" && (
              <div className="space-y-2">
                <Label htmlFor="total-value">Total Value (Lakhs) *</Label>
                <Input 
                  id="total-value" 
                  type="number"
                  placeholder="0.00"
                  defaultValue="25.50"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor Name</Label>
              <Input 
                id="vendor" 
                placeholder="Enter vendor name"
                defaultValue="ABC Technologies Pvt Ltd"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dept-project">Department / Project *</Label>
              <Select defaultValue="it-cloud">
                <SelectTrigger id="dept-project">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it-cloud">IT Department / Cloud Migration</SelectItem>
                  <SelectItem value="finance-budget">Finance / Budget Planning</SelectItem>
                  <SelectItem value="hr-recruitment">HR / Recruitment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Lakhs)</Label>
              <Input 
                id="budget" 
                type="number"
                placeholder="0.00"
                defaultValue="100.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ytd-spend">YTD Spend (Lakhs)</Label>
              <Input 
                id="ytd-spend" 
                type="number"
                placeholder="0.00"
                defaultValue="45.50"
              />
            </div>

            <div className="space-y-2">
              <Label>Nature of Spend</Label>
              <div className="flex gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sustenance" defaultChecked />
                  <Label htmlFor="sustenance" className="font-normal cursor-pointer text-sm">Sustenance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="growth" />
                  <Label htmlFor="growth" className="font-normal cursor-pointer text-sm">Growth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="improvement" defaultChecked />
                  <Label htmlFor="improvement" className="font-normal cursor-pointer text-sm">Improvement</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background & Need *</Label>
            <Textarea 
              id="background" 
              placeholder="Describe the background and justification for this approval request..."
              rows={4}
              defaultValue="We need to upgrade our server infrastructure to support the growing demands of our cloud migration project. The current servers are reaching end-of-life and need replacement."
            />
          </div>
        </CardContent>
      </Card>

      {/* Value Break-up */}
      {category === "financial" && (
        <Card>
          <CardHeader>
            <CardTitle>Value Break-up</CardTitle>
            <CardDescription>Template defined as per Department</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">SI No</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Value (Lakhs)</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valueBreakup.map((item) => (
                  <TableRow key={item.seq}>
                    <TableCell>{item.seq}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">₹{item.value.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <X className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">₹{totalValue.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="size-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Document Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Document Attachments</CardTitle>
          <CardDescription>Upload supporting documents (PDF, DOC, XLS, PNG, JPG - Max 50MB per file)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 transition-colors cursor-pointer touch-manipulation">
            <Upload className="size-10 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX, PNG, JPG up to 50MB</p>
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              <Label>Attached Files:</Label>
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-blue-100 rounded flex items-center justify-center">
                      <Upload className="size-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{file}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
          <CardDescription>Level of approval defined as per company's DOP Policy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900">DOP Policy Applied</p>
            <p className="text-sm text-blue-700 mt-1">
              Value: ₹25.50 Lakhs requires approval from: D1 → D2 → Final Approver (CIO)
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700">D1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-gray-500">Senior Manager</p>
              </div>
              <Badge variant="outline">Recommender</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700">D2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Bob Johnson</p>
                <p className="text-xs text-gray-500">Director</p>
              </div>
              <Badge variant="outline">Recommender</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-700">FA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Alice Williams</p>
                <p className="text-xs text-gray-500">Chief Information Officer</p>
              </div>
              <Badge variant="default">Final Approver</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-8">
        <Button variant="outline" onClick={() => onNavigate("my-requests")} className="min-h-[44px] touch-manipulation">
          Discard
        </Button>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="min-h-[44px] touch-manipulation">
            <Save className="size-4 mr-2" />
            Save as Draft
          </Button>
          <Button className="min-h-[44px] touch-manipulation">
            <Send className="size-4 mr-2" />
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
