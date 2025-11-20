import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { CreditDebtScreen } from "./components/CreditDebtScreen";
import { BudgetScreen } from "./components/BudgetScreen";
import { WorkScreen } from "./components/WorkScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNav } from "./components/BottomNav";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { LogWorkModal } from "./components/LogWorkModal";
import { Toaster } from "./components/ui/sonner";
import { FinancialProvider, useFinancial } from "./context/FinancialContext";
import { ModeType } from "./types";

// Export types from types.ts for backward compatibility if needed, 
// though components should import from types.ts directly now.
export type { ModeType, WorkShift, Debt } from "./types";

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<
    "home" | "credit" | "work" | "profile" | "budget"
  >("home");

  const [isLogWorkModalOpen, setIsLogWorkModalOpen] = useState(false);

  const {
    mode,
    workHours,
    creditScore,
    degreeProgress,
    shifts,
    debts,
    toggleMode,
    addShift,
    reportRent
  } = useFinancial();

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return (
          <Dashboard
            mode={mode}
            workHours={workHours}
            onModeToggle={toggleMode}
            degreeProgress={degreeProgress}
          />
        );
      case "budget":
        return <BudgetScreen />;
      case "credit":
        return (
          <CreditDebtScreen
            onReportRent={reportRent}
            initialCreditScore={creditScore}
            debts={debts}
            mode={mode}
          />
        );
      case "work":
        return (
          <WorkScreen
            shifts={shifts}
            mode={mode}
            workHours={workHours}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            creditScore={creditScore}
            degreeProgress={degreeProgress}
          />
        );
      default:
        return (
          <Dashboard
            mode={mode}
            workHours={workHours}
            onModeToggle={toggleMode}
            degreeProgress={degreeProgress}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pb-24 min-h-screen">{renderScreen()}</div>

      {/* Bottom Navigation */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
      />

      {/* Floating Action Button - Show on Home and Work screens */}
      {(activeScreen === "home" || activeScreen === "work") && (
        <FloatingActionButton
          onClick={() => setIsLogWorkModalOpen(true)}
        />
      )}

      {/* Log Work Modal */}
      <LogWorkModal
        isOpen={isLogWorkModalOpen}
        onClose={() => setIsLogWorkModalOpen(false)}
        onLogWork={addShift}
        mode={mode}
        currentHours={workHours}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <FinancialProvider>
      <AppContent />
    </FinancialProvider>
  );
}