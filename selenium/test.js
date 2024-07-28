const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
require('chromedriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Navigating to Google...');
    await driver.get('http://www.google.com');

    console.log('Performing search...');
    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);

    await driver.wait(until.titleContains('Selenium'), 10000);
    const title = await driver.getTitle();
    expect(title).to.include('Selenium');
    console.log('Test passed: The title includes "Selenium".');
  } catch (error) {
    console.error('Error during test execution:', error);
    throw error;
  } finally {
    await driver.quit();
  }
})();
