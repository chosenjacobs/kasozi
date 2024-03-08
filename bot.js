const Binance = require("node-binance-api");
const { buy, sell } = require("./helpers");
const logger = require("./logger");

require("dotenv").config();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const symbol = "BTCUSDT";

const buyThreshold = 5;
const sellThreshold = 5.5;

const binance = new Binance().options({
  APIKEY: apiKey,
  APISECRET: apiSecret,
  family: 4,
});

async function checkPriceAndTrade() {
  try {
    const prevDay = await binance.prevDay(symbol);
    const lowPrice = parseFloat(prevDay.lowPrice);
    const currentPrice = parseFloat(prevDay.lastPrice);

    if (currentPrice <= lowPrice * buyThreshold) {
      await buy(binance, symbol, currentPrice);
    }

    if (currentPrice >= currentPrice * sellThreshold) {
      await sell(binance, symbol, currentPrice);
    }
  } catch (error) {
    console.log(apiKey);
    console.log(apiSecret);
    logger.error("Error fetching previous day data:", error);
  }
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

/* // bot.js
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

    if (currentPrice >= currentPrice * sellThreshold) {
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
 */
