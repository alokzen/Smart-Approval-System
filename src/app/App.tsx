import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { MyApprovalRequests } from "./components/MyApprovalRequests";
import { CreateRequest } from "./components/CreateRequest";
import { MyApprovals } from "./components/MyApprovals";
import { ApprovalAction } from "./components/ApprovalAction";
import { DOPPolicy } from "./components/DOPPolicy";
import { ApprovalList } from "./components/ApprovalList";
import { LeadTimes } from "./components/LeadTimes";
import { Sheet, SheetContent } from "./components/ui/sheet";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [selectedRequestId, setSelectedRequestId] = useState<string | undefined>();
  const [userRole] = useState<"admin" | "approver" | "requester" | "viewer">("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (screen: string, requestId?: string) => {
    setActiveScreen(screen);
    if (requestId) {
      setSelectedRequestId(requestId);
    }
    setSidebarOpen(false); // Close mobile sheet when navigating
  };

  const renderContent = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "my-requests":
        return <MyApprovalRequests onNavigate={handleNavigate} />;
      case "create-request":
        return <CreateRequest onNavigate={handleNavigate} requestId={selectedRequestId} />;
      case "my-approvals":
        return <MyApprovals onNavigate={handleNavigate} />;
      case "approval-action":
        return <ApprovalAction onNavigate={handleNavigate} requestId={selectedRequestId} />;
      case "dop-policy":
        return <DOPPolicy />;
      case "approval-list":
        return <ApprovalList />;
      case "lead-times":
        return <LeadTimes />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 min-h-[100dvh]">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden lg:block flex-shrink-0">
        <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} userRole={userRole} />
      </aside>

      {/* Mobile Sidebar - Sheet drawer */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] max-w-[85vw] p-0 gap-0 border-r">
          <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} userRole={userRole} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <Header userName="Admin User" userRole="Administrator" onToggleSidebar={() => setSidebarOpen(true)} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 text-center sm:text-left">
            <p>© 2025 Smart Approval Management System. All rights reserved.</p>
            <p>Version 1.0 | Last updated: February 5, 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
