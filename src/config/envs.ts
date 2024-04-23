export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
if (typeof PROJECT_ID === "undefined") {
    throw new Error("Please provide PROJECT_ID in .env");
}

const BASE_URL_PRO = import.meta.env.VITE_BASE_URL_PRO;
const BASE_URL_DEV = import.meta.env.VITE_BASE_URL_DEV;
export const BASE_URL = process.env.NODE_ENV === "production" ? BASE_URL_PRO : BASE_URL_DEV;
if (typeof BASE_URL === "undefined") {
    throw new Error("Please provide BASE_URL in .env");
}
