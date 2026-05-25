"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontFamily: 'sans-serif' 
      }}>
        <h2>Something went wrong!</h2>
        <button 
          onClick={() => reset()}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}