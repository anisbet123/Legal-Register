# SafeWork Pro

Integrated H&S compliance management — PPE, Observations, Permits to Work, Legal Register, Audits, Assets, Training, Inductions, Risk Assessments, Administration.

**Fully offline — no API keys, no subscriptions, no backend.**

---

## 🚀 Deploy to GitHub Pages (Free HTTPS)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up free if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it exactly: `safework-pro`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload the project files
On the new (empty) repository page:
1. Click **"uploading an existing file"** link
2. Drag and drop **all files and folders** from this zip into the upload area
   - Make sure `.github/workflows/deploy.yml` is included (you may need to show hidden files)
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source** select **GitHub Actions**
3. Click **Save**

### Step 5 — Wait for the build (~2 minutes)
1. Go to the **Actions** tab in your repo
2. You'll see "Deploy SafeWork Pro to GitHub Pages" running
3. When it shows a green ✓ tick, your app is live

### Step 6 — Open your app
Your URL will be:
```
https://YOUR-GITHUB-USERNAME.github.io/safework-pro/
```
Find it in **Settings → Pages** — it shows the exact URL.

---

## 📱 Install on devices

**iOS (iPhone/iPad):**
Open the URL in **Safari** → Share button → **Add to Home Screen**

**Android:**
Open in **Chrome** → menu → **Install app**

**Windows/Mac:**
Open in **Chrome or Edge** → install icon in address bar

---

## 🔄 Updating the app

Any time you want to update:
1. Edit files on GitHub directly (click the file → pencil icon), or
2. Upload new versions of changed files
3. GitHub Actions rebuilds and redeploys automatically — no manual steps

---

## ⚙ If your repo is named something other than `safework-pro`

Open `vite.config.js` and change line 7:
```js
const REPO_NAME = 'your-actual-repo-name'
```
Then commit — it will rebuild automatically.

---

## 💻 Run locally (no internet needed)

```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

---

## Modules included
- ✅ PPE Management
- ✅ Observation Management (improvements, near misses, incidents)
- ✅ Permits to Work (7 types with full pre-check lists)
- ✅ Legal Register (41 UK Acts & Regulations, fully offline)
- ✅ Audits & Inspections
- ✅ Asset Management (LOLER/PUWER tracking)
- ✅ Training & Competencies (user search)
- ✅ Inductions
- ✅ Risk Assessments (5×5 matrix)
- ✅ Administration (user roles & permissions)
