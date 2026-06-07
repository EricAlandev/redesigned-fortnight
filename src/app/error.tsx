'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Ops! Algo deu errado.</h2>
      <p className="text-gray-500 mb-4">{error.message || "Não foi possível carregar a página."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#03859D] text-white rounded-md hover:bg-[#026c80] transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}