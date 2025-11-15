import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventPage from "@/pages/EventPage";
import Formulario from "@/pages/Formulario";
import Comunidade from "@/pages/Comunidade";
import AdminMeetup from "@/pages/AdminMeetup";
import { motion, type SpringOptions, type MotionValue, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, FileText, Users } from "lucide-react";

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};
type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};
type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type DocContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};
type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

import { createContext, useContext, useMemo, useRef, useState, useEffect, Children, cloneElement } from "react";

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within an DockProvider");
  }
  return context;
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      style={{
        height: panelHeight,
        scrollbarWidth: "none",
      }}
      className="mx-2 flex max-w-full items-center overflow-visible"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={cn(
          "mx-auto flex w-fit items-center gap-4 rounded-2xl px-4",
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>{children}</DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseX, spring } = useDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthTransform, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn("relative inline-flex h-full items-center justify-center", className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { width, isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps["isHovered"] as MotionValue<number>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white",
            className
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps["width"] as MotionValue<number>;

  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div style={{ width: widthTransform }} className={cn("flex items-center justify-center", className)}>
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <header className="fixed left-0 right-0 top-12 z-50 bg-transparent">
        <div className="flex justify-center px-6">
          <Dock className="bg-black/40 border border-white/10 backdrop-blur-sm" panelHeight={48} magnification={64} distance={120}>
            <Link to="/" className="contents">
              <DockItem>
                <DockIcon>
                  <Home className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Início</DockLabel>
              </DockItem>
            </Link>
            <Link to="/formulario" className="contents">
              <DockItem>
                <DockIcon>
                  <FileText className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Formulário</DockLabel>
              </DockItem>
            </Link>
            <Link to="/comunidade" className="contents">
              <DockItem>
                <DockIcon>
                  <Users className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Comunidade</DockLabel>
              </DockItem>
            </Link>
          </Dock>
        </div>
      </header>
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/adminmeetup" element={<AdminMeetup />} />
        </Routes>
      </div>
    </Router>
  );
}
