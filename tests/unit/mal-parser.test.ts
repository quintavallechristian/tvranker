import { describe, it, expect } from "vitest";
import { parseMalXml, validateMalXml } from "@/lib/import/mal-parser";
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
    expect(result.shows[0]).toEqual({
      title: "3-gatsu no Lion",
      imdb_id: null,
    });
    expect(result.shows[1]).toEqual({
      title: "Blue Lock",
      imdb_id: null,
    });
    expect(result.shows[2]).toEqual({
      title: "Ao no Hako",
      imdb_id: null,
    });
  });

  it("skips Plan to Watch and Dropped entries", () => {
    const result = parseMalXml(validXml);
    const titles = result.shows.map((s) => s.title);
    expect(titles).not.toContain("Ao no Hako Season 2");
    expect(titles).not.toContain("Dropped Show");
  });

  it("deduplicates shows by title (case-insensitive)", () => {
    const xmlWithDupes = `<?xml version="1.0" encoding="UTF-8" ?>
<myanimelist>
  <myinfo></myinfo>
  <anime>
    <series_title><![CDATA[My Show]]></series_title>
    <my_status>Completed</my_status>
  </anime>
  <anime>
    <series_title><![CDATA[my show]]></series_title>
    <my_status>Completed</my_status>
  </anime>
</myanimelist>`;

    const result = parseMalXml(xmlWithDupes);
    expect(result.shows).toHaveLength(1);
    expect(result.shows[0].title).toBe("My Show");
  });

  it("throws on invalid XML", () => {
    expect(() => parseMalXml("not xml at all <><><<")).toThrow();
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
