import { BrowserRouter, Routes, Route } from "react-router-dom"
import { appRoutes } from "./routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App