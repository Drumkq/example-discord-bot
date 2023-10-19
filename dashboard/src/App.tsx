import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './Pages/Main.page';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <main className="h-screen w-screen bg-white font-black">
      <div className='w-full flex flex-col'>
        <div className="w-1/2 self-center">
          <Navbar />
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" Component={MainPage} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
