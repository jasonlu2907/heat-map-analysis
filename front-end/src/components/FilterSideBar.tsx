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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import FilterForm from './sidebarComponents/FilterForm';
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
  // setHeatOpacity,
}) => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    'Fire alert in zip code 76006 🚒',
    'Fire risk score 8 at UTA 🚨',
    'Alert: Current risk score is 9 at <300,200> and this is a long notification.',
  ]);
  //const [notifications, setNotifications] = useState(0);
  const [clickedZip, setClickedZip] = useState<string | null>(null);

  const removeNotification = (indexToRemove: number) => {
    setNotifications(
      notifications.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleZipCodeSubmit = (zipCoord: Point, zipCode: string) => {
    setMapCenter(zipCoord);
    setClickedZip(zipCode);
  };

  // const addNotification = () => {

  // };
  const DEFAULT_MAP_CENTER: Point = [32.7357, -97.1081]; // Example: Arlington, TX coordinates

  const handleReset = () => {
    setClickedZip(null); // Reset clickedZip to null
    setMapCenter(DEFAULT_MAP_CENTER); // Center the map to the default position
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
            <Popover>
              <PopoverTrigger asChild>
                <button className='relative p-2' aria-label='Notifications'>
                  <Bell className='w-6 h-6' />
                  {notifications.length > 0 && (
                    <span className='absolute top-0 left-7 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                      {notifications.length}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-80 p-4 shadow-md bg-white border rounded-md'>
                <h4 className='text-sm font-medium'>Notifications</h4>
                {notifications.length > 0 ? (
                  <ul className='space-y-2'>
                    {notifications.map((notification, index) => (
                      <li
                        key={index}
                        className='flex justify-between items-center p-2 bg-gray-100 rounded-md text-sm cursor-pointer hover:bg-gray-200 transition'
                      >
                        <span>{notification}</span>
                        <button
                          onClick={() => removeNotification(index)}
                          className='text-gray-400 text-s font-bold hover:text-gray-600'
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-xs text-gray-600'>No new notifications</p>
                )}
              </PopoverContent>
            </Popover>
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
                  <SidebarMenuSub>
                    <button
                      className='w-full py-2 px-4 bg-gray-800 text-white rounded-md'
                      onClick={handleReset}
                    >
                      Reset
                    </button>
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
                  <SidebarMenuSub></SidebarMenuSub>
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
        <Map
          heatOpacity={heatOpacity}
          position={mapCenter}
          clickedZip={clickedZip}
          setClickedZip={setClickedZip}
        />
      </div>
    </SidebarProvider>
  );
};

export default FilterSidebarWrapper;
