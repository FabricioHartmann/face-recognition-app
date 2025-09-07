import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { useFaceApiModels } from "./hooks/useFaceApiModels";
import { FaceApiLoader } from "./components/ModelsLoader/ModelsLoader.component";

function App() {
  const status = useFaceApiModels();

  if (status !== "success") return <FaceApiLoader status={status} />;
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
