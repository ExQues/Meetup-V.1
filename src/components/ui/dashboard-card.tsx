import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ children, className }: CardProps) {
  return (
    <div className={cn(
      "relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/5 to-transparent",
      className
    )}>
      <div className="rounded-2xl border border-white/5 bg-black/60 backdrop-blur-sm p-6 h-full">
        {children}
      </div>
    </div>
  );
}