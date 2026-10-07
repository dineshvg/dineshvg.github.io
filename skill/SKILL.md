---
name: create-portfolio-resume
description: Generates a minimalist, highly optimized React developer portfolio and downloadable PDF resume based on this repository's template.
---

# 📄 Create Resume & Portfolio Template

You are an expert AI agent. Your task is to help the user build their own minimalist, highly optimized developer portfolio and downloadable PDF resume by customizing this template.

**CRITICAL RULE:** You must NEVER modify the original `dineshvg.github.io` repository or create Pull Requests against it. All work must be done in the user's own repository. Always explain technical concepts simply, assuming the user might be non-technical.

Follow these steps exactly:

## 1. Setup GitHub & Repository
Before making any code changes, guide the user to set up their own space:
1. **Check for GitHub Account:** Ask the user if they have a GitHub account. If they don't, explain simply that GitHub is a platform to store code and host websites for free. Provide a link (https://github.com/signup) and help them create one.
2. **Create the Website Repository:** Ask them to create a new, empty public repository on GitHub.
   - **Crucial Tip:** Explain that if they name the repository EXACTLY `<their-username>.github.io` (e.g., if their username is `johndoe`, the repo must be `johndoe.github.io`), GitHub will automatically give them a free website at that address!
3. **Duplicate the Code:** Attempt to run the following terminal commands automatically on the user's behalf to copy the template and link it to their new repo:
   - Clone this template to a new folder: `git clone https://github.com/dineshvg/dineshvg.github.io.git <USERNAME>.github.io`
   - Move into the folder: `cd <USERNAME>.github.io`
   - Remove original connection: `git remote remove origin`
   - Link to their new repo: `git remote add origin https://github.com/<USERNAME>/<USERNAME>.github.io.git`
   *If you encounter permission or environment errors that prevent you from running these commands yourself, provide the exact commands to the user and guide them to run them.*

## 2. Gather Information
Ask the user to provide their resume/CV by either pasting it into the chat or uploading it (as a Word document, PDF, or image).
1. **Parse the Upload:** If they provide a document, read it and extract as much of the following information as possible.
2. **Interview for Missing Details:** If any of the required details below are missing, gently interview the user to fill in the gaps.
3. **Fallback Template:** If they don't have a document or prefer to fill something out, provide them with a clear, text-based template/structure they can copy, fill out, and paste back.

**Required Details:**
- Full name and professional title
- Contact details (email, LinkedIn, GitHub, etc.)
- A short professional summary
- Work experience (roles, companies, dates, descriptions)
- Key projects (titles, descriptions, links)
- Education history
- Skills
- A portrait photo (ask them to provide a square JPG/PNG)
- Preferred language(s) (e.g., English, German)

## 3. Update Content (`src/content.ts`)
The entire text content of the resume is stored in `src/content.ts`.
- Replace the existing `content` object with the user's personal details.
- Keep bullet points concise and professional so the generated PDF looks neat.

## 4. Mandatory Attribution Footer (CRITICAL)
You **must** add an attribution link to the footer acknowledging the original template.

Open `src/App.tsx`, locate the `<footer>` tag at the bottom, and modify it to include a "made with this repo" link pointing to `https://dineshvg.github.io` in very small text.

Example of how to modify the footer in `src/App.tsx`:
```tsx
          <footer className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:justify-between sm:items-center">
            <span>
              © {new Date().getFullYear()} {USER_NAME} · {t.ui.footer}
            </span>
            <span className="text-[10px] text-muted/60 print-hidden">
              made with <a href="https://dineshvg.github.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">this repo</a>
            </span>
            <a href="#top" className="hover:text-ink transition-colors print-hidden">
              ↑ Top
            </a>
          </footer>
```
*(Replace `{USER_NAME}` with their actual name.)*

## 5. Customize Assets
- Place their photo in `src/assets/` and update the import in `src/App.tsx` (e.g., `import profilePic from './assets/portrait.jpg';`).

## 6. Build, Test, and Publish
1. Run these commands locally to test:
   - `npm install`
   - `npm run build`
   - `npm run dev`
2. Ask the user to open the provided local link, check their new website, and test the "Download Resume" button.
3. **Publish to the Web:** Explain in simple terms how to put their website on the internet:
   - Provide the commands to save and upload their code (`git add .`, `git commit -m "My new portfolio"`, `git push -u origin main`).
   - Guide them to their repository on github.com, click **Settings**, then **Pages** on the left menu.
   - Explain how to deploy (e.g., selecting GitHub Actions if they have a workflow set up, or selecting the `main` branch / `docs` folder depending on how their Vite build is configured). Make this as simple and foolproof as possible.
