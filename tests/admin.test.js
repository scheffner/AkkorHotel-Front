import { Builder, By } from 'selenium-webdriver';

async function admin() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/button')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys('pl');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys('azerty');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();

    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/button[2]')).click();

    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/button')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div/div/input[1]'))
        .sendKeys('hotelName');
        
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div/div/input[2]'))
        .sendKeys('Paris');
        
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div/div/textarea'))
        .sendKeys('Description');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div/div/input[3]'))
        .sendKeys('/Users/paul-lucas/Desktop/hotel.jpg');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/div/button')).click();
    
    await driver.sleep(1000);
    
    await driver.navigate().refresh();
    
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/span[2]')).click();
    
    await driver.sleep(1000);

    await driver.quit();
}

admin();