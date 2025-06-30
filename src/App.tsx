import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/Signin";
import Feed from "./pages/Feed";
import SignUp from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PublicRoutes from "./utils/PublicRoute";
import AtlysLayout from "./layouts/AtlysLayout";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AtlysLayout />
          <Routes>
            <Route path="/home" element={<Feed />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
