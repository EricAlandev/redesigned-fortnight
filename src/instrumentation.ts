export async function register() {
    // This code ONLY runs on the server side
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      // We import your worker file here
      await import('@/workers/WorkerAvaliations'); 
      console.log("CRON WORKER: Initialized successfully");
    }
  }