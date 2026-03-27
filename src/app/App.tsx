import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastProvider } from "@/components/ui/Toast";
import { LayoutProvider } from "@/components/common/LayoutContext";
import LoginForm from "@/pages/LoginForm";
import OTPPage from "@/pages/OTPPage";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import ShowCase from "@/pages/ShowCase";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { Layout } from "@/components/common/Layout";

import Team from "@/pages/admin-pages/Team";
import Alerts from "@/pages/admin-pages/Alerts";
import Threats from "@/pages/admin-pages/Threats";
import Monitoring from "@/pages/admin-pages/Monitoring";
import Configuration from "@/pages/admin-pages/Configuration";
import Integrations from "@/pages/admin-pages/Integrations";
import ChangePassword from "@/pages/admin-pages/ChangePassword";
import DepartmentDetails from "@/pages/admin-pages/DepartmentDetails";
import UserDetails from "@/pages/admin-pages/UserDetails";
import ThreatsInvestigation from "@/pages/admin-pages/ThreatsInvestigation";
import LinkedEvents from "@/pages/admin-pages/LinkedEvents";

// Monitoring subpages
import UserBehaviour from "@/pages/admin-pages/monitoring/UserBehaviour";
import CompliancePolicy from "@/pages/admin-pages/monitoring/CompliancePolicy";
import EndpointDevices from "@/pages/admin-pages/monitoring/EndpointDevices";
import NetworkActivity from "@/pages/admin-pages/monitoring/NetworkActivity";
import ProtectedRoute from "@/components/ProtectedRoute";

// Configuration subpages
import PolicyConfigs from "@/pages/admin-pages/configuration/PolicyConfigs";
import AuditLogs from "@/pages/admin-pages/configuration/AuditLogs";

function App() {
  return (
    <ToastProvider position="top-right">
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<OTPPage />} />

            {/* Admin Routes with Layout Wrapper */}
            <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:id" element={<DepartmentDetails />} />
              <Route path="/team/staff/:staffId" element={<UserDetails />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/threats" element={<Threats />} />
              <Route path="/threats/:id" element={<ThreatsInvestigation />} />
              <Route path="/threats/linked-events" element={<LinkedEvents />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/monitoring/user-behaviour" element={<UserBehaviour />} />
              <Route path="/monitoring/compliance-policy" element={<CompliancePolicy />} />
              <Route path="/monitoring/endpoint-devices" element={<EndpointDevices />} />
              <Route path="/monitoring/network-activity" element={<NetworkActivity />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/configuration/policy-configs" element={<PolicyConfigs />} />
              <Route path="/configuration/audit-logs" element={<AuditLogs />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
            </Route>

            {/* Development/Preview Routes */}
            <Route path="/showcase" element={<ShowCase />} />

            {/* Default Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 Handle */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </ToastProvider>
  );
}

export default App;
