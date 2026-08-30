#Skill-pack design research

This refactor was informed by current public guidance for portable Agent Skills and by the discovery model used by skills registries.

| Source | Relevant pattern                                                                                                                                       | Applied change                                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1]    | Start from real tasks and corrections, keep skills coherent, prefer defaults, expose gotchas, and use progressive disclosure.                          | Reworked each skill around a focused default workflow, decision rules, gotchas, and a small core file.                                              |
| [2]    | Skill metadata is discovered before the body; detail and bundled resources should load on demand; prescriptiveness should match operational fragility. | Strengthened activation descriptions, moved EyuTheme detail to a reference, and separated flexible engineering guidance from exact safety controls. |
| [3]    | Skills are folders containing instructions, scripts, and resources; progressive disclosure and deterministic scripts improve scale and reliability.    | Added a deterministic pack validator and documented the `SKILL.md`, `references/`, `scripts/`, and `templates/` contract.                           |
| [4]    | Evaluation should use realistic prompts, varied phrasing, edge cases, observable assertions, and comparison against a baseline or previous version.    | Added evaluation guidance to `skill-creator` and made validation a documented repository step.                                                      |
| [5]    | Registry distribution favors portable packages, simple installation, clear metadata, and compatibility across multiple coding agents.                  | Removed machine-specific paths, documented clone and registry installation, and added explicit portability rules.                                   |

## Design decisions

The pack keeps ten concerns rather than creating a single monolithic “engineering” skill. The skills can compose through the registry in `.agents/AGENTS.md`, while the local repository remains authoritative for project-specific conventions. Generic frontend guidance no longer forces EyuTheme onto unrelated projects; EyuTheme remains available as an explicit progressive-disclosure reference when a target repository adopts it.

The validator intentionally focuses on deterministic structural guarantees: frontmatter, naming, activation descriptions, file budgets, local references, portability, and registry consistency. It does not pretend to measure agent output quality. Real task evaluations remain necessary for workflow quality, especially for security-sensitive or operational skills.

## References

[1]: https://agentskills.io/skill-creation/best-practices "Agent Skills — Best practices for skill creators"
[2]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices "Claude Platform Docs — Skill authoring best practices"
[3]: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills "Anthropic Engineering — Equipping agents for the real world with Agent Skills"
[4]: https://agentskills.io/skill-creation/evaluating-skills "Agent Skills — Evaluating skill output quality"
[5]: https://www.skills.sh/ "skills.sh — The Agent Skills Directory"

The current skills CLI documentation confirms that a repository can expose skills through a GitHub shorthand install and that the CLI searches supported repository layouts and subpaths for `SKILL.md` packages. The pack retains its `.agents/skills/<name>/SKILL.md` layout and documents both repository-local cloning and registry installation so consumers can choose the host's preferred discovery path.

[6]: https://vercel-labs-skills.mintlify.app/guides/source-formats "Skills CLI — Source Formats"
