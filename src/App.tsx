
import { useEffect } from "react";
import Home from "./pages/Home";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="app">
      <Home />
    </main>
  );
}

export default App;
