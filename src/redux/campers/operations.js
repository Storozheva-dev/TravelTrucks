import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, { rejectWithValue }) => {
    // console.log("filters из Redux:", filters);

    try {
      const supportedParams = {
        limit: 4,
        page: filters.page || 1,
      };

      if (filters.location && filters.location.trim() !== "") {
        supportedParams.location = filters.location.trim();
      }

      if (filters.form && filters.form.trim() !== "") {
        supportedParams.form = filters.form.trim().toLowerCase();
      }

      if (filters.transmission && filters.transmission.trim() !== "") {
        supportedParams.transmission = filters.transmission.trim();
      }

      // Только если true
      ["AC", "kitchen", "TV", "bathroom"].forEach((key) => {
        if (filters[key] === true) {
          supportedParams[key] = true;
        }
      });

      const response = await axios.get(BASE_URL, {
        params: supportedParams,
        timeout: 5000,
      });

      const data = response.data;
      if (!data) throw new Error("API returned empty response");

      const items = Array.isArray(data) ? data : data.items || [];
      const total = data.total || items.length;

      return {
        items,
        total,
        page: supportedParams.page,
        limit: supportedParams.limit,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // чтобы при фильтрации не было ошибки 404 в консоли
        return {
          items: [],
          total: 0,
          page: filters.page || 1,
          limit: 4,
        };
      }

      return rejectWithValue(
        error.response?.data?.message || error.message || "Network error"
      );
    }
  }
);

// по айді
const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, { timeout: 5000 });
      if (!response.data) throw new Error("Camper not found");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export { fetchCampers, fetchCamperById };
