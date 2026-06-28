import { useState, useEffect } from "react";

export function SevillaClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const sev = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }),
      );
      setTime(
        sev.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums tracking-wider text-coral">
      SEV → {time || "--:--"}
    </span>
  );
}
