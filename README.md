# Job Skill Planner

A dependency-free local web app that searches selected job websites for a target role and turns the user's experience profile into a detailed study plan.

## Run

Open `index.html` in a browser.

The app always creates direct search links for LinkedIn, Indeed, Google Jobs, Remote OK, and Remotive. It also tries to load live public job feeds from Remote OK and Remotive. If a browser blocks a live feed because of CORS or network policy, the direct website links still work.

## What it asks the user

- Target role or skill
- Location and job type
- Keywords to prioritize
- Years in the target skill
- Years of related experience
- Weekly study hours
- Current experience summary

## Output

- Job-result cards and direct job-search links
- Experience-level classification
- Common job signals to prepare for
- Week-by-week study phases
- Portfolio and interview-readiness checklist
