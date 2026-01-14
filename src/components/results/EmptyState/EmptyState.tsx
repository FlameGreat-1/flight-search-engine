import { clsx } from 'clsx';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'search' | 'filter' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  title = 'No Flights Found',
  message = 'Try adjusting your search criteria or filters',
  icon = 'search',
  action,
  className,
}: EmptyStateProps) => {
  const icons = {
    search: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    filter: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    ),
    error: (
      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  };

  return (
    <div className={clsx('card p-12 text-center', className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-text-muted">{icons[icon]}</div>
        <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
        <p className="text-text-secondary max-w-md">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="btn-primary mt-4"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};
