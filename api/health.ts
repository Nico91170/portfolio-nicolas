// Vercel Serverless Function - Health Check & Uptime Monitoring

interface ApiRequest {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  setHeader: (name: string, value: string | string[]) => void;
  status: (statusCode: number) => {
    json: (body: Record<string, unknown>) => void;
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  // Anti-cache headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Allow only GET or HEAD
  if (req.method && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'HEAD', 'OPTIONS']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  return res.status(200).json({
    status: 'healthy',
    uptime: process.uptime ? Math.floor(process.uptime()) : 0,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    service: 'portfolio-backend-api',
  });
}
