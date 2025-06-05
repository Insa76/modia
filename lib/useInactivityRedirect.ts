import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useInactivityRedirect(timeout: number = 60000, redirectPath = "/experience") {
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        router.push(redirectPath);
      }, timeout);
    };

    const events = ["mousemove", "mousedown", "keypress", "touchstart", "scroll"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Inicializa el timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };
  }, [router, timeout, redirectPath]);
}
