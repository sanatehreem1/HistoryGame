const { renderDOM } = require('./helpers')

let dom;
let document;

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./factfile/index.html');
    document = await dom.window.document;
  })
  it('has a button', () => {
    const btn = document.querySelector('.return-btn')
    expect(btn).toBeTruthy()
  })
  it('clicking the button changes location', () => {
    const btn = document.querySelector('.return-btn');
    const loc = dom.window.location;

    loc.assign = jest.fn();

    btn.click();

    expect(loc.href).toContain('/factfile/index.html');

  });
  
  
  it('has a div which waits for image of wife', () => {
    const portraitDiv = document.getElementById("WifeImage")
    expect(portraitDiv).toBeTruthy
  })
})

