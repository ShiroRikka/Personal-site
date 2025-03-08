import ScrollArea from '@/components/ScrollArea';
import { useAtom, useAtomValue } from 'jotai';
import { 
  sidebarDrawerVisible as sidebarDrawerVisibleAtom,
  hasThemeToggle as hasThemeToggleAtom,

} from "@/store/atoms";
import Drawer from '@/components/Drawer';
import { twMerge } from 'tailwind-merge';
import ThemeToggle from '@/components/ThemeToggle';


export interface MobileDrawerProps extends React.PropsWithChildren<React.ComponentPropsWithoutRef<'aside'>> {}

export default function MobileDrawer({
  className,
  children,
  ...rest
}: MobileDrawerProps) {

  const [drawerVisible, setDrawerVisible] = useAtom(sidebarDrawerVisibleAtom);
  const hasThemeToggle = useAtomValue(hasThemeToggleAtom);


  return (
    <Drawer open={drawerVisible} onOpenChange={setDrawerVisible}>
      <Drawer.Content>
        <div className="px-3 h-14 flex gap-2 items-center">

          {hasThemeToggle && <ThemeToggle />}
          <Drawer.Close className='ml-auto' />
        </div>
        <aside className={twMerge(
          'h-[calc(100%_-_3.5rem)]',
          className
        )} {...rest}>
          <ScrollArea type='scroll' className='h-full'>
            {children}
          </ScrollArea>
        </aside>
      </Drawer.Content>
    </Drawer>
  )
}