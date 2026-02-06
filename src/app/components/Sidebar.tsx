import { 
  Settings, 
  FileText, 
  Database, 
  Users, 
  ClipboardList, 
  CheckSquare, 
  BarChart3, 
  Clock,
  FolderTree,
  Building2,
  Shield,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  userRole: "admin" | "approver" | "requester" | "viewer";
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

export function Sidebar({ activeScreen, onNavigate, userRole }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["admin", "applications", "reports"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const adminMenu: MenuItem[] = [
    {
      id: "admin",
      label: "Admin Functions",
      icon: <Settings className="size-5" />,
      children: [
        { id: "dop-policy", label: "Configure DOP Policy", icon: <Shield className="size-4" /> },
        { id: "approval-types", label: "Create Approval Types", icon: <FileText className="size-4" /> },
        { id: "master-data", label: "Maintain Master Data", icon: <Database className="size-4" />,
          children: [
            { id: "departments", label: "Departments & Cost Centers", icon: <Building2 className="size-4" /> },
            { id: "projects", label: "Define Projects", icon: <FolderTree className="size-4" /> },
            { id: "approvers", label: "Maintain Approvers", icon: <Users className="size-4" /> },
            { id: "authorizations", label: "User Authorizations", icon: <Shield className="size-4" /> },
          ]
        },
      ]
    }
  ];

  const applicationsMenu: MenuItem[] = [
    {
      id: "applications",
      label: "Applications",
      icon: <ClipboardList className="size-5" />,
      children: [
        { id: "my-requests", label: "My Approval Requests", icon: <FileText className="size-4" /> },
        { id: "my-approvals", label: "My Approvals", icon: <CheckSquare className="size-4" /> },
      ]
    }
  ];

  const reportsMenu: MenuItem[] = [
    {
      id: "reports",
      label: "MIS & Reports",
      icon: <BarChart3 className="size-5" />,
      children: [
        { id: "approval-list", label: "Approval List", icon: <ClipboardList className="size-4" /> },
        { id: "lead-times", label: "Approval Lead Times", icon: <Clock className="size-4" /> },
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedSections.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeScreen === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              onNavigate(item.id);
            }
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-lg min-h-[44px] touch-manipulation",
            level === 0 && "font-semibold mt-4",
            level === 1 && "pl-8",
            level === 2 && "pl-12",
            isActive 
              ? "bg-blue-600 text-white" 
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Smart Approval</h1>
        <p className="text-xs text-gray-500 mt-1">Management System</p>
      </div>
      
      <nav className="p-4">
        {userRole === "admin" && adminMenu.map(item => renderMenuItem(item))}
        {applicationsMenu.map(item => renderMenuItem(item))}
        {reportsMenu.map(item => renderMenuItem(item))}
      </nav>
    </div>
  );
}
