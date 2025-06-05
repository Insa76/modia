export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // En el navegador
    return "";
  }

  // En el servidor
  return process.env.BASE_URL || "http://localhost:3000";
}
