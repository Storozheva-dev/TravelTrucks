import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from './operations';

const initialState = {
  items: [],
  total: 0,
  currentCamper: null,
  // favorites: [],
  isLoading: false,
  error: null,

  filters: {
    location: '',
    AC: false, 
    automatic: false,
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
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.items = [];
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      const isFavorite = state.favorites.includes(camperId);
      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
    },
    clearCampers(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // список
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        // console.log('Fetched campers:', action.payload);
        state.isLoading = false;
        const { items, total, page, limit = 4 } = action.payload;

        if (page === 1) {
          state.items = items;
        } else {
          // без дублів???
          const newItems = items.filter(
            newItem => !state.items.some(existingItem => existingItem.id === newItem.id)
          );
          state.items = [...state.items, ...newItems];
        }
      

        state.total = total;
        state.pagination = {
          ...state.pagination,
          page,
          limit
        };
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // для одного по айді
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

export const { setFilters, setPage, toggleFavorite, clearCampers } = campersSlice.actions;
export default campersSlice.reducer;