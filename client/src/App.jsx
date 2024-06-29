// Importing pages, components, and providers
import React from "react";
import AppProvider from "./providers/AppProvider";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/index.js"
import {Header, Footer} from "./components/index.js"

// Exporting functionable component
export default function App() {
  return (
    <AppProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
  )
}