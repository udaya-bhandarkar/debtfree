import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Wallet, TrendingDown, ShoppingBag, Coffee, Shield, Edit2 } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';
import { EditBudgetDialog } from './EditBudgetDialog';

export function BudgetScreen() {
  const { mode, budget, updateBudget } = useFinancial();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { monthlyIncome, rent, bills, tuition, visaBuffer, debtRepayment } = budget;

  const totalExpenses = rent + bills + tuition + visaBuffer + debtRepayment;
  const remaining = monthlyIncome - totalExpenses;
  const dailySafeSpend = remaining / 30;

  const expenses = [
    { name: 'Rent', amount: rent, icon: Shield, color: 'bg-rose-100 text-rose-600', percent: (rent / monthlyIncome) * 100 },
    { name: 'Tuition Allocation', amount: tuition, icon: ShoppingBag, color: 'bg-indigo-100 text-indigo-600', percent: (tuition / monthlyIncome) * 100 },
    { name: 'Debt Repayment', amount: debtRepayment, icon: TrendingDown, color: 'bg-amber-100 text-amber-600', percent: (debtRepayment / monthlyIncome) * 100 },
    { name: 'Visa Buffer', amount: visaBuffer, icon: Shield, color: 'bg-purple-100 text-purple-600', percent: (visaBuffer / monthlyIncome) * 100 },
    { name: 'Bills & Utilities', amount: bills, icon: Wallet, color: 'bg-slate-100 text-slate-600', percent: (bills / monthlyIncome) * 100 },
  ];

  const todaySpending = [
    { item: 'Coffee at Costa', cost: 3.5, hours: 1.2 },
    { item: 'Meal Deal', cost: 4.0, hours: 1.4 },
    { item: 'Cinema Ticket', cost: 12.0, hours: 4.2 },
    { item: 'Takeaway', cost: 15.0, hours: 5.2 },
  ];

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Budget</h1>
          <p className="text-slate-500 mt-1">Your spending overview</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsEditDialogOpen(true)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Safe to Spend - Hero Card */}
      <Card className={`p-6 text-white border-0 ${dailySafeSpend < 0
          ? 'bg-gradient-to-br from-rose-500 to-rose-600'
          : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
        }`}>
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-6 h-6" />
          <p className="text-lg">Safe to Spend Today</p>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-5xl">£{dailySafeSpend.toFixed(2)}</p>
          <p className={dailySafeSpend < 0 ? 'text-rose-100' : 'text-emerald-100'}>per day</p>
        </div>
        <p className={dailySafeSpend < 0 ? 'text-rose-100 text-sm' : 'text-emerald-100 text-sm'}>
          {dailySafeSpend < 0
            ? 'You are currently over budget. Reduce expenses to get back on track.'
            : 'After all essentials, visa requirements, and debt repayments'}
        </p>
      </Card>

      {/* Monthly Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-900">Monthly Overview</p>
          <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
            {mode === 'term' ? 'Term Time' : 'Holiday'}
          </Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm">Income</span>
            <span className="text-slate-900">£{monthlyIncome.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm">Total Expenses</span>
            <span className="text-slate-900">£{totalExpenses.toFixed(2)}</span>
          </div>
          <div className="h-px bg-slate-200"></div>
          <div className="flex items-center justify-between">
            <span className="text-slate-900">Remaining</span>
            <span className={`text-lg ${remaining < 0 ? 'text-rose-600 font-bold' : 'text-emerald-600'}`}>
              £{remaining.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Progress
            value={Math.min((totalExpenses / monthlyIncome) * 100, 100)}
            className={`h-2 ${totalExpenses > monthlyIncome ? '[&>div]:bg-rose-600' : ''}`}
          />
          <p className={`text-sm mt-2 ${totalExpenses > monthlyIncome ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>
            {((totalExpenses / monthlyIncome) * 100).toFixed(0)}% of income allocated
          </p>
        </div>
      </Card>

      {/* Expense Breakdown */}
      <div>
        <p className="text-slate-900 mb-3">Expense Breakdown</p>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.name} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${expense.color} flex items-center justify-center flex-shrink-0`}>
                  <expense.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-900 text-sm">{expense.name}</p>
                    <p className="text-slate-900">£{expense.amount}</p>
                  </div>
                  <Progress value={expense.percent} className="h-1.5" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Work Hours Anchor */}
      <div>
        <p className="text-slate-900 mb-3">Cost in Work Hours</p>
        <Card className="p-4">
          <p className="text-slate-500 text-sm mb-3">Common purchases converted to hours of work @ £8.50/hour</p>
          <div className="space-y-3">
            {todaySpending.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900 text-sm">{item.item}</p>
                    <p className="text-slate-500 text-sm">£{item.cost.toFixed(2)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                  {item.hours.toFixed(1)}h work
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Visa Compliance */}
      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-indigo-900 text-sm">Visa Proof-of-Funds Buffer</p>
            <p className="text-indigo-700 text-sm mt-1">
              £{visaBuffer}/month reserved to maintain required balance. This ensures you stay compliant with visa financial requirements.
            </p>
          </div>
        </div>
      </Card>

      {/* Peer Comparison (Gamification) */}
      <Card className="p-4 bg-slate-900 text-white border-0">
        <p className="text-slate-300 text-sm mb-3">Anonymous Peer Comparison</p>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Your Daily Spending</span>
              <span className="text-emerald-400">£12.30</span>
            </div>
            <Progress value={65} className="h-2 bg-slate-700" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Peer Average</span>
              <span className="text-slate-300">£18.90</span>
            </div>
            <Progress value={100} className="h-2 bg-slate-700" />
          </div>
        </div>
        <p className="text-emerald-400 text-sm mt-3">
          🎉 You're spending 35% less than peers in your area
        </p>
      </Card>

      <EditBudgetDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        budget={budget}
        onSave={updateBudget}
      />
    </div>
  );
}
