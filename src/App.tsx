import { Routes, Route, Outlet } from "react-router-dom";
import HomeTest from "./views/HomeTest";


function App() {
  return (
    <Routes>

      <Route
        element={
          <div>
    
            <div className="flex flex-grow overflow-hidden">
              <div className="flex-grow overflow-y-auto bg-white p-4">
                <Outlet />
              </div>
            </div>
          </div>
        }
      >
  
        <Route path="/" element={<HomeTest />} />
  


      </Route>
    </Routes>
  );
}

export default App;
