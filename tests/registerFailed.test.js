import { Builder, By } from 'selenium-webdriver';

async function register() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/a')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys('testgmail.com');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[3]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();

    await driver.sleep(2000);

    let errorMessage = await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div[1]')).getText();

    if (errorMessage === 'Username already exists or invalid email') {
        console.log('Test passed');
    }

    await driver.quit();
}

register();