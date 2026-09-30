import { EdgeRegion, Microservice, Incident, LogEntry } from '../types/cloud';

export const INITIAL_REGIONS: EdgeRegion[] = [
  {
    id: 'us-east-1',
    name: 'US East (N. Virginia)',
    location: 'Ashburn, USA',
    code: 'IAD',
    latencyMs: 14,
    status: 'operational',
    requestsPerSec: 14280,
    xPercent: 28,
    yPercent: 36
  },
  {
    id: 'us-west-2',
    name: 'US West (Oregon)',
    location: 'Portland, USA',
    code: 'PDX',
    latencyMs: 22,
    status: 'operational',
    requestsPerSec: 9840,
    xPercent: 18,
    yPercent: 34
  },
  {
    id: 'eu-central-1',
    name: 'Europe (Frankfurt)',
    location: 'Frankfurt, Germany',
    code: 'FRA',
    latencyMs: 28,
    status: 'operational',
    requestsPerSec: 11450,
    xPercent: 52,
    yPercent: 30
  },
  {
    id: 'ap-northeast-1',
    name: 'Asia Pacific (Tokyo)',
    location: 'Tokyo, Japan',
    code: 'NRT',
    latencyMs: 42,
    status: 'operational',
    requestsPerSec: 8640,
    xPercent: 82,
    yPercent: 38
  },
  {
    id: 'ap-southeast-1',
    name: 'Asia Pacific (Singapore)',
    location: 'Singapore',
    code: 'SIN',
    latencyMs: 56,
    status: 'degraded',
    requestsPerSec: 6210,
    xPercent: 76,
    yPercent: 62
  },
  {
    id: 'sa-east-1',
    name: 'South America (São Paulo)',
    location: 'São Paulo, Brazil',
    code: 'GRU',
    latencyMs: 68,
    status: 'operational',
    requestsPerSec: 4120,
    xPercent: 36,
    yPercent: 72
  }
];

export const INITIAL_MICROSERVICES: Microservice[] = [
  {
    id: 'svc-auth',
    name: 'Authentication API & JWT Gateway',
    type: 'Go / gRPC',
    uptimePercent: 99.99,
    p99LatencyMs: 18,
    errorRate: 0.01,
    status: 'operational',
    replicaCount: 8
  },
  {
    id: 'svc-payments',
    name: 'Stripe Payment Processor & Webhooks',
    type: 'Node.js / Express',
    uptimePercent: 99.95,
    p99LatencyMs: 64,
    errorRate: 0.04,
    status: 'operational',
    replicaCount: 6
  },
  {
    id: 'svc-vector',
    name: 'Vector Database & Semantic Index (Milvus)',
    type: 'C++ / Rust',
    uptimePercent: 99.82,
    p99LatencyMs: 112,
    errorRate: 0.28,
    status: 'degraded',
    replicaCount: 4
  },
  {
    id: 'svc-cache',
    name: 'Distributed Redis Memory Cluster',
    type: 'In-Memory Store',
    uptimePercent: 100.0,
    p99LatencyMs: 3,
    errorRate: 0.0,
    status: 'operational',
    replicaCount: 12
  },
  {
    id: 'svc-edge',
    name: 'Global Cloudflare CDN Edge Workers',
    type: 'V8 Isolate Engine',
    uptimePercent: 99.99,
    p99LatencyMs: 12,
    errorRate: 0.02,
    status: 'operational',
    replicaCount: 24
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1029',
    title: 'High Latency Spike in Asia Pacific Edge Worker',
    severity: 'high',
    service: 'Vector Database & Semantic Index',
    region: 'ap-southeast-1',
    status: 'active',
    triggeredAt: '2 mins ago',
    description: 'Memory threshold exceeded 88% on node ap-sin-04; query latency climbed to 240ms.',
    remediationStep: 'Trigger auto-scale replica pool & flush ephemeral query cache'
  },
  {
    id: 'inc-1028',
    title: 'PostgreSQL Read-Replica Connection Pool Near Saturation',
    severity: 'medium',
    service: 'Authentication API & JWT Gateway',
    region: 'us-east-1',
    status: 'investigating',
    triggeredAt: '14 mins ago',
    description: 'Active connections reached 840/1000 pool capacity during morning traffic spike.',
    remediationStep: 'Expand max client connection limits on PgBouncer proxy'
  }
];

export const MOCK_PATHS = [
  { method: 'GET', path: '/api/v1/user/profile', duration: 16 },
  { method: 'POST', path: '/api/v1/checkout/session', duration: 84 },
  { method: 'GET', path: '/api/v1/vector/search?q=ml_models', duration: 112 },
  { method: 'POST', path: '/api/v1/auth/token/refresh', duration: 22 },
  { method: 'GET', path: '/healthz', duration: 4 },
  { method: 'DELETE', path: '/api/v1/cart/items/item_9021', duration: 32 },
  { method: 'POST', path: '/api/v1/webhooks/stripe', duration: 48 }
];
