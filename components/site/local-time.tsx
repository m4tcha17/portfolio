"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Minute precision: the string only changes once a minute, so re-renders stay rare. */
function getSnapshot() {
  return formatter.format(new Date());
}

/** No clock on the server (static prerender): an invisible placeholder reserves the width. */
function getServerSnapshot() {
  return null;
}

/** Current time in the Philippines (Asia/Manila), ticking live in the browser. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (time === null) {
    return (
      <span aria-hidden className={`invisible tabular-nums ${className ?? ""}`}>
        12:00 PM
      </span>
    );
  }

  return (
    <time className={`tabular-nums ${className ?? ""}`}>{time}</time>
  );
}
