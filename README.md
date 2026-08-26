# NEXORA AI - Unified Productivity Workspace & AI Assistant Simulator

A high-fidelity, responsive, client-side React SaaS application mockup featuring an interactive AI workspace, bento-grid telemetry dashboard, and task management interfaces.

👉 **[Live Demo](https://nexora-ai-ab7a6.web.app)** | **[GitHub Repository](https://github.com/mgulraiz55-ux/nexora-ai)**

---

## 🚀 Live Demo
You can view the fully responsive live website here:  
**[https://nexora-ai-ab7a6.web.app](https://nexora-ai-ab7a6.web.app)**

---

## 📋 Project Overview
NEXORA AI is designed to showcase modern front-end engineering design patterns, clean component architectures, and responsive UI/UX designs. It models a unified workspace platform targeted at data-rich development environments.

The project was constructed as a portfolio-ready single-page application (SPA). It implements high-fidelity user workflows (such as creating mock projects, managing backlogs, chatting with document-context AI assistants, and viewing real-time SVG dashboard graphs) without backend overhead, ensuring fast load times and clean deployment.

---

## ✨ Key Features
* **Multi-View Navigation:** State-based layout switching between marketing landing/pricing views and core workspace layouts.
* **Interactive Bento Dashboard:** Dynamic charts, weekly focus metrics, task checklists, and immediate AI summary triggers.
* **AI Assistant Simulator:** Interactive chatbot with support for model selection, document-attachment contexts (CSV, PDF, Python scripts), structured analytical outputs, code snippet rendering, and contextual quick actions.
* **Projects & Tasks Backlog:** Live sprint boards with search queries, dual status-and-priority dropdown filtering, and quick-add inline task forms.
* **System & Telemetry Analytics:** SVG-rendered performance charts, real-time success logs, and agent distribution indicators.
* **Adaptive Navigation Layouts:** Responsive sidebar panel for desktop screens, collapsing bottom tabs, and slide-over drawer layouts optimized for mobile devices.
* **Accessibility Polish:** Proper keyboard accessibility, modal backdrop locks, and form accessibility mappings (`htmlFor` inputs / close button `aria-labels`).

---

## 🛠️ Tech Stack
* **UI Library:** React (v19.0.1)
* **Build System:** Vite (v6.2.3)
* **Styling Framework:** Tailwind CSS (v4.1.14) with customized CSS variables theme configs
* **Type System:** TypeScript (v5.8.2)
* **Icon Engine:** Lucide React (v0.546.0)
* **Development Helper:** tsx & esbuild compiler configurations

---

## ⚡ Performance & Quality (Lighthouse)
The project is built with static optimization and clean stylesheets, resulting in high Lighthouse performance scores:

* **Desktop:**
  * Performance: **99**
  * Accessibility: **100**
  * Best Practices: **100**
  * SEO: **100**
* **Mobile:**
  * Performance: **91**
  * Accessibility: **100**
  * Best Practices: **100**
  * SEO: **100**

---

## 📺 Application Views & Screens
1. **Landing Page (`LandingView`):** Marketing entry-point featuring ambient glow fields, feature grids, and interactive mockup dashboard visualizers.
2. **Pricing (`PricingView`):** Billing cycle toggle selector (Monthly/Yearly) and billing modal checkout simulation.
3. **Workspace Dashboard (`DashboardView`):** Focus metrics, task lists, and real-time activity feeds.
4. **AI Assistant (`WorkspaceView`):** File-upload simulation and structured response actions (insert chart, draft emails, create tasks).
5. **Backlog Tracker (`ProjectsView`):** Interactive status select updating and item filters.
6. **Analytics (`AnalyticsView`):** Live telemetry SVG visualizers and CPU resource distribution levels.
7. **Settings (`SettingsView`):** General timezone settings, model reasoning sliders, and mock client API keys.

---

## 📐 Architecture Notes
* **State-Driven Routing:** Rather than introducing bulky client-side routers that require server URL-rewrites on deployment hosting, navigation uses local React states in `src/App.tsx`.
* **Simulated AI Responses:** Chatbot and analysis actions utilize client-side timeout loops (`setTimeout`) to deliver high-fidelity UI previews. This keeps the application static, free to host, and secure from client-side API key exposure.
* **Body Scroll Management:** A custom React hook locks the page scroll (`overflow: hidden`) when modal dialog overlays are active and releases it cleanly on unmount.

---

## 💻 Local Development

### Prerequisites
* **Node.js** (v18 or higher recommended)

### 1. Clone & Setup
Clone the project repository:
```bash
git clone https://github.com/mgulraiz55-ux/nexora-ai.git
cd nexora-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
Launch the local Vite server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Production Build
To compile the project and bundle optimized assets:
```bash
npm run build
```
This generates the production-ready code in the `dist/` directory.

---

## ☁️ Deployment
The project is deployed using **Firebase Hosting** and mapped to static asset distributions:
* Deploy target: `dist`
* Hosting Provider: Firebase Hosting

---

## ✍️ Author
**Muhammad Gulraiz**  
GitHub: [@mgulraiz55-ux](https://github.com/mgulraiz55-ux)

---

## 🔗 Links
* **Live Website:** [https://nexora-ai-ab7a6.web.app](https://nexora-ai-ab7a6.web.app)
* **GitHub Repository:** [https://github.com/mgulraiz55-ux/nexora-ai](https://github.com/mgulraiz55-ux/nexora-ai)
