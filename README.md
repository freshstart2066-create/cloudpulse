# ☁️ CloudPulse — Real-Time Cloud Infrastructure & Serverless Observability Platform

**CloudPulse** is a cloud infrastructure telemetry and observability dashboard built with **React 18, TypeScript, Tailwind CSS, and Vite**. It features real-time cluster telemetry gauges with live SVG sparklines, an interactive global edge node mesh map, high-throughput serverless invocation log streams, and an automated incident remediation triage center.

---

## ⚡ Key Engineering Features

- **Live Telemetry & Resource Gauges**: Real-time monitoring of CPU load %, memory pool allocation, network throughput (MB/s), and serverless invocations with dynamic SVG sparkline charts.
- **Global Edge Node Mesh**: Interactive visual topology map tracking 6 worldwide edge PoPs (*Ashburn, Portland, Frankfurt, Tokyo, Singapore, São Paulo*) with live ping latency and throughput indicators.
- **High-Frequency Serverless Invocations Stream**: Real-time log terminal streaming HTTP/2 requests with status codes (200, 201, 500), execution duration, trace IDs, and multi-level filtering.
- **Automated Incident Triage & Self-Healing**: Real-time incident alert stream with 1-click auto-remediation triggers that dynamically autoscale pods and flush degraded caches.
- **Chaos Engineering Simulator**: Injects artificial traffic spikes and DDoS surges to test system resiliency and automated alerting.
- **Microservices Health Grid**: Microservice mesh status table with live p99 latency counters and 0-downtime rolling restart actions.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons & UI**: Lucide React, JetBrains Mono font
- **Bundler & Build**: Vite 6, PostCSS, Autoprefixer
- **State Management**: Reactive React Context with simulated high-frequency event loop
- **Deployment**: Vercel ready (`vercel.json` SPA routing)

---

## 💼 Resume Bullet Points

```markdown
• Developed CloudPulse, a real-time cloud infrastructure observability platform featuring live cluster telemetry gauges, SVG sparklines, and global edge node latency monitoring using React 18, TypeScript, and Tailwind CSS.
• Built a high-frequency serverless log streaming terminal handling sub-second trace ingestion, status code classification, and multi-criteria log filtering.
• Implemented an automated incident triage and self-healing engine with 1-click pod auto-remediation and chaos engineering traffic injection simulations.
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/freshstart2066-create/cloudpulse.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📜 License

MIT License © 2026 CloudPulse Systems.
