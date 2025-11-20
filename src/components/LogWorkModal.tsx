import { useState } from 'react';
import { ModeType } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LogWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogWork: (hours: number, location: string, date: string) => void;
  mode: ModeType;
  currentHours: number;
}

export function LogWorkModal({ isOpen, onClose, onLogWork, mode, currentHours }: LogWorkModalProps) {
  const [hours, setHours] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const maxHours = mode === 'term' ? 20 : 40;
  const wouldExceedLimit = currentHours + Number(hours) > maxHours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hoursNum = Number(hours);
    if (!hoursNum || hoursNum <= 0) {
      toast.error('Please enter valid hours');
      return;
    }
    
    if (!location.trim()) {
      toast.error('Please enter work location');
      return;
    }

    if (wouldExceedLimit && mode === 'term') {
      toast.error('This would exceed your visa work limit', {
        description: `You can only work ${maxHours - currentHours} more hours this week`,
      });
      return;
    }

    onLogWork(hoursNum, location, date);
    toast.success('Shift Logged!', {
      description: `${hoursNum} hours added to your work tracker`,
      duration: 3000,
    });
    
    // Reset form
    setHours('');
    setLocation('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Work Hours</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="hours">Hours Worked</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                max={maxHours}
                placeholder="e.g., 8"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="location">Work Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Costa Coffee"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {/* Warning if would exceed limit */}
            {wouldExceedLimit && hours && (
              <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-900 text-sm">Warning: Exceeds Visa Limit</p>
                  <p className="text-amber-700 text-sm mt-1">
                    This would bring you to {currentHours + Number(hours)} hours (limit: {maxHours}h/week)
                  </p>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-indigo-900 text-sm">
                Current week: {currentHours}h / {maxHours}h
                {hours && ` → ${currentHours + Number(hours)}h`}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Log Shift
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
