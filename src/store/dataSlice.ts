import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import data from "../data/data.json";

// Define TypeScript types for your data
interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

interface DataState {
  featured: Movie;
  trendingNow: Movie[];
}

const sessionFeaturedId = sessionStorage.getItem("movieId");
const featuredFromSession =
  data.TendingNow.find((el) => el.Id === sessionFeaturedId) || data.Featured;

const initialState: DataState = {
  featured: featuredFromSession,
  trendingNow: data.TendingNow,
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateFeatured: (state, action: PayloadAction<Movie>) => {
      state.featured = action.payload;
      state.trendingNow.sort((a, b) => {
        if (a.Id === state.featured.Id) return -1;
        if (b.Id === state.featured.Id) return 1;
        return 0;
      });
    },
  },
});

export const { updateFeatured } = dataSlice.actions;

export default dataSlice.reducer;
