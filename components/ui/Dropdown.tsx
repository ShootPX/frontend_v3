"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropdownOption = { value: string; label: string };

type DropdownProps = {
  /** Text shown on the button (usually the selected option's label). */
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the control, e.g. "Filter by tool". */
  ariaLabel: string;
  /** Return false to keep the panel open after picking (e.g. a "Custom" range). */
  closeOnSelect?: (value: string) => boolean;
  /** Stretch to the width of the container (form fields), label left, chevron right. */
  fullWidth?: boolean;
  /** Extra content under the options; receives `close` to dismiss the panel. */
  footer?: (helpers: { close: () => void }) => ReactNode;
};

/** Dark-themed listbox dropdown: arrows, Home/End, Enter/Space, Esc and outside-click. */
export function Dropdown({ label, options, value, onChange, ariaLabel, closeOnSelect, footer, fullWidth = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  function openPanel() {
    setActive(selectedIndex);
    setOpen(true);
  }

  // Closing from the keyboard or a pick hands focus back to the button.
  const [focusTick, setFocusTick] = useState(0);
  function close() {
    setOpen(false);
    setFocusTick((t) => t + 1);
  }

  useEffect(() => {
    if (focusTick > 0) buttonRef.current?.focus();
  }, [focusTick]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function pick(i: number) {
    const opt = options[i];
    if (!opt) return;
    onChange(opt.value);
    if (closeOnSelect ? closeOnSelect(opt.value) : true) close();
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openPanel();
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(active);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${ariaLabel}: ${label}`}
        onClick={() => (open ? setOpen(false) : openPanel())}
        onKeyDown={onButtonKeyDown}
        className={`flex items-center gap-2 border bg-surface text-text outline-none hover:border-accent focus-visible:border-accent ${
          fullWidth ? "w-full justify-between px-3 py-[11px] text-[13px]" : "py-2.5 pl-3.5 pr-3 text-[12.5px]"
        } ${open ? "border-accent" : "border-border"}`}
      >
        <span className="truncate">{label}</span>
        <ChevronDown size={13} className={`text-dim transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`absolute left-0 top-[calc(100%+4px)] z-20 border ${fullWidth ? "w-full" : "min-w-[220px]"} border-border-strong bg-surface shadow-[0_12px_30px_rgba(0,0,0,0.5)]`}>
          <div
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            aria-label={ariaLabel}
            aria-activedescendant={`${id}-${active}`}
            onKeyDown={onListKeyDown}
            className="max-h-72 overflow-y-auto outline-none"
          >
            {options.map((o, i) => (
              <div
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-[13px] ${
                  i === active ? "bg-surface-2" : ""
                } ${o.value === value ? "text-accent" : "text-text"}`}
              >
                <span className="truncate">{o.label}</span>
                {o.value === value && <Check size={13} className="flex-none" />}
              </div>
            ))}
          </div>
          {footer?.({ close })}
        </div>
      )}
    </div>
  );
}
