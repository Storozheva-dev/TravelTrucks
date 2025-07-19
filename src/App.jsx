import './App.css';
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage/CamperDetailsPage"));


function App() {


  return (
    <Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="catalog/:id" element={<CamperDetailsPage />} />
    </Route>
  </Routes>
</Suspense>
  )
}

export default App;
