import {test, expect} from "@playwright/test";
import deleteFile from "./Helpers.js";
import TextSamples from "./fileText.js";

const fs = require('fs');
const readline = require('readline');

test.describe("Txt file download testing", () => {

    test("Test txt file download", async({page}) => {
        await page.goto("https://the-internet.herokuapp.com/download");

        const downloadPromise = page.waitForEvent('download');
        await page.locator("//a[text()='LambdaTest.txt']").click();
        
        const download = await downloadPromise;
        const path = `./tests/downloads/${download.suggestedFilename()}`;
        await download.saveAs(path);

        const stream = fs.createReadStream(path);
        const reader = readline.createInterface({
            input:stream,
            crlfDelay:Infinity
        })

        
        reader.on('line', (line) => {
            expect(line).toEqual(TextSamples.text);
        })

        
        reader.on('close', () => {
            deleteFile(path);
        })
        
    })

    test.afterEach(async({page}) => {
        await page.close();
    })
})