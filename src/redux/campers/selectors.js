import { createSelector } from '@reduxjs/toolkit';

const selectCampersState = (state) => state.campers || {};
export const selectCampers = createSelector(
  [selectCampersState],
  (campersState) => campersState.items || []
);

export const selectTotalCampers = (state) => selectCampersState(state).total || 0;
export const selectCurrentCamper = (state) => selectCampersState(state).currentCamper;
export const selectIsLoading = (state) => selectCampersState(state).isLoading;
export const selectError = (state) => selectCampersState(state).error;
export const selectFilters = (state) => selectCampersState(state).filters || {};
export const selectFavoritesIds = (state) => selectCampersState(state).favorites || [];

export const selectPagination = createSelector(
  [selectCampersState],
  (campersState) => {
    const { page = 1, limit = 4 } = campersState.pagination || {};
    const total = campersState.total || 0;
    const itemsCount = campersState.items?.length || 0;

    return {
      page,
      limit,
      total,
      hasMore: itemsCount < total 
    };
  }
);

    
export const selectAllCampers = (state) => selectCampersState(state).items || [];
export const selectActiveFilters = createSelector(
  [selectFilters],
  (filters) => Object.entries(filters)
    .filter(([key, value]) => {
      void key; 
      return value !== '' && value !== false;
    })
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
);