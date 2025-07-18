import css from "./CatalogList.module.css";
import CatalogCard from "../CatalogCard/CatalogCard";

const CatalogList = ({ items = [] }) => {
  if (!items.length) return <p>No campers found</p>;

  return (
    <div className={css.list}>
      {items.map((camper) => (
        <CatalogCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default CatalogList;