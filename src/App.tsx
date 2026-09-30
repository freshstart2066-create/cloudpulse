import React from 'react';
import { CloudProvider } from './context/CloudContext';
import { Header } from './components/layout/Header';
import { MetricsGauges } from './components/metrics/MetricsGauges';
import { SLAGaugeCard } from './components/metrics/SLAGaugeCard';
import { GlobalEdgeMap } from './components/map/GlobalEdgeMap';
import { LiveLogStream } from './components/logs/LiveLogStream';
import { IncidentCenter } from './components/incidents/IncidentCenter';
import { ServiceHealthGrid } from './components/services/ServiceHealthGrid';
import { ToastContainer } from './components/ui/ToastContainer';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col justify-between font-sans select-none overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* Real-Time Telemetry Gauges */}
        <MetricsGauges />

        {/* SLA & Reliability Compliance */}
        <SLAGaugeCard />

        {/* Mid Grid: Global Edge Map & Incident Auto-Remediation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalEdgeMap />
          <IncidentCenter />
        </div>

        {/* Lower Grid: Microservices Table & Live Log Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServiceHealthGrid />
          <LiveLogStream />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0c0e14] border-t border-[#232838] py-4 px-6 text-center text-xs text-zinc-500 font-mono">
        © 2026 CloudPulse Systems • Enterprise OpenTelemetry & Self-Healing SRE Platform
      </footer>

      {/* Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CloudProvider>
      <AppContent />
    </CloudProvider>
  );
};
