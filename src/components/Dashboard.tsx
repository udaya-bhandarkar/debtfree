import { ModeType } from '../App';
import { CircularGauge } from './CircularGauge';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  mode: ModeType;
  workHours: number;
  onModeToggle: (mode: ModeType) => void;
  degreeProgress: number;
}

export function Dashboard({ mode, workHours, onModeToggle, degreeProgress }: DashboardProps) {
  const maxHours = mode === 'term' ? 20 : 40;
  const gaugeColor = workHours >= maxHours * 0.9 ? 'rose' : workHours >= maxHours * 0.7 ? 'amber' : 'emerald';
  const recommendedRepayment = mode === 'term' ? 50 : 200;

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Good morning, Udaya</h1>
        <p className="text-slate-500 mt-1">Here's your financial overview</p>
      </div>

      {/* Degree Progress */}
      <Card className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-indigo-100 text-sm">Degree Progress</p>
            <p className="text-2xl mt-1">Level {Math.floor(degreeProgress / 25) + 1}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl">{degreeProgress}%</p>
            <p className="text-indigo-100 text-sm">to graduation</p>
          </div>
        </div>
        <div className="w-full bg-indigo-400 rounded-full h-3">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${degreeProgress}%` }}
          />
        </div>
        <p className="text-indigo-100 text-sm mt-3">
          Keep reporting payments to unlock achievements!
        </p>
      </Card>

      {/* Mode Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-900">Visa Mode</p>
            <p className="text-slate-500 text-sm mt-1">
              {mode === 'term' ? 'Term Time (20h/week limit)' : 'Holiday Period (Full-time OK)'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${mode === 'term' ? 'text-indigo-600' : 'text-slate-400'}`}>
              Term
            </span>
            <Switch
              checked={mode === 'holiday'}
              onCheckedChange={(checked) => onModeToggle(checked ? 'holiday' : 'term')}
            />
            <span className={`text-sm ${mode === 'holiday' ? 'text-indigo-600' : 'text-slate-400'}`}>
              Holiday
            </span>
          </div>
        </div>
      </Card>

      {/* Work Hours Gauge */}
      <Card className="p-6">
        <p className="text-slate-900 mb-4">This Week's Work Hours</p>
        <div className="flex justify-center mb-4">
          <CircularGauge 
            value={workHours} 
            max={maxHours} 
            color={gaugeColor}
            size={200}
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Current</p>
            <p className="text-slate-900 text-xl">{workHours}h</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-sm">Limit</p>
            <p className="text-slate-900 text-xl">{maxHours}h</p>
          </div>
        </div>
        {workHours >= maxHours * 0.9 && (
          <div className="mt-4 p-3 bg-rose-50 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-rose-900 text-sm">Approaching visa limit</p>
              <p className="text-rose-700 text-sm mt-1">
                You can only work {maxHours - workHours} more hours this week
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Holiday Mode Banner */}
      {mode === 'holiday' && (
        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-lg">High Income Period Detected</p>
              <p className="text-emerald-100 text-sm mt-1">
                You can work full-time during holidays. Recommended debt repayment increased to £{recommendedRepayment}/month
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Next Shift Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-slate-900">Next Shift</p>
          <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
            Upcoming
          </Badge>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-slate-900">Costa Coffee - Barista</p>
            <p className="text-slate-500 text-sm mt-1">Tomorrow, 9:00 AM - 5:00 PM (8 hours)</p>
            {mode === 'term' && workHours + 8 > maxHours && (
              <div className="mt-2 p-2 bg-amber-50 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-amber-900 text-sm">
                  Warning: This shift will exceed your weekly limit
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Recommended Repayment */}
      <Card className="p-4 bg-slate-900 text-white border-0">
        <p className="text-slate-300 text-sm">Recommended This Month</p>
        <p className="text-3xl mt-2">£{recommendedRepayment}</p>
        <p className="text-slate-400 text-sm mt-1">
          Based on your {mode === 'term' ? 'term-time' : 'holiday'} income potential
        </p>
      </Card>

      {/* Safe to Spend */}
      <Card className="p-4">
        <p className="text-slate-900 mb-2">Safe to Spend Today</p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl text-emerald-600">£18.50</p>
          <p className="text-slate-500 text-sm">per day</p>
        </div>
        <p className="text-slate-500 text-sm mt-2">
          After rent, tuition, visa buffer, and debt repayments
        </p>
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-slate-600 text-sm">Next coffee (£3.50) = <span className="text-slate-900">1.2 hours of work</span></p>
        </div>
      </Card>
    </div>
  );
}