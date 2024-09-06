import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
