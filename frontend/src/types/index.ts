export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: number;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  APPROVER = 'APPROVER',
  REQUESTER = 'REQUESTER',
  VIEWER = 'VIEWER',
}

export interface Approval {
  id: number;
  title: string;
  description: string;
  type: ApprovalType;
  status: ApprovalStatus;
  amount?: number;
  currency?: string;
  requesterId: number;
  requester?: User;
  approverId?: number;
  approver?: User;
  organizationId: number;
  attachments: DocumentAttachment[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export enum ApprovalType {
  FINANCIAL = 'FINANCIAL',
  NON_FINANCIAL = 'NON_FINANCIAL',
  PROCUREMENT = 'PROCUREMENT',
  LEAVE = 'LEAVE',
  EXPENSE = 'EXPENSE',
  OTHER = 'OTHER',
}

export enum ApprovalStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface DocumentAttachment {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: number;
}

export interface Organization {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

// LLM Types
export interface LLMRequest {
  text: string;
  userId: number;
  organizationId: number;
}

export interface ValueBreakupItem {
  item: string;
  description: string;
  value: number;
}

export interface ExtractedApprovalData {
  title?: string;
  category?: 'FINANCIAL' | 'NON_FINANCIAL';
  approvalType?: string;
  department?: string;
  project?: string | null;
  value?: number | null;
  valueBreakup?: ValueBreakupItem[];
  vendorName?: string | null;
  customerName?: string | null;
  budget?: number | null;
  ytdSpend?: number | null;
  natureOfSpend?: ('SUSTENANCE' | 'GROWTH' | 'IMPROVEMENT')[];
  backgroundNeed?: string;
  confidence?: Record<string, number>;
  extractedFields?: string[];
}

export interface LLMResponse {
  success: boolean;
  data?: ExtractedApprovalData;
  suggestions?: string[];
  warnings?: string[];
  errors?: string[];
  message?: string;
  processingTimeMs?: number;
}
