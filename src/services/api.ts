import axios from 'axios';
import { config } from '../config/environment';

export const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Authorization': `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
  },
});