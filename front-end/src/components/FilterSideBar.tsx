import React, { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
} from './ui/sidebar';
import FilterForm from './sidebarComponents/FilterForm';
import OpacitySlider from './sidebarComponents/OpacitySlider';
import { ChevronDown, BookOpen, Sliders, Filter, Bell } from 'lucide-react'; // Importing icons
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import { Point } from './mapComponents/HeatmapLayer';
import Map from './Map';

interface FilterSidebarWrapperProps {
  mapCenter: Point;
  setMapCenter: (coords: Point) => void;
  heatOpacity: number;
  setHeatOpacity: (opacity: number) => void;
}

const FilterSidebarWrapper: React.FC<FilterSidebarWrapperProps> = ({
  mapCenter,
  setMapCenter,
  heatOpacity,
  setHeatOpacity,
}) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  const handleZipCodeSubmit = (zipCoord: Point) => {
    setMapCenter(zipCoord);
  };

  const addNotification = () => {
    setNotifications((prev) => prev + 1);
  };

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-24 ${
          open ? 'left-[16rem]' : 'left-4'
        } z-50 bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg transition-all duration-300`}
      >
        {open ? '←' : '→'}
      </button>

      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        } w-64`}
      >
        {/* Sidebar Header */}
        <SidebarHeader>
          <h2 className='text-lg font-semibold mb-6'>Sidebar Menu</h2>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          {/* Notifications Button */}
          <div className='flex items-center'>
            <button
              className='relative p-2'
              onClick={addNotification}
              aria-label='Notifications'
            >
              <Bell />
              {notifications > 0 && (
                <span className='absolute top-0 left-10 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <SidebarMenu className='mt-4'>
            {/* Filter */}
            <Collapsible defaultOpen={false} className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton isActive>
                    <Filter />
                    <span>Filter</span>
                    <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <FilterForm onZipCodeSubmit={handleZipCodeSubmit} />
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Heatmap Setting Group */}
            <Collapsible defaultOpen={false} className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton isActive>
                    <Sliders />
                    <span>Heatmap Setting</span>
                    <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <OpacitySlider
                      opacity={heatOpacity}
                      setOpacity={setHeatOpacity}
                    />
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              {/* View Documentation Menu Button */}
              <SidebarMenuButton asChild isActive>
                <a
                  href='https://docs.google.com/document/d/1V6Ar4Mgx3md5B1XrWJUrkpiUZV7W1wLOLsVxWnYAyUA/edit?tab=t.0'
                  target='_blank'
                  rel='noopener noreferrer'
                  // className="flex items-center space-x-3"
                >
                  <BookOpen />
                  <span>View Documentation</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* Heat Map */}
      <div className='flex-grow relative'>
        <Map heatOpacity={heatOpacity} position={mapCenter} />
      </div>
    </SidebarProvider>
  );
};

export default FilterSidebarWrapper;
