import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EdgeRegion, 
  Microservice, 
  Incident, 
  LogEntry, 
  MetricSnapshot,
  HealthStatus 
} from '../types/cloud';
import { 
  INITIAL_REGIONS, 
  INITIAL_MICROSERVICES, 
  INITIAL_INCIDENTS,
  MOCK_PATHS 
} from '../data/mockCloudData';

interface ToastAlert {
  id: string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

interface CloudContextType {
  regions: EdgeRegion[];
  microservices: Microservice[];
  incidents: Incident[];
  logs: LogEntry[];
  metrics: MetricSnapshot;
  metricsHistory: MetricSnapshot[];
  activeCluster: string;
  setActiveCluster: (cluster: string) => void;
  
  // Actions
  remediateIncident: (id: string) => void;
  restartMicroservice: (id: string) => void;
  triggerChaosSpike: () => void;
  
  toasts: ToastAlert[];
  showToast: (message: string, type?: 'success' | 'danger' | 'warning' | 'info') => void;
}

const CloudContext = createContext<CloudContextType | null>(null);

export const CloudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regions, setRegions] = useState<EdgeRegion[]>(INITIAL_REGIONS);
  const [microservices, setMicroservices] = useState<Microservice[]>(INITIAL_MICROSERVICES);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [activeCluster, setActiveCluster] = useState<string>('production-us-east');

  const [metrics, setMetrics] = useState<MetricSnapshot>({
    timestamp: Date.now(),
    cpu: 42.8,
    memory: 64.2,
    network: 890.4,
    iops: 12450,
    serverlessReqs: 54620
  });

  const [metricsHistory, setMetricsHistory] = useState<MetricSnapshot[]>(() => {
    const list: MetricSnapshot[] = [];
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      list.push({
        timestamp: now - i * 2000,
        cpu: +(38 + Math.random() * 12).toFixed(1),
        memory: +(62 + Math.random() * 6).toFixed(1),
        network: +(820 + Math.random() * 140).toFixed(1),
        iops: Math.floor(11000 + Math.random() * 2500),
        serverlessReqs: Math.floor(52000 + Math.random() * 5000)
      });
    }
    return list;
  });

  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const list: LogEntry[] = [];
    const now = Date.now();
    for (let i = 25; i >= 0; i--) {
      const template = MOCK_PATHS[i % MOCK_PATHS.length];
      const isErr = Math.random() < 0.08;
      const status = isErr ? 500 : (template.method === 'POST' ? 201 : 200);
      const level = isErr ? 'ERROR' : (status === 201 ? 'SUCCESS' : 'INFO');
      const d = new Date(now - i * 600);
      const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;

      list.push({
        id: `log-${i}-${Date.now()}`,
        timestamp: now - i * 600,
        timeStr,
        level,
        method: template.method as any,
        path: template.path,
        statusCode: status,
        durationMs: template.duration + Math.floor(Math.random() * 12),
        region: INITIAL_REGIONS[i % INITIAL_REGIONS.length].code,
        traceId: `trc_${Math.random().toString(36).substring(2, 10)}`,
        message: isErr ? 'Internal Server Error: pool connection timeout' : 'Request completed successfully'
      });
    }
    return list;
  });

  const [toasts, setToasts] = useState<ToastAlert[]>([]);

  const showToast = (message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // High Frequency Log Streamer & Telemetry Metrics Ticker (Every 450ms)
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Generate live streaming log
      const template = MOCK_PATHS[Math.floor(Math.random() * MOCK_PATHS.length)];
      const isErr = Math.random() < 0.06;
      const status = isErr ? 500 : (template.method === 'POST' ? 201 : 200);
      const level = isErr ? 'ERROR' : (status === 201 ? 'SUCCESS' : 'INFO');
      const d = new Date();
      const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
      const region = INITIAL_REGIONS[Math.floor(Math.random() * INITIAL_REGIONS.length)].code;

      const newLog: LogEntry = {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        timeStr,
        level,
        method: template.method as any,
        path: template.path,
        statusCode: status,
        durationMs: template.duration + Math.floor(Math.random() * 14),
        region,
        traceId: `trc_${Math.random().toString(36).substring(2, 10)}`,
        message: isErr ? 'Upstream socket closed prematurely' : 'HTTP/2 200 OK'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 70)]);

      // 2. Fluctuate Live Telemetry
      const nextCpu = +(40 + Math.sin(Date.now() / 8000) * 12 + (Math.random() - 0.5) * 4).toFixed(1);
      const nextMem = +(63 + (Math.random() - 0.5) * 2).toFixed(1);
      const nextNet = +(880 + (Math.random() - 0.5) * 60).toFixed(1);
      const nextIops = Math.floor(12200 + (Math.random() - 0.5) * 1200);
      const nextReqs = Math.floor(54000 + (Math.random() - 0.5) * 4000);

      const snapshot: MetricSnapshot = {
        timestamp: Date.now(),
        cpu: nextCpu,
        memory: nextMem,
        network: nextNet,
        iops: nextIops,
        serverlessReqs: nextReqs
      };

      setMetrics(snapshot);
      setMetricsHistory(prev => [...prev.slice(1), snapshot]);

    }, 450);

    return () => clearInterval(interval);
  }, []);

  const remediateIncident = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        showToast(`✅ Incident [${inc.id}] auto-remediation completed: Pod autoscaled!`, 'success');
        return { ...inc, status: 'resolved' };
      }
      return inc;
    }));

    // Reset degraded region & microservices
    setRegions(prev => prev.map(r => ({ ...r, status: 'operational' })));
    setMicroservices(prev => prev.map(s => ({ ...s, status: 'operational' })));
  };

  const restartMicroservice = (id: string) => {
    const svc = microservices.find(s => s.id === id);
    if (!svc) return;

    setMicroservices(prev => prev.map(s => s.id === id ? { ...s, status: 'restarting' } : s));
    showToast(`🔄 Rolling restart triggered for ${svc.name}...`, 'info');

    setTimeout(() => {
      setMicroservices(prev => prev.map(s => s.id === id ? { ...s, status: 'operational', uptimePercent: 100.0, errorRate: 0.0 } : s));
      showToast(`✨ ${svc.name} successfully restarted with 0 downtime.`, 'success');
    }, 2000);
  };

  const triggerChaosSpike = () => {
    showToast('🚨 Simulated Chaos Spike injected into US-East Edge!', 'danger');
    setMetrics(prev => ({
      ...prev,
      cpu: 94.2,
      memory: 89.4,
      network: 2450.8,
      iops: 38900
    }));

    const chaosIncident: Incident = {
      id: `inc-${Date.now().toString().slice(-4)}`,
      title: 'DDoS Traffic Anomaly Spike Detected on Edge Gateway',
      severity: 'critical',
      service: 'Global Cloudflare CDN Edge Workers',
      region: 'us-east-1',
      status: 'active',
      triggeredAt: 'Just now',
      description: 'Incoming HTTP request throughput surged to 240,000 req/sec; rate limit threshold exceeded.',
      remediationStep: 'Activate Cloudflare Under Attack Mode & rate limit rogue IP blocks'
    };

    setIncidents(prev => [chaosIncident, ...prev]);
  };

  return (
    <CloudContext.Provider
      value={{
        regions,
        microservices,
        incidents,
        logs,
        metrics,
        metricsHistory,
        activeCluster,
        setActiveCluster,
        remediateIncident,
        restartMicroservice,
        triggerChaosSpike,
        toasts,
        showToast
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};

export const useCloud = () => {
  const context = useContext(CloudContext);
  if (!context) {
    throw new Error('useCloud must be used within a CloudProvider');
  }
  return context;
};
