import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, suffix, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={id}
            className={cn(
              "w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 rounded-xl py-3 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200",
              icon ? "pl-11" : "pl-4",
              suffix ? "pr-11" : "pr-4",
              error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" : "",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3.5 flex items-center justify-center">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-400 font-medium mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
