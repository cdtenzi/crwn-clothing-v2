import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesStart } from "../../store/categories/categories.action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();

  //dispara el evento de carga de categorías (thunk)
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
