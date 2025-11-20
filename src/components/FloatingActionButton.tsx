import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-28 right-4 md:right-8 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all active:scale-95 z-40"
      size="icon"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
}