import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./views/Dashboard";
import Clients from "./views/Clients";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
