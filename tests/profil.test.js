import { Builder, By } from 'selenium-webdriver';

async function profil() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000/');

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/button/a')).click();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys('test');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();

    await driver.sleep(2000);

    await driver.findElement(By.xpath('//*[@id="root"]/div/div/a')).click();

    await driver.sleep(1000);

    const text = await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/h1'))
        .getText(); 

    if (text === 'Profile') {
        console.log('On the right page');
    }

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/input[1]'))
        .clear();

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/input[1]'))
        .sendKeys('test2');

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div[1]/div/span')).click();  
    
    await driver.sleep(1000);

    await driver.navigate().refresh();
    
    await driver.quit();
}

profil();