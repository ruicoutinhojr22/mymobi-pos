# 🚀 FlowBuilder - No-Code Automation Platform

A modern, production-ready no-code automation platform that allows users to visually build workflows by connecting integrations in a drag-and-drop interface. Similar to n8n, Zapier, and Make.com.

![FlowBuilder Demo](https://via.placeholder.com/800x400/6366f1/ffffff?text=FlowBuilder+Demo)

## ✨ Features

### 🎨 Visual Workflow Builder

- **Drag-and-Drop Canvas**: Intuitive interface for building automation workflows
- **Visual Connections**: Connect workflow steps with animated connection lines
- **Real-time Positioning**: Move and arrange workflow steps dynamically
- **Canvas Grid**: Professional grid background for precise positioning

### 🔌 Integration Library

- **Pre-built Integrations**: Gmail, Slack, HTTP Request, Google Sheets, PayPal, Webhooks
- **Categorized Organization**: Triggers, Actions, and Logic categories
- **Search & Filter**: Quickly find the integrations you need
- **Drag-and-Drop**: Seamlessly add integrations to your workflow

### ⚙️ Step Configuration

- **Dynamic Configuration**: Each integration has its own configuration panel
- **Field Types**: Text, textarea, select, JSON, boolean, number inputs
- **Real-time Validation**: Instant feedback on configuration errors
- **Help Text**: Contextual help for each configuration field

### 💾 Workflow Management

- **Save/Load Workflows**: Export workflows as JSON files
- **Workflow Execution**: Simulate workflow runs with status tracking
- **Status Management**: Track workflows as draft, active, or paused
- **Workflow Library**: Manage multiple workflows in a clean interface

### 🎯 Modern UI/UX

- **Custom Theme**: Professional purple-based automation platform design
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Canvas**: Professional workflow canvas with subtle grid pattern
- **Status Indicators**: Clear visual feedback for all workflow states

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety throughout the application
- **Vite** - Lightning fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework with custom theme
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible, unstyled component library
- **React Router** - Client-side routing for SPA navigation

### Backend

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe backend development
- **CORS** - Cross-origin resource sharing configuration
- **RESTful API** - Clean API design for workflow management

### Development

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Hot Reload** - Both client and server hot reloading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/flowbuilder.git
   cd flowbuilder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

## 📖 Usage

### Creating Your First Workflow

1. **Add a Trigger**: Drag a trigger integration (like Webhook) from the left sidebar to the canvas
2. **Configure the Trigger**: Click on the trigger step and configure it in the right panel
3. **Add Actions**: Drag action integrations (like Gmail, Slack) to the canvas
4. **Connect Steps**: Click the connection button on a step and drag to another step
5. **Configure Actions**: Set up each action step with the required parameters
6. **Save Workflow**: Export your workflow or use the save functionality

### Available Integrations

| Integration        | Type    | Description                              |
| ------------------ | ------- | ---------------------------------------- |
| 🔗 Webhook Trigger | Trigger | Start workflows when webhooks are called |
| 📧 Gmail           | Action  | Send emails via Gmail                    |
| 💬 Slack           | Action  | Send messages to Slack channels          |
| 🌐 HTTP Request    | Action  | Make HTTP requests to any API            |
| 📊 Google Sheets   | Action  | Add data to Google Sheets                |
| 💳 PayPal          | Action  | Process PayPal payments                  |

## 🔧 API Documentation

### Workflow Endpoints

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| GET    | `/api/workflows`             | Get all workflows     |
| GET    | `/api/workflows/:id`         | Get specific workflow |
| POST   | `/api/workflows`             | Create new workflow   |
| PUT    | `/api/workflows/:id`         | Update workflow       |
| DELETE | `/api/workflows/:id`         | Delete workflow       |
| POST   | `/api/workflows/:id/execute` | Execute workflow      |

### Example API Usage

```javascript
// Create a new workflow
const response = await fetch('/api/workflows', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Automation',
    description: 'Automated email processing',
    nodes: [...],
    connections: [...]
  })
});
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── workflow/      # Workflow-specific components
│   ├── pages/             # Route components
│   ├── lib/               # Utilities and helpers
│   └── hooks/             # Custom React hooks
├── server/                # Express backend
│   ├── routes/            # API route handlers
│   └── index.ts           # Server setup
├── shared/                # Shared types and utilities
└── public/                # Static assets
```

## 🎨 Customization

### Adding New Integrations

1. **Define Integration Type**

   ```typescript
   // shared/types.ts
   export type IntegrationType = "gmail" | "slack" | "your-integration";
   ```

2. **Add Integration Definition**

   ```typescript
   // client/lib/integrations.ts
   export const INTEGRATIONS: Integration[] = [
     {
       id: "your-integration",
       name: "Your Integration",
       type: "your-integration",
       description: "Description of your integration",
       icon: "YourIcon",
       color: "hsl(120, 100%, 50%)",
       category: "action",
       fields: [...]
     }
   ];
   ```

3. **Add Icon Mapping**
   ```typescript
   // client/components/workflow/WorkflowNode.tsx
   const iconMap = {
     "your-integration": YourIcon,
     // ... other icons
   };
   ```

### Customizing Theme

Edit the color variables in `client/global.css`:

```css
:root {
  --primary: 262 83% 58%; /* Purple primary color */
  --workflow-canvas: 240 10% 3.9%; /* Dark canvas background */
  --connection-line: 262 83% 58%; /* Connection line color */
  /* Add your custom colors */
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck
```

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for your changes
5. Ensure tests pass: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint/Prettier)
- Write tests for new features
- Update documentation as needed

## 🚢 Deployment

### Docker

```bash
# Build Docker image
docker build -t flowbuilder .

# Run container
docker run -p 8080:8080 flowbuilder
```

### Vercel/Netlify

The project includes configuration for easy deployment to Vercel or Netlify:

- `netlify.toml` - Netlify configuration
- Vercel deployment works out of the box

### Self-hosted

```bash
npm run build
npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- 📧 Email: support@flowbuilder.com
- 💬 Discord: [Join our community](https://discord.gg/flowbuilder)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/flowbuilder/issues)
- 📖 Documentation: [Full docs](https://docs.flowbuilder.com)

## 🙏 Acknowledgments

- Inspired by [n8n](https://n8n.io) and [Zapier](https://zapier.com)
- Built with amazing open-source tools
- Special thanks to the React and Node.js communities

## 🗺 Roadmap

- [ ] **Real Integration Execution** - Actually execute workflows with real APIs
- [ ] **User Authentication** - Multi-user support with authentication
- [ ] **Workflow Scheduling** - Time-based and event-based triggers
- [ ] **Error Handling** - Advanced error handling and retry mechanisms
- [ ] **Workflow Templates** - Pre-built workflow templates
- [ ] **Real-time Monitoring** - Live workflow execution monitoring
- [ ] **Plugin System** - Allow custom integrations via plugins
- [ ] **Collaboration** - Team workflows and sharing
- [ ] **Version Control** - Workflow versioning and rollback
- [ ] **Performance Analytics** - Detailed execution analytics


