# Contributing to PromptEAT

We welcome contributions of all kinds: new prompts, bug fixes, documentation, and more!

---

## 📜 How to Contribute
1. **Fork** the repository
2. **Clone** your fork

   ```bash
   git clone https://github.com/<your-username>/prompt-eat.git
   cd prompt-eat
   ```
3. **Set up your environment**

   * **Option A: Local (Node.js installed)**

     ```bash
     npm install
     npm run dev
     ```
   * **Option B: Using Docker (recommended)**
     Follow the [🐳 Docker Setup](#-setting-up-with-docker) section below
4. Create a **feature branch**

   ```bash
   git checkout -b feature/my-feature
   ```
5. Make your changes (code, docs, or prompts)
6. Run and test your changes (`npm run dev` or via Docker)
7. **Commit and push**
8. Go to you fork repository on GitHub
9. Open a **Pull Request** towards original repo's dev branch. Check [Pull Request Guide](#using-pull-request-templates)

---

## 🐳 Setting Up with Docker

We provide a **Docker setup** to make running PromptEAT consistent across environments.

### 🔧 Requirements

* [Docker](https://docs.docker.com/get-docker/) installed on your machine
* (Optional) [Docker Compose](https://docs.docker.com/compose/) if you prefer using `docker-compose`

### ▶️ Quick Start

1. **Build the image**

   ```bash
   docker build -t prompteat:dev .
   ```

2. **Run the container** (development mode)

   ```bash
   docker run -it --rm -p 3000:3000 -v $(pwd):/app -v /app/node_modules prompteat:dev npm run dev
   ```

   * `-p 3000:3000` → maps app to [http://localhost:3000](http://localhost:3000)
   * `-v $(pwd):/app` → mounts your local code for live reload
   * `-v /app/node_modules` → ensures container uses its own installed deps

3. **Run in production mode**
   After building with the production Dockerfile:

   ```bash
   docker build -t prompteat:prod .
   docker run -d -p 3000:3000 prompteat:prod
   ```

### 📝 Notes

* Make sure your `.env` file is **not copied into the image** (it’s ignored by `.dockerignore`). Instead, provide env vars at runtime:

  ```bash
  docker run --env-file .env -p 3000:3000 prompteat:prod
  ```
* For development, edit your code locally → changes will reflect in the running container.
---
## Using Pull Request Templates
When opening a Pull Request, you can select a specific template by appending the `template` query parameter to the PR creation URL:
> Basically, copy and paste the url below to the browser url bar and edit or fill out accordingly (sample provided)

```
https://github.com/nekolaiv/prompt-eat/compare/<base branch>...<compare branch>?expand=1\&template=<template>.md
```

Available templates:
- `default.md` → General purpose
- `bug_fix.md` → For bug fixes
- `feature.md` → For new features
- `documentation.md` → For documentation changes

Example:
- **Bug Fix PR**  
```
https://github.com/nekolaiv/prompt-eat/compare/main...dev?expand=1\&template=bug_fix.md
```
> this opens a pull request from dev to main using bug_fix.md template
  
You can find all templates inside the `.github/PULL_REQUEST_TEMPLATE/` folder.
---

## ✅ Guidelines
- **Prompt Contributions**
  - Organize prompts under the correct category (e.g., `prompts/coding/`)
  - Use clear and concise language
- **Code Changes**
  - Follow consistent formatting
  - Add comments for complex logic
- **Documentation**
  - Keep README and prompt descriptions clear and beginner-friendly

---

## 🧾 Code of Conduct
Please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

Thank you for contributing! 🎉
