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
    expect(usericon.innerHTML).toContain(`
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img id="icon" src="../FrontendImages/whiteicon-removebg-preview.png" alt="iconimage" width="116px"
            height="125px">
        </button>
        <ul class="dropdown-menu dropdown-menu-end p-3">
          <li class = "my-2"><a class="dropdown-item text-center" href="../homepage/index.html">Username</a></li>
          <li class = "my-2"><a class="dropdown-item text-center">School</a></li>
          <button class="logout my-2">Log Out</button>
        </ul>
        `)

  })

});
