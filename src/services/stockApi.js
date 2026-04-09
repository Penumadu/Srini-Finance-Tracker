// Service for fetching stock data

const API_KEY = 'demo'; // Replace with your actual API key (e.g., Finnhub, Alpha Vantage)
const BASE_URL = 'https://finnhub.io/api/v1';

export const stockApi = {
    /**
     * Fetch real-time stock quote.
     * Note: Finnhub uses 'c' for current price, 'd' for change, 'dp' for percent change.
     */
    getQuote: async (symbol) => {
        try {
            // Uncomment this to use the real API:
            // const res = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
            // const data = await res.json();
            // return { price: data.c, change: data.d, percentChange: data.dp };

            // Mock Data for Demo
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        price: (Math.random() * 200 + 50).toFixed(2),
                        change: (Math.random() * 10 - 5).toFixed(2),
                        percentChange: (Math.random() * 5 - 2.5).toFixed(2)
                    });
                }, 400);
            });
        } catch (error) {
            console.error("Error fetching quote:", error);
            return null;
        }
    },

    /**
     * Fetch company profile information.
     */
    getProfile: async (symbol) => {
        try {
            // Uncomment this to use the real API:
            // const res = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
            // return await res.json();
            
            // Mock Data for Demo
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        name: `${symbol} Corporation`,
                        ticker: symbol,
                        marketCapitalization: (Math.random() * 2000000).toFixed(0),
                        shareOutstanding: (Math.random() * 5000).toFixed(0),
                        weburl: `https://www.${symbol.toLowerCase()}.com`
                    });
                }, 400);
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    }
};
