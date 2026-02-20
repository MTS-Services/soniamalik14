import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET, POST, PUT, DELETE } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// Normalize a single API item → fields expected by NewsCard (img, desc)
const normalizeNewsItem = (item) => {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    img: item.img || item.image || '',
    desc: item.desc || item.excerpt || item.content || '',
  };
};

// Extract items array from various backend response shapes
const extractNewsList = (resp) => {
  // shape: { success, data, pagination: { limit: [...] } }
  const items =
    resp?.pagination?.limit ||
    resp?.items ||
    resp?.results ||
    (Array.isArray(resp?.data) ? resp.data : null) ||
    (Array.isArray(resp) ? resp : []);
  return (Array.isArray(items) ? items : []).map(normalizeNewsItem);
};

// Fetch all news
export const fetchNews = createAsyncThunk(
  'news/fetchAll',
  async (_, { rejectWithValue, signal }) => {
    try {
      const resp = await apiExecutor((s) => GET(ENDPOINT.NEWS.LIST, undefined, s), rejectWithValue, signal);
      return extractNewsList(resp);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch news');
    }
  }
);

// Create new news
export const createNews = createAsyncThunk(
  'news/create',
  async (newsItem, { rejectWithValue, signal }) => {
    try {
      // If `image` is a File object, send multipart/form-data
      const payloadImage = newsItem.image ?? newsItem.img ?? null;
      if (payloadImage && typeof payloadImage === 'object' && payloadImage instanceof File) {
        const form = new FormData();
        form.append('title', newsItem.title || '');
        // backend expects `content` and `excerpt` in Postman example
        form.append('content', newsItem.desc || '');
        form.append('excerpt', newsItem.desc || '');
        // default status; backend may ignore if not needed
        form.append('status', newsItem.status || 'PUBLISHED');
        form.append('image', payloadImage);

        const resp = await apiExecutor((s) => POST(ENDPOINT.NEWS.CREATE, form, s), rejectWithValue, signal);
        return normalizeNewsItem(resp?.data ?? resp);
      }

      // Otherwise send JSON (image as URL/string if provided)
      const jsonPayload = {
        title: newsItem.title || '',
        content: newsItem.desc || newsItem.content || '',
        excerpt: newsItem.desc || newsItem.excerpt || '',
        status: newsItem.status || 'PUBLISHED',
        image: payloadImage || ''
      };

      const resp = await apiExecutor((s) => POST(ENDPOINT.NEWS.CREATE, jsonPayload, s), rejectWithValue, signal);
      return normalizeNewsItem(resp?.data ?? resp);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create news');
    }
  }
);

// Update news
export const updateNews = createAsyncThunk(
  'news/update',
  async ({ id, data }, { rejectWithValue, signal }) => {
    try {
      const payloadImage = data.image ?? data.img ?? null;
      if (payloadImage && typeof payloadImage === 'object' && payloadImage instanceof File) {
        const form = new FormData();
        form.append('title', data.title || '');
        form.append('content', data.desc || data.content || '');
        form.append('excerpt', data.desc || data.excerpt || '');
        form.append('status', data.status || 'PUBLISHED');
        form.append('image', payloadImage, payloadImage.name || 'upload');

        const resp = await apiExecutor((s) => PUT(ENDPOINT.NEWS.UPDATE(id), form, s), rejectWithValue, signal);
        const normalized = normalizeNewsItem(resp?.data ?? resp);
        return { id, data: normalized };
      }

      const jsonPayload = {
        title: data.title || '',
        content: data.desc || data.content || '',
        excerpt: data.desc || data.excerpt || '',
        status: data.status || 'PUBLISHED',
        image: payloadImage || ''
      };

      const resp = await apiExecutor((s) => PUT(ENDPOINT.NEWS.UPDATE(id), jsonPayload, s), rejectWithValue, signal);
      const normalized = normalizeNewsItem(resp?.data ?? resp);
      return { id, data: normalized };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update news');
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk(
  'news/delete',
  async (id, { rejectWithValue, signal }) => {
    try {
      await apiExecutor((s) => DELETE(ENDPOINT.NEWS.DELETE(id), s), rejectWithValue, signal);
      return id; // slice uses this id to remove item from state
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete news');
    }
  }
);
