import { useEffect, useRef, useState } from 'react';

interface State {
  horizontal: 'left' | 'right' | 'unchanged',
  vertical: 'up' | 'down' | 'unchanged',
}

const useWindowScrollInfo = () => {
  const [scrollDirection, setScrollDirection] = useState<State>({
    horizontal: 'unchanged',
    vertical: 'unchanged',
  });
  const [isTop, setIsTop] = useState(false);
  const prev = useRef<{
    x: number;
    y: number;
  } | null>(null);
  useEffect(() => {
    // 添加节流变量
    let ticking = false;
    let lastScrollTime = 0;
    const throttleTime = 50; // 减少节流时间，提高响应速度
    
    const handler = () => {
      const now = Date.now();
      // 如果距离上次执行的时间小于节流时间，则不执行
      if (now - lastScrollTime < throttleTime) return;
      
      lastScrollTime = now;
      if (ticking) return;
      
      ticking = true;
      
      // 使用requestAnimationFrame来优化性能
      requestAnimationFrame(() => {
        const { scrollX, scrollY } = window;
        if (scrollY === 0) {
          setIsTop(true);
        } else {
          setIsTop(false);
        }
        if (prev.current === null) {
          prev.current = {
            x: scrollX,
            y: scrollY
          }
        } else {
          const direction: State = {
            horizontal: 'unchanged',
            vertical: 'unchanged',
          };
          if (scrollX > prev.current.x) {
            direction.horizontal = 'left';
            prev.current.x = scrollX;
          } else if (scrollX < prev.current.x) {
            direction.horizontal = 'right';
            prev.current.x = scrollX;
          } else {
            direction.horizontal = 'unchanged';
          }
          if (scrollY > prev.current.y) {
            direction.vertical = 'down';
            prev.current.y = scrollY;
          } else if (scrollY < prev.current.y) {
            direction.vertical = 'up';
            prev.current.y = scrollY;
          } else {
            direction.vertical = 'unchanged';
          }
          // 立即更新滚动方向状态，避免状态更新延迟
          setScrollDirection(direction);
        }
        ticking = false;
      });
    };

    //We have to update window scroll at mount, before subscription.
    //Window scroll may be changed between render and effect handler.
    handler();

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handler, {
        capture: false,
      });
    };
  }, []);

  return {
    direction: scrollDirection,
    isTop,
  };
};

export default useWindowScrollInfo;
