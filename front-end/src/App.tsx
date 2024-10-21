import './App.css';
import Map from './components/Map';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className='h-screen relative'>
      <Navbar />
      <SideBar />
      <main className='z-10'>
        <Map />
      </main>

      {/* Other components */}
    </div>
  );
}

export default App;
