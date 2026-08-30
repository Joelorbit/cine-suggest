import Groq from "groq-sdk";
import { MovieRecommendation, SearchType } from "../types";

/* ────────────────────────────────────────────── */
/* SESSION MEMORY (NO REPEATS)                    */
/* ────────────────────────────────────────────── */

const seenTitles = new Set<string>();

const normalize = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

/* ────────────────────────────────────────────── */
/* GROQ CLIENT & MODEL CANDIDATES                */
/* ────────────────────────────────────────────── */

const CANDIDATE_MODELS = [
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "groq/compound"
];

const getGroq = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
    throw new Error("VITE_GROQ_API_KEY is not set. Please add it to your .env file.");
  }
  return new Groq({ apiKey: apiKey.trim(), dangerouslyAllowBrowser: true });
};

/* ────────────────────────────────────────────── */
/* RANDOMIZATION HELPERS                         */
/* ────────────────────────────────────────────── */

const randomFrom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const decades = ["2000s", "2010s", "2020s", "mix of eras"];
const regions = [
  "American",
  "European",
  "Asian",
  "Middle Eastern",
  "African",
  "Latin American",
  "International mix",
  "Nordic",
  "French",
  "Japanese",
  "Korean",
  "Indian"
];
const tones = [
  "intimate",
  "atmospheric",
  "fast-paced",
  "slow-burn",
  "emotionally heavy",
  "stylized",
  "character-driven",
  "visually bold",
  "mysterious",
  "dark comedic",
  "meditative",
  "surreal",
  "raw and visceral",
  "poetic",
  "experimental"
];

/* ────────────────────────────────────────────── */
/* SYSTEM INSTRUCTION                            */
/* ────────────────────────────────────────────── */

const buildSystemInstruction = () => `
You are an elite film curator specializing in mood-based discovery.

CRITICAL RULES:
- Return exactly 10 movies - no less, no more
- Each movie MUST be distinct in genre, tone, country, or era
- NEVER recommend two movies by the same director
- NEVER recommend sequels or the same franchise twice
- Prioritize films from 2000-2024, but can include acclaimed classics if they match perfectly
- Mix: 30% well-known, 70% hidden gems/lesser-known films
- Vary countries and languages significantly
- Vary release decades within the specified range

SCORING RULES:
- matchScore 90-100: Perfect emotional/thematic match
- matchScore 75-89: Strong match with interesting twist
- matchScore 60-74: Good match but with notable difference
- Never score below 60

QUALITY STANDARDS:
- IMDb rating typically 6.5+
- Films with artistic merit and distinctive voice
- Avoid low-budget direct-to-streaming unless critically acclaimed
- Prioritize cinematography, storytelling, emotional impact

Return ONLY valid JSON with this exact structure:
{
  "movies": [
    {
      "title": "Exact Official Title",
      "matchScore": 92,
      "reason": "Specific 1-2 sentence explanation connecting the film to the mood/query"
    }
  ]
}
`;

/* ────────────────────────────────────────────── */
/* JSON PARSER HELPER                            */
/* ────────────────────────────────────────────── */

const parseGroqJson = (rawContent: string): { movies?: any[] } => {
  let content = (rawContent || "").trim();
  // Strip markdown code fences if present
  if (content.includes("```")) {
    content = content.replace(/```(?:json)?([\s\S]*?)```/gi, "$1").trim();
  }
  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    content = content.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(content);
};

/* ────────────────────────────────────────────── */
/* MAIN FUNCTION                                 */
/* ────────────────────────────────────────────── */

export const getMovieRecommendations = async (
  query: string,
  type: SearchType,
  retryCount: number = 0
): Promise<MovieRecommendation[]> => {
  const groq = getGroq();
  const systemInstruction = buildSystemInstruction();

  // Sanitize query to prevent input overflow or breaking prompts
  const cleanQuery = (query || "").slice(0, 300).trim();
  const excluded = Array.from(seenTitles).slice(-40).join(", ");

  let userPrompt = "";

  if (type === SearchType.VIBE) {
    userPrompt = `
I want to watch a film with this mood/feeling:
"${cleanQuery}"

Deliver 10 modern films that capture this exact emotional/atmospheric essence.

REQUIREMENTS:
✓ Each must authentically match this mood
✓ Different genres, countries, and styles
✓ Mix different decades (2000s, 2010s, 2020s)
✓ Include indie/arthouse gems alongside mainstream
✓ No similar directors or franchises
✓ High artistic quality throughout

EMPHASIS:
Primary Tone: ${randomFrom(tones)}
Geographic Mix: ${randomFrom(regions)}
Include a mix of: dialogue-heavy, visual-driven, music-led, silence-heavy

EXCLUDE these titles (already seen):
${excluded || "None"}

After analyzing the mood "${cleanQuery}", recommend films that truly embody it.
`;
  } else if (type === SearchType.SIMILAR) {
    userPrompt = `
I loved watching "${cleanQuery}".

Recommend 10 similar but distinct films based on:
- Emotional resonance and storytelling approach
- Visual style or cinematographic philosophy
- Thematic depth
- Character-driven or plot-driven similarity

IMPORTANT:
✓ Don't recommend obvious sequels or very similar films
✓ Look for thematic/emotional parallels instead of surface-level copying
✓ Include films from different eras and countries
✓ Mix mainstream with lesser-known gems

PRIMARY STYLE FOCUS: ${randomFrom(tones)}
DECADE PREFERENCE: ${randomFrom(decades)}
REGION MIX: ${randomFrom(regions)}

EXCLUDE these titles (already seen):
${excluded || "None"}

Suggest films that fans of "${cleanQuery}" would find exciting and fresh.
`;
  } else {
    userPrompt = `
Give me a random, eclectic, and discovery-focused modern film catalogue.

Create 10 films that span:
- Multiple genres and subgenres
- Various countries and film traditions
- Mix of eras (2000s to 2020s)
- High-quality mainstream + hidden gems
- Different storytelling approaches

RANDOMNESS PARAMETERS:
Primary Tone: ${randomFrom(tones)}
Region Focus: ${randomFrom(regions)}
Decade Bias: ${randomFrom(decades)}

REQUIREMENTS:
✓ Maximum variety - minimize overlap
✓ Each film should feel like a discovery
✓ No franchises or sequels
✓ Artistic merit is essential
✓ Range from intimate character studies to epic scope

EXCLUDE these titles (already seen):
${excluded || "None"}

Curate a fresh, surprising, high-quality collection that introduces viewers to great cinema.
`;
  }

  let lastError: Error | null = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      });

      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = parseGroqJson(raw);
      const movies = Array.isArray(parsed.movies) ? parsed.movies : [];

      const final: MovieRecommendation[] = [];

      for (const m of movies) {
        if (!m?.title || typeof m.title !== "string") continue;

        const key = normalize(m.title);
        if (seenTitles.has(key)) continue;

        seenTitles.add(key);

        final.push({
          title: m.title.trim(),
          matchScore:
            typeof m.matchScore === "number"
              ? Math.max(60, Math.min(100, Math.round(m.matchScore)))
              : 85,
          reason:
            typeof m.reason === "string" && m.reason.trim()
              ? m.reason.trim()
              : "A strong modern film with distinct style and appeal."
        });
      }

      /* If enough recommendations gathered, return */
      if (final.length >= 5) {
        return final.slice(0, 10);
      }

      /* Self-heal once if randomness collapses */
      if (final.length < 5 && retryCount < 1) {
        console.warn(`Only ${final.length} unique films found with ${model}, retrying with diversity boost...`);
        return getMovieRecommendations(
          cleanQuery + " explore different genres different countries different eras hidden gems",
          type,
          retryCount + 1
        );
      }

      if (final.length > 0) {
        return final.slice(0, 10);
      }
    } catch (err: any) {
      console.warn(`Groq request failed with model ${model}:`, err?.message || err);
      lastError = err;
      // Continue to next candidate model
    }
  }

  console.error("All Groq candidate models failed:", lastError);
  throw new Error("Failed to generate movie catalogue from Groq AI. Please check your network and API key.");
};
