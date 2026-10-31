import { useEffect } from "react";
import Home from "./pages/Home";
import useLenis from "./hooks/useLenis";
import CustomCursor from "./components/common/CustomCursor";
import ArchiveBackground from "./components/common/ArchiveBackground";

function App() {
  useLenis();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ArchiveBackground />
      <div className="app">
        <CustomCursor />
        <Home />
      </div>
    </>
  );
}

export default App;