import global from "./global"; // Ajustez le chemin vers votre classe Global
import chalk from "chalk";

// Simulez chalk pour éviter les problèmes liés à l'output dans les tests
jest.mock('chalk', () => ({
  red: jest.fn((text) => `red(${text})`) // Simuler chalk.red
}));

describe("Global class", () => {
  test("should set rootHostName when setUrl is called", () => {
    global.setUrl("https://example.com/page");
    expect(global.rootHostName).toBe("https://example.com");
  });

  test("setCheckExternal should update checkExternal", () => {
    expect(global.checkExternal).toBeFalsy(); // Valeur initiale
    global.setCheckExternal(true);
    expect(global.checkExternal).toBeTruthy();
  });

  test("setAnomaly should log the anomaly and add it to the list", () => {
    const anomaly = "Missing link";
    console.log = jest.fn(); // Simuler console.log

    global.setAnomaly(anomaly);
    expect(console.log).toHaveBeenCalledWith(chalk.red(anomaly));
    expect(global.anomalies).toContain(anomaly);
  });

  test("setPageTested should add url to pagesTested", () => {
    const url = "https://example.com/about";
    global.setPageTested(url);
    expect(global.pagesTested).toContain(url);
  });

  test("isPageTested should return true if page has been tested", () => {
    const url = "https://example.com/contact";
    global.setPageTested(url);
    expect(global.isPageTested(url)).toBeTruthy();
  });

  test("setTestedUrl should add url to testedUrls", () => {
    const url = "https://example.com/home";
    global.setTestedUrl(url);
    expect(global.testedUrls).toContain(url);
  });

  test("isNotTested should return true if url has not been tested", () => {
    const url = "https://example.com/home-2";
    expect(global.isNotTested(url)).toBeTruthy();
    global.setTestedUrl(url);
    expect(global.isNotTested(url)).toBeFalsy();
  });

  test("setExcludeStatus should parse and set excluded statuses", () => {
    const status = "404,500,502";
    global.setExcludeStatus(status);
    expect(global.excludedStatus).toEqual([404, 500, 502]);
  });
});
