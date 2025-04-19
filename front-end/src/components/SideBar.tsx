import React, { useState } from 'react';
import { Point } from './mapComponents/HeatmapLayer';
import { Switch } from '@/components/ui/switch';
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
import {
  ChevronDown,
  BookOpen,
  Sliders,
  Filter,
  Bell,
  Menu,
  X,
} from 'lucide-react'; // Importing icons
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import { GridColorsState } from './Wrapper';

interface SideBarProps {
  notifications: string[];
  removeNotification: (index: number) => void;
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  showZipBorders: boolean;
  setShowZipBorders: (show: boolean) => void;
  onZipCodeSubmit: (coords: Point, zipCode: string) => void;
  handleReset: () => void;
  handleNotificationClick: (notification: string) => void;
  gridColors: GridColorsState;
  setGridColors: React.Dispatch<React.SetStateAction<GridColorsState>>;
}

const SideBar: React.FC<SideBarProps> = ({
  notifications,
  removeNotification,
  showHeatmap,
  setShowHeatmap,
  showZipBorders,
  setShowZipBorders,
  onZipCodeSubmit,
  handleReset,
  handleNotificationClick,
  gridColors,
  setGridColors,
}) => {
  const [open, setOpen] = useState(false); // Local state for sidebar open/close
  // const [gridColors, setGridColors] = useState({
  //   'rgba(221, 40, 40, 0.95)': true,  // Red
  //   'rgba(255, 130, 24, 0.95)': true, // Orange
  //   'rgba(245, 245, 29, 0.95)': true, // Yellow
  //   'rgba(32, 221, 28, 0.95)': true,  // Green
  //   'rgba(67, 89, 242, 0.95)': true,  // Blue
  // });

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-1 ${
          open ? 'left-[260px]' : 'left-1'
        } z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out`}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Sidebar
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-all duration-500 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40`}
      >
        <SidebarHeader>
          <h2 className='text-lg font-semibold mb-6'>Sidebar Menu</h2>
        </SidebarHeader>

        <SidebarContent>
          {/* Notifications */}
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
                        onClick={() => handleNotificationClick(notification)}
                        className='flex justify-between items-center p-2 bg-gray-100 rounded-md text-sm cursor-pointer hover:bg-gray-200 transition'
                      >
                        <span>{notification}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(index);
                          }}
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
            {/* Filter Section */}
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
                    <FilterForm
                      onZipCodeSubmit={onZipCodeSubmit}
                      handleReset={handleReset}
                    />
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Heatmap Settings */}
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
                    <div className='flex items-center justify-between p-2'>
                      <label className='text-sm font-medium'>
                        Show Heatmap
                      </label>
                      <Switch
                        checked={showHeatmap}
                        onCheckedChange={setShowHeatmap}
                      />
                    </div>
                    <div className='flex items-center justify-between p-2'>
                      <label className='text-sm font-medium'>
                        Show ZIP Borders
                      </label>
                      <Switch
                        checked={showZipBorders}
                        onCheckedChange={setShowZipBorders}
                      />
                    </div>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Grid Settings */}
            <Collapsible defaultOpen={false} className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton isActive>
                    <Sliders />
                    <span>Grid Settings</span>
                    <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {[
                      { color: 'rgba(221, 40, 40, 0.95)', label: 'Red' },
                      { color: 'rgba(255, 130, 24, 0.95)', label: 'Orange' },
                      { color: 'rgba(245, 245, 29, 0.95)', label: 'Yellow' },
                      { color: 'rgba(32, 221, 28, 0.95)', label: 'Green' },
                      { color: 'rgba(67, 89, 242, 0.95)', label: 'Blue' },
                    ].map(({ color, label }) => (
                      <div
                        key={color}
                        className='flex items-center justify-between p-2'
                      >
                        <div
                          className='w-4 h-4 rounded-sm'
                          style={{ backgroundColor: color }}
                        ></div>
                        <label
                          htmlFor={`${color}-grid`}
                          className='capitalize text-sm font-medium'
                        >
                          {label} Cells
                        </label>
                        <Switch
                          id={`${color}-grid`}
                          checked={gridColors[color as keyof GridColorsState]}
                          onCheckedChange={(checked) =>
                            setGridColors((prev) => ({
                              ...prev,
                              [color as keyof GridColorsState]: checked,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Documentation Link */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a
                  href=' https://websites.uta.edu/cseseniordesign/'
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
    </SidebarProvider>
  );
};

export default SideBar;
