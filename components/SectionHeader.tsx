import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  action?: {
    href: string;
    label: string;
  };
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 pb-6">
      <h2 className="whitespace-nowrap text-[32px] font-bold text-slate-lightest md:text-[46px]">/ {title}</h2>
      <span
        aria-hidden="true"
        className={cn("hidden h-px flex-1 bg-navy-lightest md:block", !action && "max-w-[300px]")}
      />
      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex basis-full items-center whitespace-nowrap text-lg text-mint transition-colors hover:text-slate-lightest md:basis-auto"
        >
          {action.label}
          <span className="ml-2 text-xl transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}
