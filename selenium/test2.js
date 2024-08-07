var chrome = require("selenium-webdriver/chrome");
const {Builder} = require('selenium-webdriver');

async function test() {

let driver = new Builder().forBrowser('chrome').build();

await driver.get('http://localhost:3001');

var promise = browser_name.getTitle();

promise.then(function(title) 

{

console.log(title);

});

browser.quit();
}
test();