// bot.js
const Binance = require("node-binance-api");
const { buy, sell } = require("./helpers");
const logger = require("./logger");

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const symbol = "BTCUSDT";

const buyThreshold = 0.95;
const sellThreshold = 1.05;

const binance = new Binance().options({
  APIKEY: apiKey,
  APISECRET: apiSecret,
});

function checkPriceAndTrade() {
  binance.prevDay(symbol, (error, prevDay) => {
    if (error) {
      logger.error("Error fetching previous day data:", error.body);
      return;
    }

    const lowPrice = parseFloat(prevDay.lowPrice);
    const currentPrice = parseFloat(prevDay.lastPrice);

    if (currentPrice <= lowPrice * buyThreshold) {
      buy(binance, symbol, currentPrice);
    }

    if (currentPrice >= buyingPrice * sellThreshold) {
      sell(binance, symbol, currentPrice);
    }
  });
}

// Run the trading logic continuously
(async () => {
  while (true) {
    await checkPriceAndTrade();
    await delay(5 * 60 * 1000); // Delay for 5 minutes
  }
})();

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
