# Personal Portfolio Website

A simple, static personal website that organizes your past experiences and work into four main areas: **Tech**, **Art**, **Digital Humanities**, and **Critical Thinking**. Each area is a section with its own page and subsections.

---

## What the Website Does

### Main page (Home)

- **Top (header):** Your name and contact links (email, LinkedIn, GitHub). The name links to the home page on section pages.
- **Middle:** A short self-introduction. You can describe how you work across tech, art, digital humanities, and critical thinking.
- **Section cards:** Four clickable cards—Tech, Art, Digital Humanities, Critical Thinking. Each card links to a dedicated section page.
- **Bottom:** “A few projects”—a **random** selection of projects drawn from all sections. Each time the page loads, up to 6 projects are chosen at random and displayed. Each project can link to a specific subsection on a section page.

### Section pages

When you click a section (e.g. Tech), you go to that section’s page. Each section page has:

- **Breadcrumb:** Home / Section name.
- **Section title and short lead text.**
- **Subsections:** Several subsections (e.g. “Software & development”, “Data & visualization”). Each subsection has an `id` so you can link directly to it (e.g. from the random projects on the home page).

You can edit the subsection titles and content to match your real work.

---

## Project Structure

```
persoanl site/
├── index.html              # Main (home) page
├── README.md               # This file
├── css/
│   └── style.css           # All styles for the site
├── js/
│   ├── main.js             # Home page logic (random projects, footer year)
│   └── projects-data.js    # List of projects for the “random projects” block
└── sections/
    ├── tech.html           # Tech section and its subsections
    ├── art.html            # Art section and its subsections
    ├── digital-humanities.html
    └── critical-thinking.html
```

---

## What Each Part of the Code Does

### `index.html`

- **`<head>`:** Sets charset, viewport, page title, Google Fonts (DM Serif Display, Source Sans 3), and the main stylesheet `css/style.css`.
- **`<header class="site-header">`:** Wraps your name and contact nav (email, LinkedIn, GitHub).
- **`<main>`:**  
  - **Intro:** One paragraph for your self-introduction.  
  - **Section cards:** Four `<a>` links styled as cards; each goes to the corresponding file in `sections/`.  
  - **Random projects:** A container `#random-projects-container` that `main.js` fills with project cards from `projects-data.js`.
- **`<footer>`:** Copyright and year (year is set by `main.js`).
- **Scripts:** Loads `js/projects-data.js` (so `PROJECTS` exists) then `js/main.js`.

### `css/style.css`

- **`:root`:** CSS variables for colors, fonts, max-width, spacing, and border radius. Change these to adjust the look site-wide.
- **Base:** Resets, body font, link colors, and a `.visually-hidden` utility for screen readers.
- **Header:** Layout for name + contact nav; `.site-name--link` for when the name is a link (on section pages).
- **Main (home):** Styles for intro text, section cards (grid, hover), and the random projects grid and project cards.
- **Section pages:** Breadcrumb, section title, lead paragraph, and subsections (spacing and borders).
- **Footer:** Top border, padding, muted text.
- **Responsive:** At small widths, section cards and project grid become a single column.

### `js/projects-data.js`

- Defines a single array **`PROJECTS`**. Each item has:
  - `title`: Project name.
  - `section`: One of `'tech'`, `'art'`, `'digital-humanities'`, `'critical-thinking'` (used for the label and for filtering if you extend the script).
  - `description`: Short blurb.
  - `link`: Optional URL (e.g. `sections/tech.html#sub-section-1`) for the project title link.
  - `year`: Optional year string.
- **You edit this file** to add, remove, or change projects. The home page “random projects” block uses only this list.

### `js/main.js`

- **Footer year:** Finds the element with `id="year"` and sets its text to the current year.
- **Random projects:** If `#random-projects-container` exists and `PROJECTS` is defined, it:
  - Shuffles a copy of `PROJECTS`.
  - Takes the first 6 (or fewer if there aren’t 6).
  - For each, creates a project card (title, section + year, description) and appends it to the container. Titles are linked when `link` is present.
- **Security:** Uses a simple `escapeHtml` helper so project text is not interpreted as HTML.

### Section HTML files (`sections/*.html`)

- **Same structure as home** for header and footer, but:
  - The site name in the header links back to `../index.html`.
  - Stylesheet is `../css/style.css`.
- **Main content:**
  - Breadcrumb: Home link + current section name.
  - One `<h1>` for the section and a lead paragraph.
  - A list of **subsections**. Each subsection is a `<section>` with a unique `id` (e.g. `id="sub-section-1"`). You can link to these from the home page (e.g. in `projects-data.js` with `link: 'sections/tech.html#sub-section-1'`).
- **Footer:** Includes “Back to home” and the current year (set by a small inline script).

You can add more subsections by copying a subsection block and giving it a new `id` and content.

---

## How to Customize

1. **Your name and contact:** Replace “Your Name” and the email/LinkedIn/GitHub URLs in `index.html` and in each file in `sections/`.
2. **Self-introduction:** Edit the paragraph inside `.intro-section` in `index.html`.
3. **Projects:** Edit `js/projects-data.js`: add/remove/change entries and set `link` to point to the right section page and subsection (e.g. `sections/art.html#sub-section-2`).
4. **Section content:** In each `sections/*.html`, change the lead text and the subsection titles and body text to match your work. Add or remove subsections and give them meaningful `id`s if you want to link to them from projects.
5. **Look and feel:** Adjust the variables in `css/style.css` (e.g. `--color-bg`, `--color-accent`, `--font-body`) to change colors and fonts.

---

## Running the Site Locally

No build step is required. Use any local web server so that paths and scripts work correctly, for example:

- **Python 3:**  
  `python3 -m http.server 8000`  
  Then open `http://localhost:8000` and click `index.html` or go to `http://localhost:8000/index.html`.

- **Node (npx):**  
  `npx serve`  
  Then open the URL shown (e.g. `http://localhost:3000`).

You can also open `index.html` directly in a browser, but some environments may restrict loading `projects-data.js`; a local server is more reliable.

---

## Summary

| Part | Role |
|------|------|
| **index.html** | Home: header (name + contact), intro, four section links, random projects area. |
| **css/style.css** | All layout and styling; variables for theme. |
| **js/projects-data.js** | Data for “random projects”; edit to add/change projects. |
| **js/main.js** | Sets footer year and fills random projects from `PROJECTS`. |
| **sections/*.html** | One page per area (Tech, Art, Digital Humanities, Critical Thinking) with subsections you can link to. |

Together, these give you a main page with name, contact, intro, section entry points, and a random sample of projects, plus section pages with subsections for detailed work.
