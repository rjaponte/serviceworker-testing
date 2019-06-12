import puppeteer from 'puppeteer';
import { expect as e } from 'chai';
import _ from 'lodash';
import { before, after } from 'mocha';


let browser;
let expect;

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 10000
};

before (async () => {
    expect = e;
    browser = await puppeteer.launch(opts);
});

after (() => {
    browser.close();
});

export { browser, expect };