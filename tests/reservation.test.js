import { Builder, By } from 'selenium-webdriver';

async function reservation() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/button/a')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();

    await driver.sleep(1000);

    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');

    await driver.sleep(1000);
    
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[2]/div[2]/div[13]/a/button')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[2]/div[1]/button')).click();
    
    await driver.sleep(1000);
    
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/input[1]')).sendKeys('20-12-2024');
    
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/input[2]')).sendKeys('21-12-2024');

    await driver.findElement(By.xpath('//*[@id="number-dd-0"]')).click();
    await driver.findElement(By.xpath('//*[@id="number-dd-0"]/option[2]')).click();

    await driver.findElement(By.xpath('//*[@id="number-dd-1"]')).click();
    await driver.findElement(By.xpath('//*[@id="number-dd-1"]/option[2]')).click();
    
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div[3]/button')).click();
    
    await driver.findElement(By.xpath('//*[@id="root"]/div/h2')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/a')).click();

    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');

    const text = await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[2]/h1')).getText();

    if (text === 'Your reservations') {
        console.log('On the right page');
    }

    await driver.sleep(3000);

    await driver.quit();
}

reservation();