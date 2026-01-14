import { clsx } from 'clsx';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) => {
  const baseStyles = 'skeleton';

  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={clsx(baseStyles, variants[variant], className)}
      style={style}
      aria-live="polite"
      aria-busy="true"
    />
  );
};

export const SkeletonGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-3">{children}</div>;
};
