import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    viewportRef.current?.scrollBy({ top: delta, behavior: "smooth" });
  };

  return (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport ref={viewportRef} className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>

      {/* Custom vertical arrows */}
      <button
        type="button"
        aria-label="Scroll up"
        onClick={() => scrollBy(-120)}
        className="absolute right-1 top-1 z-10 h-7 w-7 rounded-full bg-secondary text-white shadow-md transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/60"
      >
        <span aria-hidden className="block text-center text-sm leading-7">
          ↑
        </span>
      </button>
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => scrollBy(120)}
        className="absolute right-1 bottom-1 z-10 h-7 w-7 rounded-full bg-secondary text-white shadow-md transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/60"
      >
        <span aria-hidden className="block text-center text-sm leading-7">
          ↓
        </span>
      </button>

      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-3 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-3 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-secondary hover:bg-secondary/90 transition-colors" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
