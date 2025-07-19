import css from "./CatalogPage.module.css";
import CatalogList from "../../components/CatalogList/CatalogList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { 
  selectCampers, 
  selectPagination, 
  selectIsLoading, 
  selectFilters
} from "../../redux/campers/selectors";
import { fetchCampers } from "../../redux/campers/operations";
import { setPage } from "../../redux/campers/slice";
import CatalogFilters from "../../components/CatalogFilters/CatalogFilters";

function CatalogPage() {

  // щоб хеш табів не тягнув вниз
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const { hasMore, page } = useSelector(selectPagination);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);

  // першапорція
  useEffect(() => {
  // console.log('Fetching with params:', { page, ...filters });
  dispatch(fetchCampers({ page, ...filters }));
}, [dispatch, page, filters]);




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
  {/* чеки для лоадера */}
  {isLoading && campers.length === 0 && <Loader />}
  {campers.length > 0 && <CatalogList items={campers} />}
  {!isLoading && campers.length === 0 && (
  <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  width: '888px'
}}>
  <p style={{ fontSize: '18px', color: '#555' }}>No campers found</p>
</div>

)}
  {hasMore && campers.length > 0 && (
    <div>
      <button
        className={css.button}
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        Load more
      </button>
      {isLoading && <Loader />}
    </div>
  )}

  {/* якщо вже після завантяження то */}
  {!hasMore && campers.length > 0 && (
    <p className={css.noMoreText}>No more campers available</p>
  )}
</main>
    </div>
  );
}

export default CatalogPage;