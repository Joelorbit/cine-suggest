import Groq from "groq-sdk";
import { MovieRecommendation, SearchType } from "../types";

/* ────────────────────────────────────────────── */
/* SESSION MEMORY (NO REPEATS)                    */
/* ────────────────────────────────────────────── */

const seenTitles = new Set<string>();

const normalize = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

/* ────────────────────────────────────────────── */
/* GROQ CLIENT                                   */
/* ────────────────────────────────────────────── */

const getGroq = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GROQ_API_KEY is not set.");
  }
  return new Groq({ apiKey, dangerouslyAllowBrowser: true });
};

/* ────────────────────────────────────────────── */
/* RANDOMIZATION HELPERS                         */
/* ────────────────────────────────────────────── */

const randomFrom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const decades = ["2000s", "2010s", "2020s"];
const regions = [
  "American",
  "European",
  "Asian",
  "Middle Eastern",
  "African",
  "Latin American",
  "International"
];
const tones = [
  "intimate",
  "atmospheric",
  "fast-paced",
  "slow-burn",
  "emotionally heavy",
  "stylized",
  "character-driven",
  "visually bold"
];

/* ────────────────────────────────────────────── */
/* SYSTEM INSTRUCTION                            */
/* ────────────────────────────────────────────── */

const buildSystemInstruction = () => `
You are a professional film curator creating a modern, diverse movie catalogue.

Guidelines:
- Focus primarily on films from the 2000s onward
- Mix mainstream and arthouse naturally
- Vary genres, tones, countries, and styles
- Avoid recommending the same movie twice in one response
- Avoid clustering too many similar films
- Prioritize variety and discovery

Return valid JSON only:
{
  "movies": [
    {
      "title": "Official Title",
      "matchScore": number,
      "reason": "Short but meaningful explanation"
    }
  ]
}

Return exactly 10 movies.
`;

/* ────────────────────────────────────────────── */
/* MAIN FUNCTION                                 */
/* ────────────────────────────────────────────── */

export const getMovieRecommendations = async (
  query: string,
  type: SearchType
): Promise<MovieRecommendation[]> => {
  const groq = getGroq();
  const systemInstruction = buildSystemInstruction();

  const excluded = Array.from(seenTitles).slice(-40).join(", ");

  let userPrompt = "";

  if (type === SearchType.VIBE) {
    userPrompt = `
Create a catalogue of 10 modern films that match this vibe:
"${query}"

Preferences:
- Mostly 2000s–2020s
- Different genres and tones
- Different countries
- Each movie should feel distinct

Tone emphasis: ${randomFrom(tones)}
Region mix: ${randomFrom(regions)}

Do not include these titles:
${excluded || "None"}
`;
  } else if (type === SearchType.SIMILAR) {
    userPrompt = `
I like the film "${query}".

Recommend 10 modern films with similar appeal, but not obvious copies.
Focus on:
- Mood and storytelling style
- Emotional or thematic similarity
- Variety in execution

Decade focus: ${randomFrom(decades)}
Style bias: ${randomFrom(tones)}

Do not include these titles:
${excluded || "None"}
`;
  } else {
    userPrompt = `
Surprise me with a modern movie catalogue.

Rules:
- Mostly from 2000s–2020s
- Wide genre spread
- Mix of popular and lesser-known films
- Different countries and filmmaking styles

Random emphasis:
Tone: ${randomFrom(tones)}
Region: ${randomFrom(regions)}
Decade: ${randomFrom(decades)}

Do not include these titles:
${excluded || "None"}
`;
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      top_p: 0.9,
      presence_penalty: 0.8,
      frequency_penalty: 0.8,
      max_tokens: 1800
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    const movies = Array.isArray(parsed.movies) ? parsed.movies : [];

    const final: MovieRecommendation[] = [];

    for (const m of movies) {
      if (!m?.title) continue;

      const key = normalize(m.title);
      if (seenTitles.has(key)) continue;

      seenTitles.add(key);

      final.push({
        title: m.title.trim(),
        matchScore:
          typeof m.matchScore === "number"
            ? Math.max(0, Math.min(100, m.matchScore))
            : 85,
        reason:
          typeof m.reason === "string" && m.reason.trim()
            ? m.reason.trim()
            : "A strong modern film with distinct style and appeal."
      });
    }

    /* Self-heal if randomness collapses */
    if (final.length < 6) {
      return getMovieRecommendations(
        query + " different styles different countries",
        type
      );
    }

    return final.slice(0, 10);
  } catch (err) {
    console.error("Groq error:", err);
    throw new Error("Failed to generate movie catalogue.");
  }
};
