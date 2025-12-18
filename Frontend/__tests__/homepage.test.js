const { renderDOM } = require("./helpers");

let dom;
let document;

describe("index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("./homepage/index.html");
    document = await dom.window.document;
  });

  it("The story button exists", () => {
    const btn = document.getElementById("story1");
    expect(btn).toBeTruthy();
  });

  it("Has a header", () => {
    const header = document.querySelector("header");
    expect(header).toBeTruthy;
  });

  it("Header contains ghost image", () => {
    const ghostimage = document.querySelector("#ghost");
    expect(ghostimage).toBeTruthy;
  });

  it("Header contains link back to homepage", () => {
    const nav2 = document.querySelector(".navbar2");
    expect(nav2).toBeTruthy;
    expect(nav2.innerHTML).toContain("Historic Hauntings");
  });

  it('Header contains user icon', () => {
    const usericon = document.querySelector('.usericon');
    expect(usericon).toBeTruthy;
    expect(usericon.innerHTML).toContain("Log Out")
    expect(usericon.innerHTML).toContain("School")
    expect(usericon.innerHTML).toContain("Username")

  });

});
