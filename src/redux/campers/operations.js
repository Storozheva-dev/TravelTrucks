import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// список всіх кемперов з фільтрами 
const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = {
        limit: 4,
        ...filters,
      };
      const response = await axios.get(`${BASE_URL}`, { params });
      if (!response.data || !Array.isArray(response.data.items)) {
      throw new Error("No data");
}
      return {
        total: response.data.total,
        items: response.data.items,
        page: params.page || 1,
        limit: params.limit
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
)

// по айді 
const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (Id, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/${Id}`);
    if (!response.data) {
      throw new Error("No data");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
  }
)

export { fetchCampers, fetchCamperById };