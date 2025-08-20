import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import { Projects } from "./components/desafios/projects/Projects";
import { MemeGenerator } from "./components/desafios/memeGenerator/MemeGenerator";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/daily-projects/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<Projects />} path="projects/"></Route>
          <Route element={<MemeGenerator />} path="meme-generator" />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
