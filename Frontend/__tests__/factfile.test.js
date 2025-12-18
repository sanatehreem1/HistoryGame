const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Fact File Page", () => {
  test("should render the Return button", () => {
    const htmlPath = path.resolve(__dirname, "../factfile/index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    const dom = new JSDOM(html);
    const { document } = dom.window;

    const returnBtn = document.querySelector(".return-btn");
    expect(returnBtn).not.toBeNull();
    expect(returnBtn.textContent.trim()).toBe("Return");
  });

  test("clicking Return should redirect to homepage", () => {
    const htmlPath = path.resolve(__dirname, "../factfile/index.html");
    const scriptPath = path.resolve(__dirname, "../factfile/script.js");

    const html = fs.readFileSync(htmlPath, "utf8");
    const dom = new JSDOM(html, { url: "http://localhost/factfile/index.html" });

    global.window = dom.window;
    global.document = dom.window.document;

    delete global.window.location;
    global.window.location = { href: "http://localhost/factfile/index.html" };

    require(scriptPath);

    const returnBtn = global.document.querySelector(".return-btn");
    expect(returnBtn).not.toBeNull();

    returnBtn.click();

    expect(global.window.location.href).toContain("../homepage/index.html");
  });
});
