import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import CheckboxIcon from '@/public/icons/checkbox.svg';

interface DropdownItem<T> {
  label: string;
  value: T;
}

interface Props<T> {
  dropdownitems: DropdownItem<T>[];
  selectedValues: T[];
  onValueChange: (value: T) => void;
  trigger: React.ReactNode;
}

const CheckableDropdown = <T,>({
  dropdownitems,
  selectedValues,
  onValueChange,
  trigger,
}: Props<T>) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="custom-scrollbar max-h-400 w-(--radix-dropdown-menu-trigger-width)"
        align="start"
      >
        <DropdownMenuGroup>
          {dropdownitems.map((item) => {
            const isSelected = selectedValues.includes(item.value);

            return (
              <DropdownMenuItem
                key={String(item.value)}
                onSelect={(e) => {
                  e.preventDefault();
                  onValueChange(item.value);
                }}
              >
                <div className="p-1">
                  <CheckboxIcon
                    className={cn(
                      'size-18 fill-white',
                      isSelected ? 'stroke-gray_90' : 'stroke-gray_5'
                    )}
                  />
                </div>

                {item.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CheckableDropdown;
