import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';
import { DashboardPage } from './pages/Dashboard';
import { GuildList } from './pages/GuildList/GuildList.page';

function App() {
  return (
    <main className="w-screen h-screen bg-background text-text font-bold">
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/guilds" element={<GuildList />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
