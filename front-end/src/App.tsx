import React, { useState } from 'react';

import './App.css';
import Map from './components/Map';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton, SidebarMenu, SidebarMenuItem, SidebarMenuSubItem, SidebarMenuSub } from './components/ui/sidebar';
import FilterForm from './components/sidebarComponents/FilterForm';
import OpacitySlider from './components/sidebarComponents/OpacitySlider';
import { Point } from './components/mapComponents/HeatmapLayer';
import { ChevronDown, BookOpen, Sliders, Filter, Bell } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { set } from 'date-fns';

const App: React.FC = () => {
  // Default to Arlington coordinates
  const [mapCenter, setMapCenter] = useState<Point>([32.7357, -97.1081]);
  const [heatOpacity, setHeatOpacity] = useState(0.6);
  const [notifications, setNotifications] = useState(0);
  const [open, setOpen] = React.useState(false)

  const handleZipCodeSubmit = (zipCoord: Point) => {
    setMapCenter(zipCoord);
  };
  const addNotification = () => {
    setNotifications((prev) => prev + 1);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-24 ${open ? 'left-[16rem]' : 'left-4'
          } z-50 bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg transition-all duration-300`}
      >
        {open ? '←' : '→'}
      </button>
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
          } w-64`}>

          {/* Sidebar Header */}
          <SidebarHeader>
            Sidebar Menu
            {/* <h2 className="text-lg font-bold">Sidebar Menu</h2> */}
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent>
            <SidebarMenuButton>
                  
                  <div className="flex items-center">
                    <button
                      className="relative p-2"
                      onClick={addNotification}
                      aria-label="Notifications"
                    >
                      <Bell />
                      {notifications > 0 && (
                        <span className="absolute top-0 left-10 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </button>
                  </div>
                </SidebarMenuButton>
            <SidebarMenu>
              <Collapsible defaultOpen={false} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Filter />
                      <span>Filter</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem />
                      <FilterForm onZipCodeSubmit={handleZipCodeSubmit} />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Heatmap Setting Group */}
              <Collapsible defaultOpen={false} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Sliders />
                      <span>Heatmap Setting</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem />
                      <OpacitySlider opacity={heatOpacity} setOpacity={setHeatOpacity} />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            {/* View Documentation Menu Button */}
            <SidebarMenuButton asChild>
              <a
                href="https://docs.google.com/document/d/1V6Ar4Mgx3md5B1XrWJUrkpiUZV7W1wLOLsVxWnYAyUA/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <BookOpen />
                <span>View Documentation</span>
              </a>
            </SidebarMenuButton>
          </SidebarContent>
        </Sidebar>
        {/* Heat Map */}
        <div className="flex-grow relative">
          <Map heatOpacity={heatOpacity} position={mapCenter} />
        </div>
      </SidebarProvider>
    </>
  );
};
export default App;
