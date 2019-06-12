import { describe, it } from 'mocha';

import { browser, expect } from './bootstrap';

describe('sample test', async () => {
    it('should work', async () => {
        console.log(await browser.version());
        expect(true).to.be.true;
    });
});