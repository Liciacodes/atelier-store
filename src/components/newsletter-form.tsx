"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initial: SubscribeState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <form action={action} noValidate className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="type-caption text-muted">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={state.status === "error" || undefined}
          aria-describedby="newsletter-status"
          className="type-body h-12 min-w-0 flex-1 rounded-xs border border-divider bg-transparent px-4 placeholder:text-muted"
          placeholder="you@example.com"
        />
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Subscribing" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={`type-caption min-h-4 ${state.status === "error" ? "text-error" : "text-success"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
