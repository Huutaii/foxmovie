const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f7802f1e169e6d62fe23f0bc34d6d1da',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
