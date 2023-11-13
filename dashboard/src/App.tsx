import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main className="h-screen w-screen bg-white font-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={<div>d</div>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
