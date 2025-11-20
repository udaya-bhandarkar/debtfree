interface CircularGaugeProps {
  value: number;
  max: number;
  color: 'emerald' | 'amber' | 'rose' | 'indigo';
  size?: number;
}

export function CircularGauge({ value, max, color, size = 160 }: CircularGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    emerald: {
      stroke: '#10b981',
      bg: '#d1fae5',
      text: 'text-emerald-600',
    },
    amber: {
      stroke: '#f59e0b',
      bg: '#fef3c7',
      text: 'text-amber-600',
    },
    rose: {
      stroke: '#f43f5e',
      bg: '#ffe4e6',
      text: 'text-rose-600',
    },
    indigo: {
      stroke: '#6366f1',
      bg: '#e0e7ff',
      text: 'text-indigo-600',
    },
  };

  const colors = colorMap[color];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke={colors.bg}
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke={colors.stroke}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={`text-4xl ${colors.text}`}>{value}</p>
        <p className="text-slate-400 text-sm">/ {max}h</p>
      </div>
    </div>
  );
}
