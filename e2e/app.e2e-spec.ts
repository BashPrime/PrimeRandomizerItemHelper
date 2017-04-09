import { PrimeRandomizerItemHelperPage } from './app.po';

describe('prime-randomizer-item-helper App', () => {
  let page: PrimeRandomizerItemHelperPage;

  beforeEach(() => {
    page = new PrimeRandomizerItemHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
