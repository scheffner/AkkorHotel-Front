import { Builder, By } from 'selenium-webdriver';

async function login() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/button/a')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();

    await driver.quit();
}

login();