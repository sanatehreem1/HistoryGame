const { renderDOM } = require('./helpers')

let dom;
let document;

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('../factfile/index.html');
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
    expect(portraitDiv).toBeTruthy()
    // expect(portraitDiv.innerHTML).toContain(" ")
  })

  it('has a div which waits for early life', () => {
    const earlyDiv = document.getElementById("EarlyLife")
    expect(earlyDiv).toBeTruthy()
    expect(earlyDiv.innerHTML).toContain("Early Life")
  })
  it('has a div which waits for funfact', () => {
    const funDiv = document.getElementById("FunFact")
    expect(funDiv).toBeTruthy()
    expect(funDiv.innerHTML).toContain("Fun Fact")
  })
  it('has a div which waits for Death', () => {
    const deathDiv = document.getElementById("Death")
    expect(deathDiv).toBeTruthy()
    expect(deathDiv.innerHTML).toContain("Death")
  })
  it('has a div which waits for marriage', () => {
    const marriageDiv = document.getElementById("Marriage")
    expect(marriageDiv).toBeTruthy()
    expect(marriageDiv.innerHTML).toContain("Marriage")
  })
  it('has a div which waits for haunting', () => {
    const hauntingDiv = document.getElementById("Haunting")
    expect(hauntingDiv).toBeTruthy()
    expect(hauntingDiv.innerHTML).toContain("Haunting")
  })
})