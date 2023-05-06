import MainTable from "./components/MainTable";
import "./App.css";
import Chart from "./components/Chart";
import { Route, Routes } from "react-router-dom";
import useUserStore from "./store/store";
import { Store } from "./types/global";
import { useEffect } from "react";

const App: React.FC = () => {
  const { fetchAllUsers } = useUserStore((state: Store) => state);

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainTable />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
};

export default App;
