import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './FeaturesTab.module.css';
import { fetchCamperById } from '../../redux/campers/operations';
import { selectCurrentCamper, selectIsLoading } from '../../redux/Campers/Selectors';
import features from '../../constants/features';

const FeaturesTab = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const camper = useSelector(selectCurrentCamper);

    // Дебаунс від перевантаж апі
    useEffect(() => {
        if (!camper?.id) return;
        
        const timerId = setTimeout(() => {
            dispatch(fetchCamperById(camper.id));
        }, 500);

        return () => clearTimeout(timerId);
    }, [camper?.id, dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (!camper) return <p>Camper not found</p>;

    // меін категорії
    const filteredFeatures = features.filter(({ key }) => {
        const isMainFeature = [
            "transmission", "engine", "AC", "bathroom", "kitchen", 
            "TV", "radio", "refrigerator", "microwave", "gas", "water"
        ].includes(key);
        return isMainFeature;
    }).map(feature => {
        // ключі експектед
        if (feature.expected) {
            return {
                ...feature,
                value: camper[feature.key] === feature.expected
            };
        }
        return {
            ...feature,
            value: camper[feature.key]
        };
    });

    // дітейлс
    const detailsKeys = ["form", "length", "width", "height", "tank", "consumption"];
    const detailsData = detailsKeys.map(key => ({
        key,
        value: camper[key]
    })).filter(item => item.value !== undefined);

    return (
        <div className={css.features}>
            <div className={css.topContent}>
            <ul className={css.mainCategory}>
                {filteredFeatures.map(({ key, label, icon: Icon, value }) => {
                    if (value === undefined || value === false) return null;
                    return (
                        <li key={`${key}-${label}`} className={css.featureItem}>
                            <Icon className={css.featureIcon} />
                            <span className={css.featureLabel}>{label}</span>
                        </li>
                    );
                })}
            </ul>
            </div>
            <div className={css.bottomContent}>
            <h2 className={css.detailsTitle}>Vehicle details</h2>
            <ul className={css.detailsCategory}>
                {/* ключ завжди рядок, знач перевірка */}
            {detailsData.map(({ key, value }) => {
           const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
           const formattedValue = typeof value === 'string' ? value
           .replace(/(\d)([a-zA-Z])/g, '$1 $2') 
           .replace(/([a-zA-Z])(\d)/g, '$1 $2') 
           .replace(/^./, c => c.toUpperCase())  : value;
           return (
             <li key={key} className={css.detailItem}>
             <span className={css.detailKey}>{formattedKey}</span>
             <span className={css.detailValue}>{formattedValue}</span>
             </li>
           );
           })}
            </ul>
            </div>
        </div>
    );
};

export default FeaturesTab; 