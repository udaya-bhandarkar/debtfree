import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CircularGauge } from './CircularGauge';
import { TrendingUp, Home, CreditCard, AlertCircle, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Debt, ModeType } from '../App';

interface CreditDebtScreenProps {
  onReportRent?: () => void;
  initialCreditScore?: number;
  debts?: Debt[];
  mode?: ModeType;
}

export function CreditDebtScreen({ onReportRent, initialCreditScore = 580, debts = [], mode = 'term' }: CreditDebtScreenProps) {
  const [hasReportedRent, setHasReportedRent] = useState(false);

  const handleReportRent = () => {
    setHasReportedRent(true);
    if (onReportRent) {
      onReportRent();
    }
    toast.success('Payment Reported!', {
      description: '+5 points added to your Credit Passport',
      duration: 3000,
    });
    
    // Reset after animation
    setTimeout(() => setHasReportedRent(false), 3000);
  };

  const getCreditScoreColor = (score: number): 'emerald' | 'amber' | 'rose' | 'indigo' => {
    if (score >= 700) return 'emerald';
    if (score >= 600) return 'amber';
    return 'rose';
  };

  const getCreditScoreLabel = (score: number): string => {
    if (score >= 700) return 'Good';
    if (score >= 600) return 'Fair';
    return 'Building';
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'GBP') return `£${amount.toFixed(2)}`;
    return `${currency} ${amount.toLocaleString()}`;
  };

  const getGBPEquivalent = (debt: Debt): number => {
    if (debt.type === 'gbp') return debt.amount;
    return debt.amount * (debt.exchangeRate || 0);
  };

  const totalDebtGBP = debts.reduce((sum, debt) => sum + getGBPEquivalent(debt), 0);

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Credit & Debt</h1>
        <p className="text-slate-500 mt-1">Build credit and track your debts</p>
      </div>

      {/* Credit Passport */}
      <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          <p className="text-lg">Credit Passport™</p>
          <Badge className="bg-white/20 text-white border-0 ml-auto">
            International Student
          </Badge>
        </div>
        
        <div className="flex justify-center mb-4">
          <CircularGauge 
            value={initialCreditScore} 
            max={850} 
            color={getCreditScoreColor(initialCreditScore)}
            size={180}
          />
        </div>

        <div className="text-center mb-4">
          <p className="text-indigo-100 text-sm">Your Credit Score</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <p className="text-3xl">{initialCreditScore}</p>
            <Badge className="bg-white/20 text-white border-0">
              {getCreditScoreLabel(initialCreditScore)}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm text-indigo-100">
          <div className="flex items-center justify-between">
            <span>Rent payments reported</span>
            <span className="text-white">3/12</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Bills on time</span>
            <span className="text-white">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Account age</span>
            <span className="text-white">4 months</span>
          </div>
        </div>
      </Card>

      {/* Report Rent Payment */}
      <Card className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-slate-900">November Rent</p>
            <p className="text-slate-500 text-sm mt-1">Report to build credit history</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl text-slate-900">£650.00</p>
          <Button 
            onClick={handleReportRent}
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={hasReportedRent}
          >
            {hasReportedRent ? 'Reported!' : 'Report Payment'}
          </Button>
        </div>
        {hasReportedRent && (
          <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-900 text-sm">+5 points added to your score!</p>
          </div>
        )}
      </Card>

      {/* Total Debt Overview */}
      <Card className="p-4 bg-slate-900 text-white border-0">
        <p className="text-slate-300 text-sm">Total Debt (GBP Equivalent)</p>
        <p className="text-3xl mt-2">£{totalDebtGBP.toFixed(2)}</p>
        <p className="text-slate-400 text-sm mt-1">
          Across {debts.length} accounts
        </p>
      </Card>

      {/* Debt List */}
      <div>
        <p className="text-slate-900 mb-3">Your Debts</p>
        <div className="space-y-3">
          {debts.map((debt) => (
            <Card key={debt.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-900">{debt.name}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {formatCurrency(debt.amount, debt.currency)}
                      </p>
                    </div>
                    {debt.type === 'foreign' && (
                      <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                        FX-Tracked
                      </Badge>
                    )}
                  </div>
                  
                  {debt.type === 'foreign' && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">GBP Equivalent</span>
                        <span className="text-slate-900">£{getGBPEquivalent(debt).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Exchange Rate</span>
                        <span className="text-slate-900">{debt.exchangeRate?.toFixed(4)}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Rate improved 2% this week</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FX Alert Card */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 text-sm">Currency Alert</p>
            <p className="text-amber-700 text-sm mt-1">
              GBP strengthened against INR. Your home loan repayment cost decreased by £4.75 this month.
            </p>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <p className="text-indigo-900 text-sm">
          💡 <span className="font-medium">Credit Passport</span> tracks your rent, bills, and responsible spending to build a credit history — even without a UK credit card.
        </p>
      </Card>
    </div>
  );
}