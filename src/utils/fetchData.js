import axios from 'axios';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

export const fetchYoutubeVideos = async (searchTerm) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/search',
      params: {
        query: searchTerm,
        type: 'video',
      },
      headers: {
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      }
    });
    
    console.log('YouTube Videos Response:', response.data);
    return response.data.contents || [];
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return [];
  }
};

export const fetchExerciseImage = async (exerciseId) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/image/${exerciseId}`,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    console.log('Image response for', exerciseId, ':', response.data);
    
    if (response.data && response.data.gifUrl) {
      return response.data.gifUrl;
    }
    if (typeof response.data === 'string') {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Image fetch error for', exerciseId, ':', error.response?.status);
    return null;
  }
};