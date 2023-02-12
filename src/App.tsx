import { Route, Routes } from "react-router-dom";
import Address from "./components/admin/Address/Address";
import ParameterTable from "./components/admin/parameterTable/ParameterTable";
import Signin from "./components/auth/signin/Signin";
import HomeTest from "./components/HomeTest";
import Navbar from "./utilities/navbar/Navbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route element={<Navbar />}>
          <Route path="/address" element={<Address />} />
          <Route path="/parameter" element={<ParameterTable />} />
          <Route path="/home" element={<HomeTest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
