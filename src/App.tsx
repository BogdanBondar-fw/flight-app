import { HashRouter, Routes, Route } from "react-router-dom";
import FlightsPage from "./pages/FlightsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import CartPage from "./pages/CartPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<FlightsPage />} />
          <Route path="/flights/:id" element={<FlightDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
