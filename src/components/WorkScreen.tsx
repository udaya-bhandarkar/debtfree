import { ModeType, WorkShift } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react';
import { CircularGauge } from './CircularGauge';

interface WorkScreenProps {
  shifts: WorkShift[];
  mode: ModeType;
  workHours: number;
}

export function WorkScreen({ shifts, mode, workHours }: WorkScreenProps) {
  const maxHours = mode === 'term' ? 20 : 40;
  const gaugeColor = workHours >= maxHours * 0.9 ? 'rose' : workHours >= maxHours * 0.7 ? 'amber' : 'emerald';
  const hourlyRate = 8.50;
  const weeklyEarnings = workHours * hourlyRate;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Work Tracker</h1>
        <p className="text-slate-500 mt-1">Monitor your hours and earnings</p>
      </div>

      {/* Weekly Summary */}
      <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-100 text-sm">This Week</p>
            <p className="text-3xl mt-1">£{weeklyEarnings.toFixed(2)}</p>
            <p className="text-indigo-100 text-sm mt-1">{workHours} hours @ £{hourlyRate}/hr</p>
          </div>
          <Badge className="bg-white/20 text-white border-0">
            {mode === 'term' ? 'Term Time' : 'Holiday'}
          </Badge>
        </div>
      </Card>

      {/* Hours Gauge */}
      <Card className="p-6">
        <p className="text-slate-900 mb-4">Weekly Hours</p>
        <div className="flex justify-center mb-4">
          <CircularGauge 
            value={workHours} 
            max={maxHours} 
            color={gaugeColor}
            size={180}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-slate-500 text-sm">Worked</p>
            <p className="text-slate-900 text-lg">{workHours}h</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Remaining</p>
            <p className="text-slate-900 text-lg">{Math.max(0, maxHours - workHours)}h</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">Limit</p>
            <p className="text-slate-900 text-lg">{maxHours}h</p>
          </div>
        </div>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <p className="text-slate-600 text-sm">This Month</p>
          </div>
          <p className="text-2xl text-slate-900">£{(weeklyEarnings * 4).toFixed(0)}</p>
          <p className="text-slate-500 text-sm mt-1">Projected</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <p className="text-slate-600 text-sm">Total Hours</p>
          </div>
          <p className="text-2xl text-slate-900">{workHours * 4}h</p>
          <p className="text-slate-500 text-sm mt-1">This month</p>
        </Card>
      </div>

      {/* Shift History */}
      <div>
        <p className="text-slate-900 mb-3">Recent Shifts</p>
        <div className="space-y-3">
          {shifts.map((shift) => (
            <Card key={shift.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-slate-900">{shift.location}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {formatDate(shift.date)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                      £{(shift.hours * hourlyRate).toFixed(2)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{shift.hours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Zone 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Compliance Info */}
      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <p className="text-indigo-900 text-sm">
          💡 <span className="font-medium">Visa Compliance:</span> {mode === 'term' 
            ? 'During term time, you can work a maximum of 20 hours per week. Track all shifts to stay compliant.' 
            : 'During holiday periods, you can work full-time (40 hours per week). Make the most of it!'}
        </p>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4 bg-slate-900 text-white border-0">
        <p className="text-slate-300 text-sm mb-3">Your Work Stats</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl">12</p>
            <p className="text-slate-400 text-sm mt-1">Shifts</p>
          </div>
          <div>
            <p className="text-2xl">98%</p>
            <p className="text-slate-400 text-sm mt-1">On-time</p>
          </div>
          <div>
            <p className="text-2xl">4.8</p>
            <p className="text-slate-400 text-sm mt-1">Rating</p>
          </div>
        </div>
      </Card>
    </div>
  );
}