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

Return ONLY valid JSON with this structure:
{
  "movies": [
    {
      "title": "Exact Official Title",
      "matchScore": number (60-100),
      "reason": "Specific 1-2 sentence explanation connecting the film to the mood/query"
    }
  ]
}
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
I want to watch a film with this mood/feeling:
"${query}"

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

After analyzing the mood "${query}", recommend films that truly embody it.
`;
  } else if (type === SearchType.SIMILAR) {
    userPrompt = `
I loved watching "${query}".

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

Suggest films that fans of "${query}" would find exciting and fresh.
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

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.95,
      top_p: 0.95,
      presence_penalty: 1.0,
      frequency_penalty: 1.0,
      max_tokens: 2200
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

    /* Self-heal if randomness collapses - retry with better diversity instructions */
    if (final.length < 6) {
      console.warn(`Only ${final.length} unique films found, retrying with diversity boost...`);
      return getMovieRecommendations(
        query + " explore different genres different countries different eras hidden gems",
        type
      );
    }

    return final.slice(0, 10);
  } catch (err) {
    console.error("Groq error:", err);
    throw new Error("Failed to generate movie catalogue.");
  }
};
