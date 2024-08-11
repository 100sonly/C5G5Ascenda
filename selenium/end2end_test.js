var chrome = require("selenium-webdriver/chrome");
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
//const { By } = require("selenium.webdriver.common.by");

var assert = require('assert');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const email_address = "pagor80805@foraro.com"

async function test() {


let driver = new Builder().forBrowser('chrome').build();

await driver.get('http://localhost:3001');

// fill up search bar
let destination_search = await driver.findElement(By.id('destination_id'));
await destination_search.click();
await destination_search.clear();
await destination_search.sendKeys("Singapore, Singapore");
let sg_option = await driver.findElement(By.id('RsBU'));
await sg_option.click();

driver.executeScript("document.querySelector('input[type=\"date\"]').onkeydown = () => {}");

let checkin_date = await driver.findElement(By.id('checkin'));

await checkin_date.sendKeys("25122024");

let checkout_date = await driver.findElement(By.id('checkout'));
//await checkout_date.click();
await checkout_date.sendKeys("01012025");

let destination_submit = await driver.findElement(By.className("form-submit"));
await destination_submit.click();

// hotel listing page, selects first result
await driver.navigate().refresh();
await sleep(7000);

await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div[3]/button')).click();
await sleep(7000);

// hotel info page, selects 1 room of first room result
num_room_dropdown = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[9]/div[1]/div[3]/div[1]/div/div/div'));
await num_room_dropdown.click();
await driver.findElement(By.xpath('/html/body/div[3]/div[3]/ul/li[2]')).click();

await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[9]/div[1]/div[3]/div[1]/a/button')).click();
await sleep(7000);

// booking confirmation page
let firstName = await driver.findElement(By.name('firstName'));
await firstName.click();
await firstName.clear();
await firstName.sendKeys('Oh Ah');

let lastName = await driver.findElement(By.name('lastName'));
await lastName.click();
await lastName.clear();
await lastName.sendKeys('Dio');

let phoneNumber = await driver.findElement(By.name('phoneNumber'));
await phoneNumber.click();
await phoneNumber.clear();
await phoneNumber.sendKeys('80808080');

let emailAddress = await driver.findElement(By.name('emailAddress'));
await emailAddress.click();
await emailAddress.clear();
await emailAddress.sendKeys(email_address);

let salutation = await driver.findElement(By.name('salutation'));
await salutation.click();
await salutation.clear();
await salutation.sendKeys("Dr");

// validate info input up to this point
let checkin_confirm = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div[2]/div/div[1]/p[2]'));
assert(await checkin_confirm.getText() === 'Wed, 25 Dec, 2024', 'Check in date wrong!');

let checkout_confirm = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div[2]/div/div[2]/p[2]'));
assert(await checkout_confirm.getText() === 'Wed, 1 Jan, 2025', 'Check out date wrong!');

let nights_confirm = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div[2]/p[2]'));
assert(await nights_confirm.getText() === '7 nights', 'Number of nights wrong!');

let total_price = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div[2]/div[2]/div[3]/div/h5[2]'));
let total_price_val = await total_price.getText();
total_price_val = parseFloat(total_price_val.slice(1, total_price_val.length - 1), 10);
//console.log(total_price_val);

await driver.findElement(By.className('confirm-button')).click();
await sleep(7000);




//stripe payment page
let email_stripe = await driver.findElement(By.id('email'));
await email_stripe.click();
await email_stripe.clear();
await email_stripe.sendKeys(email_address);

let cardNumber = await driver.findElement(By.id('cardNumber'));
await cardNumber.click();
await cardNumber.clear();
await cardNumber.sendKeys('4242424242424242');

let cardExpiry = await driver.findElement(By.id('cardExpiry'));
await cardExpiry.click();
await cardExpiry.clear();
await cardExpiry.sendKeys('1229');

let cvc = await driver.findElement(By.id('cardCvc'));
await cvc.click();
await cvc.clear();
await cvc.sendKeys('111');

let billingName = await driver.findElement(By.id('billingName'));
await billingName.click();
await billingName.clear();
await billingName.sendKeys('Oh Wa Dio');

let currency_amt = await driver.findElement(By.className('CurrencyAmount'));
let currency_amt_val =  await currency_amt.getText();
currency_amt_val = currency_amt_val.slice(4, currency_amt_val.length-1);
currency_amt_val = parseFloat(currency_amt_val.replace(/\,/g, ''));
//console.log(currency_amt_val);
assert(currency_amt_val === total_price_val, "Total price wrong!");

let stripe_submit = await driver.findElement(By.className('SubmitButton SubmitButton--complete'));
await stripe_submit.click();

console.log("All tests passed!")
//driver.quit();
}
test();