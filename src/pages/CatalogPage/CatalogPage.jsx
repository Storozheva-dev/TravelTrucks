import css from "./CatalogPage.module.css";
import CatalogList from "../../components/CatalogList/CatalogList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  selectCampers, 
  selectPagination, 
  selectIsLoading, 
  selectError 
} from "../../redux/campers/selectors";
import { fetchCampers } from "../../redux/campers/operations";
import { setPage } from "../../redux/campers/slice";
import CatalogFilters from "../../components/CatalogFilters/CatalogFilters";

function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const { hasMore, page } = useSelector(selectPagination);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // першапорція
  useEffect(() => {
  dispatch(fetchCampers({ page }));
}, [dispatch, page]);


  // підгрузка нових карток
  const handleLoadMore = () => {
  if (!hasMore || isLoading) return;
  dispatch(setPage(page + 1));
};

  return (
    <div className={css.catalogPage}>
      <aside className={css.aside}>
        <CatalogFilters />
      </aside>
      <main className={css.main}>
        {error && <p className={css.error}>Error: {error}</p>}
        
        <CatalogList items={campers} />
        
        {isLoading && <p className={css.loading}>Loading...</p>}
        
        {hasMore && !isLoading && (
          <button
            className={css.button}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
        
        {!hasMore && campers.length > 0 && (
          <p className={css.noMoreText}>No more campers available</p>
        )}
      </main>
    </div>
  );
}

export default CatalogPage;