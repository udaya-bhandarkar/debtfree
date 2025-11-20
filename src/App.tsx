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

export type ModeType = "term" | "holiday";

export interface WorkShift {
  id: string;
  date: string;
  hours: number;
  location: string;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  currency: string;
  type: "gbp" | "foreign";
  originalAmount?: number;
  exchangeRate?: number;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<
    "home" | "credit" | "work" | "profile"
  >("home");
  const [mode, setMode] = useState<ModeType>("term");
  const [workHours, setWorkHours] = useState(18);
  const [creditScore, setCreditScore] = useState(580);
  const [isLogWorkModalOpen, setIsLogWorkModalOpen] =
    useState(false);
  const [shifts, setShifts] = useState<WorkShift[]>([
    {
      id: "1",
      date: "2025-11-20",
      hours: 6,
      location: "Costa Coffee",
    },
    {
      id: "2",
      date: "2025-11-22",
      hours: 8,
      location: "Costa Coffee",
    },
    {
      id: "3",
      date: "2025-11-23",
      hours: 4,
      location: "Library Support",
    },
  ]);
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      name: "Monzo Flex",
      amount: 150,
      currency: "GBP",
      type: "gbp",
    },
    {
      id: "2",
      name: "Student Loan",
      amount: 3500000,
      currency: "INR",
      type: "foreign",
      originalAmount: 3500000,
      exchangeRate: 0.00862,
    },
    {
      id: "3",
      name: "Credit Card",
      amount: 85000,
      currency: "INR",
      type: "foreign",
      originalAmount: 85000,
      exchangeRate: 0.00862,
    },
  ]);
  const [degreeProgress, setDegreeProgress] = useState(35);

  const handleLogWork = (
    hours: number,
    location: string,
    date: string,
  ) => {
    const newShift: WorkShift = {
      id: Date.now().toString(),
      date,
      hours,
      location,
    };
    setShifts([newShift, ...shifts]);
    setWorkHours(workHours + hours);

    // Increase degree progress
    setDegreeProgress(Math.min(100, degreeProgress + 2));
  };

  const handleReportRent = () => {
    setCreditScore(creditScore + 5);
    setDegreeProgress(Math.min(100, degreeProgress + 3));
  };

  const handleModeToggle = (newMode: ModeType) => {
    setMode(newMode);
    // Reset work hours when switching modes
    if (newMode === "holiday") {
      setWorkHours(0);
    } else {
      setWorkHours(18);
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return (
          <Dashboard
            mode={mode}
            workHours={workHours}
            onModeToggle={handleModeToggle}
            degreeProgress={degreeProgress}
          />
        );
      case "credit":
        return (
          <CreditDebtScreen
            onReportRent={handleReportRent}
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
            onModeToggle={handleModeToggle}
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
        onLogWork={handleLogWork}
        mode={mode}
        currentHours={workHours}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}