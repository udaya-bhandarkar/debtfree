import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModeType, WorkShift, Debt, Budget } from '../types';

interface FinancialContextType {
    mode: ModeType;
    workHours: number;
    creditScore: number;
    degreeProgress: number;
    shifts: WorkShift[];
    debts: Debt[];
    budget: Budget;
    toggleMode: (mode: ModeType) => void;
    addShift: (hours: number, location: string, date: string) => void;
    reportRent: () => void;
    updateBudget: (newBudget: Budget) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ModeType>("term");
    const [workHours, setWorkHours] = useState(18);
    const [creditScore, setCreditScore] = useState(580);
    const [degreeProgress, setDegreeProgress] = useState(35);

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

    const [budget, setBudget] = useState<Budget>({
        monthlyIncome: 800,
        rent: 650,
        bills: 80,
        tuition: 200,
        visaBuffer: 100,
        debtRepayment: 50,
    });

    const toggleMode = (newMode: ModeType) => {
        setMode(newMode);
        if (newMode === "holiday") {
            setWorkHours(0);
            // Update budget income for holiday mode
            setBudget(prev => ({
                ...prev,
                monthlyIncome: 1600,
                debtRepayment: 200
            }));
        } else {
            setWorkHours(18);
            setBudget(prev => ({
                ...prev,
                monthlyIncome: 800,
                debtRepayment: 50
            }));
        }
    };

    const addShift = (hours: number, location: string, date: string) => {
        const newShift: WorkShift = {
            id: Date.now().toString(),
            date,
            hours,
            location,
        };
        setShifts([newShift, ...shifts]);
        setWorkHours(workHours + hours);
        setDegreeProgress(Math.min(100, degreeProgress + 2));
    };

    const reportRent = () => {
        setCreditScore(creditScore + 5);
        setDegreeProgress(Math.min(100, degreeProgress + 3));
    };

    const updateBudget = (newBudget: Budget) => {
        setBudget(newBudget);
    };

    return (
        <FinancialContext.Provider
            value={{
                mode,
                workHours,
                creditScore,
                degreeProgress,
                shifts,
                debts,
                budget,
                toggleMode,
                addShift,
                reportRent,
                updateBudget,
            }}
        >
            {children}
        </FinancialContext.Provider>
    );
}

export function useFinancial() {
    const context = useContext(FinancialContext);
    if (context === undefined) {
        throw new Error('useFinancial must be used within a FinancialProvider');
    }
    return context;
}
