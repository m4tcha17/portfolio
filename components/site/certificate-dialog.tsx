"use client";

import Image from "next/image";
import { XIcon } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { useRef, type ReactNode } from "react";

/**
 * Achievement row that opens its certificate photo in a modal (native <dialog>: focus trap, Esc to close). Clicking
 * the backdrop or the close button also closes it. Page scroll pauses (Lenis) while it is open. Fades/zooms in on
 * open; instant under prefers-reduced-motion.
 */
export function CertificateDialog({
  src,
  alt,
  className,
  children,
}: {
  /** Image path in public/, e.g. "/certificates/philnits.jpg". */
  src: string;
  alt: string;
  className?: string;
  /** Row content, rendered inside the trigger button. */
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          lenis?.stop();
        }}
        className={className}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        data-lenis-prevent
        onClose={() => lenis?.start()}
        onClick={(event) => {
          // Clicks on the dialog element itself (not its content) land on the backdrop area.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[90svh] max-w-[min(90vw,64rem)] overflow-visible bg-transparent p-0 outline-none backdrop:bg-background/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-300 motion-reduce:open:animate-none"
      >
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            sizes="(min-width: 1024px) 64rem, 90vw"
            className="h-auto max-h-[85svh] w-auto rounded-lg ring-1 ring-foreground/10"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => dialogRef.current?.close()}
            className="absolute -top-3 -right-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <XIcon weight="bold" aria-hidden className="size-4" />
          </button>
        </div>
      </dialog>
    </>
  );
}
