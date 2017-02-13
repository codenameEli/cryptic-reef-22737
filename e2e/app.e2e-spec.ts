import { KatoPage } from './app.po';

describe('kato App', function() {
  let page: KatoPage;

  beforeEach(() => {
    page = new KatoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
