import { Television } from "@phosphor-icons/react/dist/ssr";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-bg-surface">
        <Television size={24} className="text-text-faint" />
      </div>
      <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-text-muted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
