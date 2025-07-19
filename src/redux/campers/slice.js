import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from './operations';


const loadFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem('camperFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromLocalStorage(),
  items: [],
  total: 0,
  currentCamper: null,
  isLoading: false,
  error: null,
  filters: {
    location: '',
    AC: false,
    transmission: '',
    kitchen: false,
    TV: false,
    bathroom: false,
    form: ''
  },
  pagination: {
    page: 1,
    limit: 4,
  },
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.favorites.some(item => item.id === camper.id)) {
        state.favorites.push(camper);
        localStorage.setItem('camperFavorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favorites = state.favorites.filter(item => item.id !== camperId);
      localStorage.setItem('camperFavorites', JSON.stringify(state.favorites));
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.items = [];
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    clearCampers(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Гарантируем что items - массив
        const items = Array.isArray(action.payload?.items) 
          ? action.payload.items 
          : [];
        
        // Гарантируем что total - число
        const total = Number.isInteger(action.payload?.total) 
          ? action.payload.total 
          : items.length;

        if (action.payload.page === 1) {
          state.items = items;
        } else {
          const existingIds = new Set(state.items.map(item => item.id));
          const newItems = items.filter(item => !existingIds.has(item.id));
          state.items = [...state.items, ...newItems];
        }

        state.total = total;
        state.pagination.page = action.payload.page || 1;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unknown error';
        state.items = []; // Очищаем при ошибке
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, setPage, clearCampers, addToFavorites, removeFromFavorites } = campersSlice.actions;
export default campersSlice.reducer;