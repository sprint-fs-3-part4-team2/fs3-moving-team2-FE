export interface ServiceBadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'gray';
  selected?: boolean;
  onSelect?: () => void;
}
