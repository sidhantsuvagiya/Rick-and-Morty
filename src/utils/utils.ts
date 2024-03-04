
export const API_BASE_URL = "https://rickandmortyapi.com/api";

// Extracts numeric IDs from an array of URL strings and returns An array of numeric IDs.
export const extractIdsFromUrls = (urls: string[]): number[] => {
    return urls.map(url => url.split("/").pop()).filter(id => id !== undefined).map(id => parseInt(id!));
};

