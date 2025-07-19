import css from "./CatalogFilters.module.css";
import { ACIcon, AutomaticIcon, KitchenIcon, TVIcon, BathroomIcon, VanIcon, FullyIntegratedIcon, AlcoveIcon, MapIcon } from "../../icons";
import { selectFilters } from "../../redux/campers/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/campers/slice";
import { fetchCampers } from "../../redux/campers/operations";

function CatalogFilters() {
// для мап інпут
const [isFocused, setIsFocused] = useState(false);


  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [city, setCity] = useState(filters.location || '');

  const [equipment, setEquipment] = useState({
    AC: filters.AC || false,
    automatic: filters.transmission === 'automatic',
    kitchen: filters.kitchen || false,
    TV: filters.TV || false,
    bathroom: filters.bathroom || false,
  });

  const [vehicleType, setVehicleType] = useState({
    panelTruck: filters.form === 'panelTruck',
    fullyIntegrated: filters.form === 'fullyIntegrated',
    alcove: filters.form === 'alcove',
  });

  const handleEquipmentChange = (name) => {
    setEquipment(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleVehicleTypeChange = (name) => {
    setVehicleType(prev => {
      // тільки 1 тип кузова
      const reset = { panelTruck: false, fullyIntegrated: false, alcove: false };
      reset[name] = !prev[name];
      return reset;
    });
  };

  const handleFilter = () => {
    const transmission = equipment.automatic ? 'automatic' : undefined;
    const form = Object.entries(vehicleType).find(([_, v]) => v)?.[0] || undefined;

    const updatedFilters = {};
    if (city.trim()) updatedFilters.location = city.trim();
    if (transmission) updatedFilters.transmission = transmission;
    if (equipment.AC) updatedFilters.AC = true;
    if (equipment.kitchen) updatedFilters.kitchen = true;
    if (equipment.TV) updatedFilters.TV = true;
    if (equipment.bathroom) updatedFilters.bathroom = true;
    if (form) updatedFilters.form = form;

    

    dispatch(setFilters(updatedFilters));
    dispatch(fetchCampers(updatedFilters));
  };

  return (
    <div className={css.filtersComponent}>
      <div className={css.location}>
        <h2 className={css.nameCategory}>Location</h2>
        <label className={css.inputWrapper}>
         <input
          type="text" placeholder="City" value={city}
           onChange={(e) => setCity(e.target.value)} className={css.input} />
         <MapIcon className={css.iconMap} />
       </label>
      </div>

      <div className={css.filters}>
        <h2 className={css.nameCategory}>Filters</h2>

        <div className={css.equipmentFilter}>
          <h3 className={css.title}>Vehicle equipment</h3>
          <ul className={css.filtersList}>
            {['AC', 'automatic', 'kitchen', 'TV', 'bathroom'].map((item) => (
              <li key={item} className={`${css.itemFilter} ${equipment[item] ? css.checked : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={equipment[item]}
                    onChange={() => handleEquipmentChange(item)}
                    className={css.hiddenCheckbox}
                  />
                  <div className={css.customCheckbox}>
                    {item === 'AC' && <ACIcon className={css.icon} />}
                    {item === 'automatic' && <AutomaticIcon className={css.icon} />}
                    {item === 'kitchen' && <KitchenIcon className={css.icon} />}
                    {item === 'TV' && <TVIcon className={css.icon} />}
                    {item === 'bathroom' && <BathroomIcon className={css.icon} />}
                    <span className={css.spanCategory}>
                      {item === 'AC' ? 'AC' : item === 'automatic' ? 'Automatic' : item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.type}>
          <h3 className={css.title}>Vehicle type</h3>
          <ul className={css.filtersList}>
            {['panelTruck', 'fullyIntegrated', 'alcove'].map((type) => (
              <li key={type} className={`${css.itemFilter} ${vehicleType[type] ? css.checked : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={vehicleType[type]}
                    onChange={() => handleVehicleTypeChange(type)}
                    className={css.hiddenCheckbox}
                  />
                  <div className={css.customCheckbox}>
                    {type === 'panelTruck' && <VanIcon className={css.icon} />}
                    {type === 'fullyIntegrated' && <FullyIntegratedIcon className={css.icon} />}
                    {type === 'alcove' && <AlcoveIcon className={css.icon} />}
                    <span className={css.spanCategory}>
                      {/* бо в айпі 3 категорія відмінна від категорії в макеті))))) */}
                      {type === 'panelTruck' ? 'Van' : type === 'fullyIntegrated' ? 'Fully Integrated' : 'Alcove'}
                    </span>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className={css.button} onClick={handleFilter}>Search</button>
    </div>
  );
}

export default CatalogFilters;