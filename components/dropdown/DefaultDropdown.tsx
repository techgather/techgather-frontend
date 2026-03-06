import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownItem<T> {
  label: string;
  value: T;
}

interface Props<T> {
  dropdownitems: DropdownItem<T>[];
  onValueChange: (value: T) => void;
  trigger: React.ReactNode;
}

const DefaultDropdown = <T,>({
  dropdownitems,
  onValueChange,
  trigger,
}: Props<T>) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width)"
        align="start"
      >
        <DropdownMenuGroup>
          {dropdownitems.map((item) => (
            <DropdownMenuItem
              key={String(item.value)}
              onSelect={() => onValueChange(item.value)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DefaultDropdown;
