"use client";

import { useEffect, useRef, useState } from "react";

type PaypalOrderActions = {
  order: {
    create: (config: Record<string, unknown>) => Promise<string>;
    capture: () => Promise<{ id: string }>;
  };
};

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void };
    };
  }
}

let sdkPromise: Promise<void> | null = null;

function loadPaypalSdk(clientId: string, currency: string) {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&currency=${encodeURIComponent(currency)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
    document.body.appendChild(script);
  });
  return sdkPromise;
}

/**
 * Client-only PayPal Smart Button (no backend order endpoint — the order is
 * created and captured entirely in the browser via the JS SDK). Renders
 * once `clientId` is set in Settings → Payments in the CMS; until then
 * PayNowButton shows a "coming soon" message instead of mounting this.
 */
export default function PayPalButton({
  clientId,
  currency,
  amount,
  description,
  onSuccess,
  onError,
}: {
  clientId: string;
  currency: string;
  amount: number;
  description: string;
  onSuccess: (orderId: string) => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadPaypalSdk(clientId, currency)
      .then(() => {
        if (cancelled || !containerRef.current || !window.paypal) return;
        containerRef.current.innerHTML = "";
        window.paypal
          .Buttons({
            style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal" },
            createOrder: (_: unknown, actions: PaypalOrderActions) =>
              actions.order.create({
                purchase_units: [
                  {
                    description,
                    amount: { currency_code: currency, value: amount.toFixed(2) },
                  },
                ],
              }),
            onApprove: async (_: unknown, actions: PaypalOrderActions) => {
              const order = await actions.order.capture();
              onSuccess(order.id);
            },
            onError: () => onError(),
          })
          .render(containerRef.current);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, currency, amount, description]);

  if (loadFailed) {
    return (
      <p className="text-[13px] text-red-400 text-center">
        Couldn&apos;t load PayPal — please use WhatsApp instead.
      </p>
    );
  }

  return <div ref={containerRef} />;
}
