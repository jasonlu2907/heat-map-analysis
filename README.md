# AFRAM Frontend Documentation

This is the front-end application for the AFRAM (Arlington Fire Risk Assessment Map) project, a web-based visualization tool for fire risk assessment in Arlington, Texas.

## Tech Stack

- **React**: Core framework for building the user interface
- **TypeScript**: For type-safe JavaScript development
- **Leaflet & React-Leaflet**: For interactive map functionality
  - `leaflet-geosearch`: For location search capabilities
  - `leaflet.heat`: For heatmap visualization
- **Tailwind CSS**: For styling and responsive design
- **Radix UI**: For accessible UI components
  - Collapsible
  - Popover
  - Switch
- **Lucide React**: For modern icons

## Features

- 📍 Interactive map with multiple visualization layers:
  - ZIP code borders
  - Risk heatmap overlay
  - Grid cell visualization
- 🔍 Location search with OpenStreetMap integration
- 📱 Responsive sidebar with:
  - Real-time risk notifications
  - Layer visibility controls
  - Color-coded grid settings
- 🎨 Dynamic risk visualization with:
  - Heatmap overlay
  - Color-coded grid cells
  - ZIP code boundary highlighting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd front-end
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or your configured port).

## Project Structure

```
front-end/
├── src/
│   ├── components/
│   │   ├── mapComponents/     # Map-related components
│   │   ├── sidebarComponents/ # Sidebar-related components
│   │   ├── ui/               # Reusable UI components
│   │   └── ...
│   ├── assets/               # Static assets and data
│   ├── utils/                # Utility functions
│   └── ...
└── ...
```

## Features in Detail

### Map Visualization

- Multiple layer support with configurable visibility
- Interactive ZIP code boundaries
- Dynamic risk heatmap overlay
- Color-coded grid cells for risk visualization
- Custom markers for highlighted locations

### Search Functionality

- Address search with OpenStreetMap integration
- Automatic map centering and zooming
- Custom marker placement

### Risk Notifications

- Real-time risk level display
- Interactive notification system
- Click-to-view on map functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

## Acknowledgments

- OpenStreetMap for map data
- Leaflet for map visualization
- All contributors to the project
