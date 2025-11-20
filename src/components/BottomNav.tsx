import { Home, Wallet, Briefcase, User, PieChart } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'home' | 'credit' | 'work' | 'profile' | 'budget';
  onNavigate: (screen: 'home' | 'credit' | 'work' | 'profile' | 'budget') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'budget' as const, label: 'Budget', icon: PieChart },
    { id: 'credit' as const, label: 'Credit', icon: Wallet },
    { id: 'work' as const, label: 'Work', icon: Briefcase },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-400 hover:text-slate-600 active:scale-95'
                }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}