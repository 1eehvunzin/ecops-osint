import { createContext, useContext, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { IconSearch } from './icons';

const DragContext = createContext<((e: React.MouseEvent) => void) | null>(null);

const FONT = "-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif";

/* ---------- traffic lights ---------- */

const LIGHT_COLORS = {
  close: { fill: '#ff5f57', ring: '#e0443e' },
  min: { fill: '#febc2e', ring: '#d89e24' },
  zoom: { fill: '#28c840', ring: '#1aab29' },
};

function Light({ kind, onClick }: { kind: keyof typeof LIGHT_COLORS; onClick?: () => void }) {
  const c = LIGHT_COLORS[kind];
  return (
    <span
      onClick={onClick}
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: `radial-gradient(circle at 32% 28%, ${c.fill} 0%, ${c.fill} 46%, ${c.ring} 100%)`,
        boxShadow: `inset 0 0 0 0.5px ${c.ring}, 0 0.5px 0 rgba(255,255,255,0.25)`,
        cursor: onClick ? 'pointer' : 'default',
      }}
    />
  );
}

export function TrafficLights({ onClose, size = 12 }: { onClose?: () => void; size?: number }) {
  return (
    <div
      data-no-drag
      style={{ display: 'flex', alignItems: 'center', gap: size * 0.67, transform: size !== 12 ? `scale(${size / 12})` : undefined, transformOrigin: 'left center' }}
    >
      <Light kind="close" onClick={onClose} />
      <Light kind="min" />
      <Light kind="zoom" />
    </div>
  );
}

/* ---------- drag + resize + focus ---------- */

let topZ = 20;

interface Geometry {
  left: number;
  top: number;
  width: number;
  height: number | null;
}

function useWindowController(opts: {
  draggable: boolean;
  resizable: 'width' | 'both' | false;
  initialWidth: number;
  initialHeight: number | null;
  minWidth: number;
  minHeight: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [geom, setGeom] = useState<Geometry | null>(null);
  const [zIndex, setZIndex] = useState(20);
  const dragState = useRef<{ startX: number; startY: number; left: number; top: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; width: number; height: number } | null>(null);

  const bringToFront = () => {
    topZ += 1;
    setZIndex(topZ);
  };

  const readCurrentGeometry = (): Geometry => {
    if (geom) return geom;
    const el = rootRef.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (el && parent) {
      const rect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      return {
        left: rect.left - parentRect.left,
        top: rect.top - parentRect.top,
        width: rect.width,
        height: opts.resizable === 'both' ? rect.height : null,
      };
    }
    return { left: 0, top: 0, width: opts.initialWidth, height: opts.initialHeight };
  };

  const onDragHandleDown = (e: React.MouseEvent) => {
    if (!opts.draggable) return;
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    bringToFront();
    const start = readCurrentGeometry();
    setGeom(start);
    dragState.current = { startX: e.clientX, startY: e.clientY, left: start.left, top: start.top };
    const onMove = (ev: MouseEvent) => {
      const d = dragState.current;
      if (!d) return;
      setGeom((g) => (g ? { ...g, left: d.left + (ev.clientX - d.startX), top: Math.max(0, d.top + (ev.clientY - d.startY)) } : g));
    };
    const onUp = () => {
      dragState.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
  };

  const onResizeHandleDown = (e: React.MouseEvent) => {
    if (!opts.resizable) return;
    bringToFront();
    const start = readCurrentGeometry();
    setGeom(start);
    resizeState.current = { startX: e.clientX, startY: e.clientY, width: start.width, height: start.height ?? opts.initialHeight ?? 300 };
    const onMove = (ev: MouseEvent) => {
      const r = resizeState.current;
      if (!r) return;
      const nextWidth = Math.max(opts.minWidth, r.width + (ev.clientX - r.startX));
      const nextHeight = opts.resizable === 'both' ? Math.max(opts.minHeight, r.height + (ev.clientY - r.startY)) : null;
      setGeom((g) => (g ? { ...g, width: nextWidth, height: nextHeight } : g));
    };
    const onUp = () => {
      resizeState.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
    e.stopPropagation();
  };

  const onFocusDown = () => {
    if (opts.draggable || opts.resizable) bringToFront();
  };

  return { rootRef, geom, zIndex, onDragHandleDown, onResizeHandleDown, onFocusDown };
}

/* ---------- resize grip ---------- */

function ResizeGrip({ dark, onMouseDown }: { dark?: boolean; onMouseDown: (e: React.MouseEvent) => void }) {
  return (
    <div
      onMouseDown={onMouseDown}
      data-no-drag
      style={{
        position: 'absolute',
        right: 2,
        bottom: 2,
        width: 16,
        height: 16,
        cursor: 'nwse-resize',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 3,
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" style={{ opacity: dark ? 0.45 : 0.35 }}>
        <g stroke={dark ? '#fff' : '#000'} strokeWidth="1">
          <line x1="8" y1="1" x2="1" y2="8" />
          <line x1="8" y1="4.5" x2="4.5" y2="8" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- window frame ---------- */

export function MacWindow({
  width,
  height,
  maxWidth = 'calc(100% - 48px)',
  alignSelf,
  dark,
  radius = 12,
  style,
  children,
  draggable = false,
  resizable = false,
  defaultLeft,
  defaultTop,
  centerX,
  minWidth = 320,
  minHeight = 220,
}: {
  width: number | string;
  /** Initial height, only meaningful when `resizable="both"` (otherwise height stays content-driven). */
  height?: number;
  maxWidth?: string;
  alignSelf?: CSSProperties['alignSelf'];
  dark?: boolean;
  radius?: number;
  style?: CSSProperties;
  children: ReactNode;
  /** Lets the window be moved by dragging its title bar. Requires a `position:relative` ancestor. */
  draggable?: boolean;
  /** Lets the window be resized from its bottom-right corner. 'both' also resizes height. */
  resizable?: 'width' | 'both' | false;
  /** CSS `left` used before the window is first dragged (e.g. '50%' paired with `centerX`). */
  defaultLeft?: string;
  /** CSS `top` (px) used before the window is first dragged. */
  defaultTop?: number;
  /** Horizontally centers on `defaultLeft` before the first drag (clears once dragged). */
  centerX?: boolean;
  minWidth?: number;
  minHeight?: number;
}) {
  const live = draggable || !!resizable;
  const ctl = useWindowController({
    draggable,
    resizable,
    initialWidth: typeof width === 'number' ? width : minWidth,
    initialHeight: height ?? null,
    minWidth,
    minHeight,
  });

  const posStyle: CSSProperties = live
    ? ctl.geom
      ? { position: 'absolute', left: ctl.geom.left, top: ctl.geom.top, transform: 'none' }
      : { position: 'absolute', left: defaultLeft, top: defaultTop, transform: centerX ? 'translateX(-50%)' : undefined }
    : { alignSelf };

  const sizeStyle: CSSProperties = live
    ? { width: ctl.geom?.width ?? width, height: ctl.geom?.height ?? height }
    : { width };

  return (
    <div
      ref={ctl.rootRef}
      onMouseDownCapture={ctl.onFocusDown}
      style={{
        ...posStyle,
        ...sizeStyle,
        maxWidth,
        zIndex: live ? ctl.zIndex : undefined,
        borderRadius: radius,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: dark ? '#1e1e22' : '#fff',
        boxShadow: dark
          ? '0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 70px rgba(0,0,0,0.6), 0 4px 14px rgba(0,0,0,0.35)'
          : '0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 70px rgba(0,0,0,0.45), 0 4px 14px rgba(0,0,0,0.16)',
        border: dark ? '0.5px solid rgba(0,0,0,0.6)' : '0.5px solid rgba(0,0,0,0.16)',
        fontFamily: FONT,
        ...style,
      }}
    >
      <DragContext.Provider value={live ? ctl.onDragHandleDown : null}>{children}</DragContext.Provider>
      {resizable && <ResizeGrip dark={dark} onMouseDown={ctl.onResizeHandleDown} />}
    </div>
  );
}

/* ---------- title bar ---------- */

export function TitleBar({
  title,
  dark,
  height = 44,
  onClose,
  leftExtra,
  right,
  titleAlign = 'center',
  onDragHandleDown,
}: {
  title: ReactNode;
  dark?: boolean;
  height?: number;
  onClose?: () => void;
  leftExtra?: ReactNode;
  right?: ReactNode;
  titleAlign?: 'center' | 'left';
  onDragHandleDown?: (e: React.MouseEvent) => void;
}) {
  const ctxDrag = useContext(DragContext);
  const dragHandler = onDragHandleDown ?? ctxDrag ?? undefined;
  return (
    <div
      onMouseDown={dragHandler}
      style={{
        height,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '0 14px',
        background: dark ? '#2c2c30' : 'linear-gradient(#f8f8f9,#ececee)',
        borderBottom: dark ? '0.5px solid #000' : '0.5px solid #d4d4d7',
        position: 'relative',
        cursor: dragHandler ? 'grab' : undefined,
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: right || leftExtra ? 'none' : undefined }}>
        <TrafficLights onClose={onClose} />
        {leftExtra && <div data-no-drag style={{ display: 'contents' }}>{leftExtra}</div>}
      </div>
      <div
        style={
          titleAlign === 'center'
            ? { position: 'absolute', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }
            : { flex: 1, minWidth: 0 }
        }
      >
        <span
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: dark ? '#e5e5e7' : '#3a3a3c',
            letterSpacing: -0.1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </span>
      </div>
      {right && (
        <div data-no-drag style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
          {right}
        </div>
      )}
    </div>
  );
}

/* ---------- shared controls ---------- */

export function ToolbarButton({
  children,
  onClick,
  active,
  dark,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  dark?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        height: 26,
        minWidth: 26,
        padding: '0 9px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        border: dark ? '0.5px solid #46464c' : '0.5px solid #c6c6c9',
        borderRadius: 6,
        fontSize: 12,
        cursor: 'pointer',
        color: active ? '#fff' : dark ? '#d4d4d8' : '#3a3a3c',
        background: active ? '#0a84ff' : dark ? '#323236' : '#fdfdfd',
        fontFamily: FONT,
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

export function SearchField({
  value,
  onChange,
  onKeyDown,
  placeholder,
  dark,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (key: string) => void;
  placeholder?: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        height: 27,
        padding: '0 9px',
        borderRadius: 7,
        background: dark ? '#323236' : '#ececed',
        border: dark ? '0.5px solid #46464c' : '0.5px solid #d6d6d9',
        ...style,
      }}
    >
      <IconSearch size={12} style={{ color: dark ? '#8a8a92' : '#9a9aa2' }} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onKeyDown?.(e.key)}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          border: 0,
          outline: 0,
          background: 'transparent',
          fontSize: 12.5,
          color: dark ? '#e5e5e7' : '#1c1c1e',
          fontFamily: FONT,
        }}
      />
    </div>
  );
}
