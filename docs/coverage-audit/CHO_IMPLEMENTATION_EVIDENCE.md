# Cho’Veigo Resume-Tailoring Evidence Map

## Scope and source state

Read-only inspection of the local Application-Cho-Viego repository at C:/Users/samue/OneDrive/Desktop/Application-Cho-Viego. At review time its branch was feature/jobs-search-and-filters, HEAD was 98532d996747b4ea88e2bd512397e66f3222df85 (2026-08-23), and git status --short reported 226 changed/untracked paths. This tree contains extensive pre-existing staged changes. It was not modified. Accordingly, claims below separate files present at immutable HEAD from current staged working-tree behavior; staged files cannot be represented as that commit’s state and do not prove historical authorship.

The portfolio’s CASE_STUDY_CONTENT_SOURCE.md §Cho’Veigo remains the authority for public ownership and factual limits. Repository implementation proves code paths, not who authored them, which features were released, or external outcomes.

## Verified product path

### Role intake and persistence

- The job-discovery domain distinguishes a discovered posting from a user-saved record. In the committed handoff.py at HEAD (https://github.com/ShivGitHub1-n/Application-Cho-Viego/blob/98532d996747b4ea88e2bd512397e66f3222df85/src/resume_tailor/application/job_discovery/handoff.py), PrepareTailoringHandoffService.from_discovered looks up a discovered job; from_saved looks up a user-scoped saved job and uses its stored posting_snapshot. Both produce a handoff with posting ID, title, company, description, official URL, source ID, and profile ID.
- The committed saved.py (https://github.com/ShivGitHub1-n/Application-Cho-Viego/blob/98532d996747b4ea88e2bd512397e66f3222df85/src/resume_tailor/application/job_discovery/saved.py) copies a posting snapshot when a job is saved; job_discovery_sqlite.py (https://github.com/ShivGitHub1-n/Application-Cho-Viego/blob/98532d996747b4ea88e2bd512397e66f3222df85/src/resume_tailor/infrastructure/job_discovery_sqlite.py) persists completed refreshes transactionally and stores saved snapshots. Availability checks are separate from the preserved snapshot.
- The current staged Jobs UI exposes Tailor resume on a selected posting (src/resume_tailor/frontend/job_feed_view.py:301) and routes the prepared context to Resume Studio (src/resume_tailor/frontend/jobs_page.py:84-119, 484-486). The staged apply_tailoring_handoff invalidates prior derived work, binds the selected profile, prefills title/company/description, creates the active posting context, and selects the Job context stage.
- The current product contract explicitly says this button is a handoff only: it prefills existing title and description inputs and does not call Gemini, generate a plan, render/export a document, or create a cover letter (docs/PRODUCT_SPEC.md, current staged working-tree version, Batch 4 Jobs product contract).

### Separate Resume Studio method and outputs

- The current staged Resume Studio UI requires a reviewed Career Profile, then accepts or lets the user edit job title, company, and posting description before they press Generate tailored résumé (src/resume_tailor/frontend/resume_studio_page.py:466-517). The durable product spec separately says the pasted job description is the required baseline and URL research is optional.
- The staged closeout document docs/RESUME_ENGINE_CLOSEOUT.md describes the method: normalize the posting into responsibilities/required/preferred/incidental context; deterministically retrieve and admit only reviewed profile evidence; select coherent experience/project packages; optionally use a bounded Gemini rewrite shortlist; validate generated wording and fall back to reviewed source text when unavailable or rejected; then fit through Template V1. This is the Resume Studio workflow, not what the Jobs recommendation or its handoff button itself executes.
- Current staged implementation defines a GeneratedResumeArtifact with structured resume, diagnostics, identity, and exact DOCX bytes (src/resume_tailor/domain/generated_artifact.py:116-143; construction in src/resume_tailor/application/services.py:450-552). The user reviews generated content before exact page verification/export; the current UI exposes DOCX and PDF downloads (src/resume_tailor/frontend/resume_studio_page.py:855-866, 870-885, 960-1010). The closeout contract says exact Word pagination is authoritative and a final artifact fails closed when that provider is unavailable.
- No authentic completed generated resume was inspected. Repository files named manual-test/Shiv Arora MASTER.docx and manual-test/reference-resume.docx were intentionally not opened; no real user resume or output artifact is evidence for this map. The tracked synthetic fixture may support testing but should not be presented as a user result.

## Copy implication and claim limits

The React case study now shows two explicit stages: the selected discovered/saved role and reviewed profile are handed to Resume Studio as prepared inputs, then Resume Studio separately selects or rewrites grounded evidence under validation and requires human review, page verification, and document export. The handoff itself does not generate a document. Current Figma review-frame copy still has older “company sites/career pages” wording; source-sync it to the verified job-feed/persisted-role boundary before calling Figma and React fully aligned.

A truthful chapter separates these two stages:

1. Recommendation → user choice → handoff: keep Recommendation distinct and formula-unspecified; a selected discovered or saved role contributes its preserved title/company/description and selected reviewed profile to Resume Studio. The button prepares inputs only.
2. Resume Studio → reviewed output: the profile evidence and editable job description are evaluated; supported wording is selected or rewritten under evidence validation; the person reviews the result before page verification and document download.

Do not imply that Recommendation computes the resume content, that clicking its card generates a resume, that Gemini owns Fit/Eligibility/Recommendation, or that the app submits an application. The portfolio source truth supports Joshua’s Jobs-side and shared product/evaluation role, but this local repository audit does not attribute the staged implementation mechanics to him.
