import { describe, it, expect } from "vitest";
import { parseMalXml, validateMalXml, extractBaseTitle } from "@/lib/import/mal-parser";
import { JSDOM } from "jsdom";

// Ensure DOMParser is available in test environment
if (typeof globalThis.DOMParser === "undefined") {
  const { JSDOM: JSDOMClass } = await import("jsdom");
  globalThis.DOMParser = new JSDOMClass().window.DOMParser;
}

const validXml = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo>
    <user_id>12345</user_id>
    <user_name>TestUser</user_name>
    <user_total_anime>5</user_total_anime>
  </myinfo>
  <anime>
    <series_animedb_id>31646</series_animedb_id>
    <series_title><![CDATA[3-gatsu no Lion]]></series_title>
    <series_type>TV</series_type>
    <series_episodes>22</series_episodes>
    <my_score>9</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_animedb_id>49596</series_animedb_id>
    <series_title><![CDATA[Blue Lock]]></series_title>
    <series_type>TV</series_type>
    <series_episodes>24</series_episodes>
    <my_score>9</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_animedb_id>57181</series_animedb_id>
    <series_title><![CDATA[Ao no Hako]]></series_title>
    <series_type>TV</series_type>
    <series_episodes>25</series_episodes>
    <my_score>8</my_score>
    <my_status>Watching</my_status>
  </anime>
  <anime>
    <series_animedb_id>61323</series_animedb_id>
    <series_title><![CDATA[Ao no Hako Season 2]]></series_title>
    <series_type>TV</series_type>
    <series_episodes>0</series_episodes>
    <my_score>0</my_score>
    <my_status>Plan to Watch</my_status>
  </anime>
  <anime>
    <series_animedb_id>99999</series_animedb_id>
    <series_title><![CDATA[Dropped Show]]></series_title>
    <series_type>TV</series_type>
    <series_episodes>12</series_episodes>
    <my_score>3</my_score>
    <my_status>Dropped</my_status>
  </anime>
</myanimelist>`;

describe("parseMalXml", () => {
  it("parses valid MAL XML and extracts completed/watching shows", () => {
    const result = parseMalXml(validXml);

    expect(result.name).toBe("MyAnimeList Import");
    expect(result.shows).toHaveLength(3);
    expect(result.moviesSkipped).toBe(0);
    expect(result.shows[0]).toEqual({
      title: "3-gatsu no Lion",
      imdb_id: null,
      score: 9,
    });
    expect(result.shows[1]).toEqual({
      title: "Blue Lock",
      imdb_id: null,
      score: 9,
    });
    expect(result.shows[2]).toEqual({
      title: "Ao no Hako",
      imdb_id: null,
      score: 8,
    });
  });

  it("skips Plan to Watch and Dropped entries", () => {
    const result = parseMalXml(validXml);
    const titles = result.shows.map((s) => s.title);
    expect(titles).not.toContain("Ao no Hako Season 2");
    expect(titles).not.toContain("Dropped Show");
  });

  it("excludes movies and counts them in moviesSkipped", () => {
    const xmlWithMovie = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo></myinfo>
  <anime>
    <series_title><![CDATA[Sen to Chihiro no Kamikakushi]]></series_title>
    <series_type>Movie</series_type>
    <my_score>10</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[Attack on Titan]]></series_title>
    <series_type>TV</series_type>
    <my_score>9</my_score>
    <my_status>Completed</my_status>
  </anime>
</myanimelist>`;

    const result = parseMalXml(xmlWithMovie);
    expect(result.shows).toHaveLength(1);
    expect(result.shows[0].title).toBe("Attack on Titan");
    expect(result.moviesSkipped).toBe(1);
  });

  it("deduplicates shows by base title — later seasons are merged", () => {
    const xmlWithDupes = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo></myinfo>
  <anime>
    <series_title><![CDATA[My Show]]></series_title>
    <series_type>TV</series_type>
    <my_score>7</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[my show]]></series_title>
    <series_type>TV</series_type>
    <my_score>8</my_score>
    <my_status>Completed</my_status>
  </anime>
</myanimelist>`;

    const result = parseMalXml(xmlWithDupes);
    expect(result.shows).toHaveLength(1);
    expect(result.shows[0].title).toBe("My Show");
    expect(result.shows[0].score).toBe(7);
  });

  it("skips later seasons and counts them in seasonsSkipped", () => {
    const xmlSeasons = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo></myinfo>
  <anime>
    <series_title><![CDATA[Attack on Titan]]></series_title>
    <series_type>TV</series_type>
    <my_score>9</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[Attack on Titan Season 2]]></series_title>
    <series_type>TV</series_type>
    <my_score>8</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[Attack on Titan Season 3]]></series_title>
    <series_type>TV</series_type>
    <my_score>10</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[Fruits Basket 1st Season]]></series_title>
    <series_type>TV</series_type>
    <my_score>8</my_score>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[Fruits Basket 2nd Season]]></series_title>
    <series_type>TV</series_type>
    <my_score>9</my_score>
    <my_status>Completed</my_status>
  </anime>
</myanimelist>`;

    const result = parseMalXml(xmlSeasons);
    expect(result.shows).toHaveLength(2);
    expect(result.shows[0].title).toBe("Attack on Titan");
    expect(result.shows[1].title).toBe("Fruits Basket");
    expect(result.seasonsSkipped).toBe(3); // Season 2, Season 3, 2nd Season
  });

  it("sets score to null when my_score is 0 (unrated)", () => {
    const xmlUnrated = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo></myinfo>
  <anime>
    <series_title><![CDATA[Unrated Show]]></series_title>
    <my_score>0</my_score>
    <my_status>Completed</my_status>
  </anime>
</myanimelist>`;

    const result = parseMalXml(xmlUnrated);
    expect(result.shows[0].score).toBeNull();
  });

  it("throws on invalid XML", () => {
    expect(() => parseMalXml("not xml at all <><><<")).toThrow();
  });
});

describe("extractBaseTitle", () => {
  it.each([
    ["3-gatsu no Lion 2nd Season", "3-gatsu no Lion"],
    ["Aharen-san wa Hakarenai Season 2", "Aharen-san wa Hakarenai"],
    ["Fruits Basket 1st Season", "Fruits Basket"],
    ["Haikyuu!! Second Season", "Haikyuu!!"],
    ["Beastars Final Season", "Beastars"],
    ["Spy x Family Part 2", "Spy x Family"],
    ["Spy x Family Season 2", "Spy x Family"],
    ["Gokushufudou Part 2", "Gokushufudou"],
    ["Shingeki no Kyojin Season 3 Part 2", "Shingeki no Kyojin"],
    ["Shingeki no Kyojin: The Final Season", "Shingeki no Kyojin"],
    ["Shingeki no Kyojin: The Final Season Part 2", "Shingeki no Kyojin"],
    ["Shingeki no Kyojin: The Final Season - Kanketsu-hen", "Shingeki no Kyojin"],
    ["Ore dake Level Up na Ken Season 2: Arise from the Shadow", "Ore dake Level Up na Ken"],
    ["Kusuriya no Hitorigoto 3rd Season Part 2", "Kusuriya no Hitorigoto"],
    // Titles without season suffix should be unchanged
    ["Attack on Titan", "Attack on Titan"],
    ["Blue Lock", "Blue Lock"],
  ])("%s → %s", (input, expected) => {
    expect(extractBaseTitle(input)).toBe(expected);
  });
});

describe("validateMalXml", () => {
  it("returns success for valid MAL XML", () => {
    const result = validateMalXml(validXml);
    expect(result.success).toBe(true);
  });

  it("returns error for XML with no anime entries", () => {
    const emptyXml = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist><myinfo></myinfo></myanimelist>`;

    const result = validateMalXml(emptyXml);
    expect(result.success).toBe(false);
    expect(result.error).toContain("No anime entries");
  });

  it("returns error for invalid XML", () => {
    const result = validateMalXml("not valid xml <><");
    expect(result.success).toBe(false);
  });
});
