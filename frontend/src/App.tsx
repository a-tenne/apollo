import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <>
      <h1 className="text-5xl mb-4 text-center font-extrabold">TODO APP</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
}
