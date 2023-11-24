import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./page-form/formulaire.jsx";
import List from "./page-list/list.jsx";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/formulaire" element={<Form />}>
          <Route index />
          <Route path=":id" />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
