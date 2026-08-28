"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PLATFORM_SETTINGS,
  calculateProjectFinancials,
  type PlatformSettings,
  type ProjectFinancials,
} from "@/lib/platform-config";

const STORAGE_KEY = "weconnect.platform-settings";

interface PlatformSettingsContextValue {
  settings: PlatformSettings;
  updateSettings: (patch: Partial<PlatformSettings>) => void;
  resetSettings: () => void;
  /** Financial breakdown using the currently configured commission rate. */
  financialsFor: (budget: number) => ProjectFinancials;
}

const PlatformSettingsContext = createContext<PlatformSettingsContextValue | null>(null);

export function PlatformSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_PLATFORM_SETTINGS);

  // Read persisted values after mount so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_PLATFORM_SETTINGS, ...JSON.parse(raw) });
    } catch {
      // Ignore unreadable storage and keep defaults.
    }
  }, []);

  const persist = useCallback((next: PlatformSettings) => {
    setSettings(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage failures should not break the UI.
    }
  }, []);

  const updateSettings = useCallback(
    (patch: Partial<PlatformSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore.
        }
        return next;
      });
    },
    []
  );

  const resetSettings = useCallback(() => persist(DEFAULT_PLATFORM_SETTINGS), [persist]);

  const value = useMemo<PlatformSettingsContextValue>(
    () => ({
      settings,
      updateSettings,
      resetSettings,
      financialsFor: (budget: number) =>
        calculateProjectFinancials(budget, settings.projectCommissionPercentage),
    }),
    [settings, updateSettings, resetSettings]
  );

  return (
    <PlatformSettingsContext.Provider value={value}>{children}</PlatformSettingsContext.Provider>
  );
}

export function usePlatformSettings(): PlatformSettingsContextValue {
  const ctx = useContext(PlatformSettingsContext);
  if (!ctx) {
    throw new Error("usePlatformSettings must be used within a PlatformSettingsProvider");
  }
  return ctx;
}

/** Convenience hook for pages that only need the money breakdown. */
export function useProjectFinancials(budget: number): ProjectFinancials {
  const { settings } = usePlatformSettings();
  return calculateProjectFinancials(budget, settings.projectCommissionPercentage);
}
