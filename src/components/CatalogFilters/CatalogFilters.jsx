import css from "./CatalogFilters.module.css";
import { ACIcon, AutomaticIcon, KitchenIcon, TVIcon, BathroomIcon, VanIcon, FullyIntegratedIcon, AlcoveIcon, MapIcon } from "../../icons";
import { selectFilters } from "../../redux/campers/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";

function CatalogFilters() {
  const filters = useSelector(selectFilters);

    
    const [city, setCity] = useState('');
    

    return (
      
      <div className={css.filtersComponent}>
              <div className={css.location}>
                <h2 className={css.nameCategory}>Location</h2>
                <input className={css.input} type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <MapIcon className={css.iconMap} />
            </div>
      <div className={css.filters}>
        <h2 className={css.nameCategory}>Filters</h2>
        <div className={css.equipmentFilter}>
          <h3 className={css.title}>Vehicle equipment</h3>
          <ul className={css.filtersList}>
            <li className={css.itemFilter}>
              <label className={filters.AC ? css.checked : ''}>
                <input type="checkbox" checked={filters.AC} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <ACIcon  className={css.icon}/>
                  <span className={css.spanCategory}>AC</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.automatic ? css.checked : ''}>
                <input type="checkbox" checked={filters.automatic} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <AutomaticIcon className={css.icon} />
                  <span className={css.spanCategory}>Automatic</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.kitchen ? css.checked : ''}>
                <input type="checkbox" checked={filters.kitchen} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <KitchenIcon className={css.icon} />
                  <span className={css.spanCategory}>Kitchen</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.TV ? css.checked : ''}>
                <input type="checkbox" checked={filters.TV} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <TVIcon className={css.icon} />
                  <span className={css.spanCategory}>TV</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.bathroom ? css.checked : ''}>
                <input type="checkbox" checked={filters.bathroom} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <BathroomIcon className={css.icon} />
                  <span className={css.spanCategory}>Bathroom</span>
                </div>
              </label>
            </li>
          </ul>
        </div>

        <div className={css.type}>
          <h3 className={css.title}>Vehicle type</h3>
          <ul className={css.filtersList}>
            <li className={css.itemFilter}>
              <label className={filters.van ? css.checked : ''}>
                <input type="checkbox" checked={filters.van} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <VanIcon className={css.icon} />
                  <span className={css.spanCategory}>Van</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.fullyIntegrated ? css.checked : ''}>
                <input type="checkbox" checked={filters.fullyIntegrated} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <FullyIntegratedIcon className={css.icon} />
                  <span className={css.spanCategory}>Fully Integrated</span>
                </div>
              </label>
            </li>
            <li className={css.itemFilter}>
              <label className={filters.alcove ? css.checked : ''}>
                <input type="checkbox" checked={filters.alcove} className={css.hiddenCheckbox} readOnly />
                <div className={css.customCheckbox}>
                  <AlcoveIcon className={css.icon} />
                  <span className={css.spanCategory}>Alcove</span>
                </div>
              </label>
            </li>
          </ul>
        </div>
            </div>
            <button className={css.button} onClick={() => handleFilter({ city })} disabled={!city}>Search</button>
    </div>
  );
}

export default CatalogFilters;
