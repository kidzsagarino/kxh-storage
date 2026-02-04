"use client";

import { useEffect, useState } from "react";

const LS_KEY = "kxh_admin_settings_v1";

export function useAdminSettings<T>(defaults: T) {
  const [settings, setSettings] = useState<T>(defaults);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
  }, []);

  return settings;
}
