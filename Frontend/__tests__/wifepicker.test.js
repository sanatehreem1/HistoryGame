
/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

global.fetch = jest.fn();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

global.alert = jest.fn();
global.console.error = jest.fn();

describe("Wife Picker Script Tests", () => {
  let scriptContent;
  let checkWifeByName, showCorrectScreen, showWrongScreen;

  beforeAll(() => {
    scriptContent = fs.readFileSync(
      path.join(__dirname, "../wifepicker/script.js"),
      "utf-8"
    );
    
    // Simply replace the problematic })} with proper closing
    scriptContent = scriptContent.replace('})}', '});\n}');
    
    // Add exports at the end ONLY if not already there
    if (!scriptContent.includes('global.checkWifeByName')) {
      scriptContent += `\n
if (typeof global !== 'undefined') {
  global.checkWifeByName = checkWifeByName;
  global.showCorrectScreen = showCorrectScreen;
  global.showWrongScreen = showWrongScreen;
}
`;
    }
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="img-box">
        <img src="test.jpg" alt="Anne Boleyn">
        <div class="img-label">Anne Boleyn</div>
        <button class="pickera">Pick</button>
      </div>
      <div class="img-box">
        <img src="test2.jpg" alt="Jane Seymour">
        <div class="img-label">Jane Seymour</div>
        <button class="pickera">Pick</button>
      </div>
      <div class="dropdown-item text-center"></div>
      <div class="dropdown-item text-center"></div>
    `;

    jest.clearAllMocks();
    fetch.mockClear();
    localStorageMock.getItem.mockClear();
    global.alert.mockClear();
    global.console.error.mockClear();

    delete window.location;
    window.location = { href: "" };

    eval(scriptContent);
    
    checkWifeByName = global.checkWifeByName;
    showCorrectScreen = global.showCorrectScreen;
    showWrongScreen = global.showWrongScreen;
  });

  afterEach(() => {
    const popup = document.getElementById("result-popup");
    if (popup) popup.remove();
  });

  const mockCharacters = [
    {
      character_id: 1,
      name: "Catherine of Aragon",
      correct_answer: false,
      early_life: "Test",
      marriage: "Test",
      fun_fact: "Test",
      death: "Test",
      haunting_motives: "Test",
    },
    {
      character_id: 2,
      name: "Anne Boleyn",
      correct_answer: true,
      early_life: "Anne grew up in European royal courts",
      marriage: "Led to England breaking from Catholic Church",
      fun_fact: "Mother of Elizabeth I",
      death: "Executed by beheading in 1536",
      haunting_motives: "Seeking justice",
    },
    {
      character_id: 3,
      name: "Jane Seymour",
      correct_answer: false,
      early_life: "Test",
      marriage: "Test",
      fun_fact: "Test",
      death: "Test",
      haunting_motives: "Test",
    },
  ];

  it("should fetch characters from the correct endpoint", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    await checkWifeByName("Anne Boleyn");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/characters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("should show correct screen when correct wife is selected", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    await checkWifeByName("Anne Boleyn");

    const popup = document.getElementById("result-popup");
    expect(popup).toBeTruthy();
    expect(popup.innerHTML).toContain("Correct!");
    expect(popup.innerHTML).toContain("Anne Boleyn is the ghost haunting the manor!");
  });

  it("should show wrong screen when incorrect wife is selected", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    await checkWifeByName("Jane Seymour");

    const popup = document.getElementById("result-popup");
    expect(popup).toBeTruthy();
    expect(popup.innerHTML).toContain("Wrong!");
    expect(popup.innerHTML).toContain("Jane Seymour is not the ghost.");
  });

  it("should log error when character not found", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    await checkWifeByName("Unknown Wife");

    expect(console.error).toHaveBeenCalledWith("Character not found:", "Unknown Wife");
  });

  it("should show alert on network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await checkWifeByName("Anne Boleyn");

    expect(console.error).toHaveBeenCalledWith("Error fetching character:", expect.any(Error));
    expect(alert).toHaveBeenCalledWith("Error connecting to server. Please try again.");
  });

  it("should navigate to homepage when next button clicked", () => {
    showCorrectScreen("Anne Boleyn", 2);

    const button = document.getElementById("next-btn");
    button.click();

    expect(window.location.href).toBe("../homepage/index.html");
  });

  it("should navigate to intro page when try again clicked", () => {
    showWrongScreen("Jane Seymour");

    const button = document.getElementById("close-popup");
    button.click();

    expect(window.location.href).toBe("../intropage/index.html");
  });

  it("should load username and school from localStorage", () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === "user") return "TestUser";
      if (key === "school") return "TestSchool";
      return null;
    });

    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);

    const dropdownItems = document.querySelectorAll(".dropdown-item.text-center");

    expect(localStorageMock.getItem).toHaveBeenCalledWith("user");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("school");
    expect(dropdownItems[0].textContent).toBe("TestUser");
    expect(dropdownItems[1].textContent).toBe("TestSchool");
  });
});