import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { useFaceApiModelWorker } from "./hooks/useFaceApiModels"; // seu hook do worker

function App() {
  const { status } = useFaceApiModelWorker();

  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          padding: "8px 16px",
          background: "#333",
          color: "#fff",
          borderRadius: 8,
        }}
      >
        Modelos: {status}
      </div>
    </BrowserRouter>
  );
}

export default App;
