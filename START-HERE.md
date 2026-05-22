# The Pulse Paper — your website

This folder is your website's *source*. GitHub turns it into the live
thepulsepaper.com automatically every time you save a change. You never
edit the live site directly — you edit files here, push them, and the
site rebuilds itself.

---

## PART 1 — ONE-TIME SETUP (you do this once)

You need two free accounts: a **GitHub** account (you already have one)
and that's it. Hosting is free via GitHub Pages.

### Step 1 — Put this project on GitHub

You currently have a repository (repo) where your index.html lives.
We are going to replace its contents with this project.

Easiest beginner path — through the GitHub website, no commands:

1. Go to your repository on github.com.
2. Delete the old `index.html` (open it, click the trash-can icon, commit
   the deletion). Leave `CNAME` if you have one — or this project includes
   a fresh one.
3. Click **Add file → Upload files**.
4. Drag in EVERYTHING inside this folder (not the folder itself — its
   contents): the `src` folder, `public` folder, `package.json`,
   `astro.config.mjs`, the `.github` folder, etc.
   - Note: GitHub's web uploader sometimes hides folders that start with
     a dot (like `.github`). If `.github` won't upload via drag-and-drop,
     see "Enabling the auto-build" below — you can create it by hand.
5. Scroll down, click **Commit changes**.

### Step 2 — Turn on GitHub Pages with Actions

1. In your repo, click **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**
   (NOT "Deploy from a branch"). This is the key change from your old
   setup — it tells GitHub to *build* the Astro project, not just serve
   a file.
3. That's it. GitHub will now run the build automatically.

### Step 3 — Watch the first build

1. Click the **Actions** tab in your repo.
2. You'll see a workflow running ("Deploy to GitHub Pages"). It takes
   1–2 minutes. A green check = success.
3. Visit thepulsepaper.com. Your new site is live.

If the build fails (red X), click into it to see the error, paste it to
Claude, and it'll tell you the fix.

---

## PART 2 — PUBLISHING (you do this every week)

You never touch code. You add one text file.

### To publish a free article (the kind you tweet):

1. In your repo, go to `src/content/articles/`.
2. Click **Add file → Create new file**.
3. Name it with a short slug, e.g. `gold-price-shock.md`
   (this becomes thepulsepaper.com/articles/gold-price-shock)
4. At the top, paste this block and fill it in:

   ---
   title: "Your headline here"
   summary: "One or two sentences describing the piece."
   date: 2026-05-22
   tags: ["Gold", "Markets"]
   draft: false
   ---

5. Below the closing `---`, write your article. Plain paragraphs work.
   For a sub-heading use `## Heading`. For emphasis use `**bold**`.
6. Commit. The site rebuilds and the article is live in ~2 minutes.

### To publish an edition (the gated weekly brief):

1. Go to `src/content/editions/`.
2. Create a file named `NN-slug.md`, e.g. `05-fuel-crisis.md`
   (the number controls the order; the slug is the URL).
3. Paste and fill the frontmatter (copy the existing
   `02-escalation-scenario.md` as your template — it shows every
   component: data cards, ticker, callouts, scenarios).
4. Put `<!-- more -->` at the point where the free preview should stop.
   Everything above it is the public teaser; everything below is gated.
5. Commit. Live in ~2 minutes.

### Tip: preview before publishing

Set `draft: true` in the frontmatter to keep something out of the live
site while you work on it. Set it to `false` when ready.

---

## PART 3 — CHANGING THE LOOK

Everything visual — colours, fonts — lives in ONE file:
`src/styles/theme.css`. Edit a value there, commit, and the whole site
updates. The colours are already set to your newsprint palette.

---

## RUNNING IT ON YOUR OWN COMPUTER (optional, for previewing)

If you want to see changes instantly before pushing to GitHub:

1. Install Node.js (one-time): https://nodejs.org — download the "LTS"
   version, run the installer.
2. Open Terminal (Mac) or Command Prompt (Windows).
3. Type `cd ` then drag this folder onto the window, press Enter.
4. Type `npm install` and press Enter (one-time, takes a minute).
5. Type `npm run dev` and press Enter.
6. Open the address it shows (usually http://localhost:4321) in your
   browser. Edits you save appear instantly.

You do NOT need to do this to publish — it's only for previewing.
GitHub builds the real site for you regardless.
