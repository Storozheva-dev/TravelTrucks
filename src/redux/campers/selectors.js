import { createSelector } from '@reduxjs/toolkit';


const selectCampersState = (state) => state.campers || {};

export const selectCampers = (state) => selectCampersState(state).items;
export const selectTotalCampers = (state) => selectCampersState(state).total;
export const selectCurrentCamper = (state) => selectCampersState(state).currentCamper;
export const selectIsLoading = (state) => selectCampersState(state).isLoading;
export const selectError = (state) => selectCampersState(state).error;
export const selectFilters = (state) => selectCampersState(state).filters;
// export const selectPagination = (state) => selectCampersState(state).pagination;
export const selectFavoritesIds = (state) => selectCampersState(state).favorites;

export const selectPagination = createSelector(
  [selectCampersState],
  (campersState) => {
    const { page = 1, limit = 4 } = campersState.pagination || {};
    const { total = 0 } = campersState;
    const hasMore = page * limit < total;
    return { page, limit, total, hasMore };
  }
);
// мемо на фейворіт
// export const selectFavorites = createSelector(
//   [selectCampers, selectFavoritesIds],
//   (campers, favoritesIds) => campers.filter(camper => favoritesIds.includes(camper.id))
// );

// export const selectIsFavorite = (camperId) => createSelector(
//   [selectFavoritesIds],
//   (favoritesIds) => favoritesIds.includes(camperId)
// );

