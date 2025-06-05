export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl">Página no encontrada.</p>
      <a href="/" className="text-blue-500 underline">
        Volver al inicio
      </a>
    </div>
  );
}
