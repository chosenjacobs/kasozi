// helpers.js
const logger = require("./logger");

let buyingPrice = 0;

function buy(binance, symbol, price) {
  const quantityToBuy = 10; // Adjust quantity
  binance.marketBuy(
    symbol,
    quantityToBuy,
    { type: "LIMIT", price },
    (error, response) => {
      if (error) {
        logger.error("Error buying:", error.body);
        return;
      }

      buyingPrice = parseFloat(price);
      logger.info("Bought successfully:", response);
    }
  );
}

function sell(binance, symbol, price) {
  const quantityToSell = 10; // Adjust quantity
  binance.marketSell(
    symbol,
    quantityToSell,
    { type: "LIMIT", price },
    (error, response) => {
      if (error) {
        logger.error("Error selling:", error.body);
        return;
      }

      logger.info("Sold successfully:", response);
      buyingPrice = 0;
    }
  );
}

module.exports = { buy, sell };
