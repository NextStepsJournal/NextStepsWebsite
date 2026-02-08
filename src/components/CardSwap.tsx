import {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

type EasingMode = "elastic" | "smooth";

type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onActiveIndexChange?: (index: number) => void;
  skewAmount?: number;
  easing?: EasingMode;
  children: ReactNode;
  className?: string;
};

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()} />
));
Card.displayName = "Card";

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLDivElement | null, slot: Slot, skew: number) => {
  if (!el) {
    return;
  }
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true
  });
};

const CardSwap = ({
  width = 500,
  height = 360,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onActiveIndexChange,
  skewAmount = 6,
  easing = "elastic",
  children,
  className
}: CardSwapProps) => {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2
          },
    [easing]
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const childCount = childArr.length;
  const refs = useMemo(
    () => Array.from({ length: childCount }, () => createRef<HTMLDivElement>()),
    [childCount]
  );
  const order = useRef(Array.from({ length: childCount }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;
    order.current = Array.from({ length: total }, (_, i) => i);
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) {
        return;
      }

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) {
        return;
      }

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) {
          return;
        }
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        "return"
      );

      tl.call(() => {
        const nextOrder = [...rest, front];
        order.current = nextOrder;
        onActiveIndexChange?.(nextOrder[0] ?? 0);
      });
    };

    onActiveIndexChange?.(order.current[0] ?? 0);
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    const node = containerRef.current;
    const pause = () => {
      tlRef.current?.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    const resume = () => {
      tlRef.current?.play();
      intervalRef.current = window.setInterval(swap, delay);
    };

    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
    }

    return () => {
      if (pauseOnHover && node) {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      tlRef.current?.kill();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, config, refs, onActiveIndexChange]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) {
      return child;
    }

    const typedChild = child as ReactElement<{
      style?: CSSProperties;
      onClick?: MouseEventHandler<HTMLDivElement>;
    }>;
    const nextStyle: CSSProperties = {
      width,
      height,
      ...(typedChild.props.style ?? {})
    };
    const existingOnClick = typedChild.props.onClick;

    return cloneElement(typedChild, {
      key: i,
      ref: refs[i],
      style: nextStyle,
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        existingOnClick?.(event);
        onCardClick?.(i);
      }
    });
  });

  return (
    <div ref={containerRef} className={`card-swap-container ${className ?? ""}`.trim()} style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
