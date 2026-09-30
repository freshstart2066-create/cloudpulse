export type HealthStatus = 'operational' | 'degraded' | 'incident' | 'restarting';

export interface EdgeRegion {
  id: string;
  name: string;
  location: string;
  code: string;
  latencyMs: number;
  status: HealthStatus;
  requestsPerSec: number;
  xPercent: number;
  yPercent: number;
}

export interface MetricSnapshot {
  timestamp: number;
  cpu: number;
  memory: number;
  network: number;
  iops: number;
  serverlessReqs: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  timeStr: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  statusCode: number;
  durationMs: number;
  region: string;
  traceId: string;
  message: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  service: string;
  region: string;
  status: 'active' | 'investigating' | 'resolved';
  triggeredAt: string;
  description: string;
  remediationStep: string;
}

export interface Microservice {
  id: string;
  name: string;
  type: string;
  uptimePercent: number;
  p99LatencyMs: number;
  errorRate: number;
  status: HealthStatus;
  replicaCount: number;
}
