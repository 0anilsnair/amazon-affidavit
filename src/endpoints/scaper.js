import axios from "axios";

const getWebPageContent = (url) => {
  return axios.get(
    `${import.meta.env.VITE_SCRAPER_URL}/?api_key=${
      import.meta.env.VITE_SCRAPER_API_KEY
    }&url=${url}`
  );
};

export { getWebPageContent };
