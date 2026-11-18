import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const token = process.argv[2] || process.env.GITHUB_TOKEN;
const repoName = process.argv[3] || "program9-todo-app";

if (!token) {
  console.error("\n❌ Error: GitHub Personal Access Token is required.");
  console.log("👉 Usage: node deploy-to-github.mjs <YOUR_GITHUB_TOKEN> [REPO_NAME]\n");
  console.log("To get your token (takes 30 seconds):");
  console.log("1. Open: https://github.com/settings/tokens/new");
  console.log("2. Set Note: 'Program 9 Deploy', check 'repo' (Full control of private repositories)");
  console.log("3. Click 'Generate token' at bottom and copy it.\n");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "AuraTask-Deployer",
  "X-GitHub-Api-Version": "2022-11-28"
};

async function main() {
  try {
    console.log("🔄 Step 1: Authenticating with GitHub API...");
    const userRes = await fetch("https://api.github.com/user", { headers });
    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(`Authentication failed (${userRes.status}): ${err.message}`);
    }
    const user = await userRes.json();
    const username = user.login;
    console.log(`✅ Authenticated successfully as: @${username}`);

    console.log(`\n🔄 Step 2: Creating repository "${repoName}" on GitHub...`);
    const createRepoRes = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: repoName,
        description: "Case Study 9: Full-Stack React Todo App & Circadian Checklist Suite",
        private: false,
        auto_init: true
      })
    });

    let repo;
    if (createRepoRes.status === 201) {
      repo = await createRepoRes.json();
      console.log(`✅ Repository created: ${repo.html_url}`);
    } else if (createRepoRes.status === 422) {
      console.log(`ℹ️ Repository "${repoName}" already exists, using existing repo...`);
      repo = {
        html_url: `https://github.com/${username}/${repoName}`,
        name: repoName
      };
    } else {
      const err = await createRepoRes.json();
      throw new Error(`Failed to create repository: ${err.message}`);
    }

    console.log("\n🔄 Step 3: Scanning and uploading project files...");
    const filesToUpload = [];

    function scan(dir, relPath = "") {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const rel = relPath ? `${relPath}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
          if (["node_modules", "dist", ".git", ".vscode"].includes(entry.name)) continue;
          scan(fullPath, rel);
        } else {
          if ([".DS_Store", "deploy-to-github.mjs"].includes(entry.name)) continue;
          filesToUpload.push({ fullPath, relPath: rel });
        }
      }
    }

    scan(__dirname);

    for (const f of filesToUpload) {
      process.stdout.write(`  ⬆️ Uploading ${f.relPath}... `);
      const content = fs.readFileSync(f.fullPath);
      const base64 = content.toString("base64");

      // Check if file already exists to get its sha (for update)
      const checkUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${f.relPath}`;
      let sha = undefined;
      const checkRes = await fetch(checkUrl, { headers });
      if (checkRes.ok) {
        const existing = await checkRes.json();
        sha = existing.sha;
      }

      const putRes = await fetch(checkUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: `Add ${f.relPath}`,
          content: base64,
          sha
        })
      });

      if (!putRes.ok) {
        const err = await putRes.json();
        console.log(`❌ (${err.message})`);
      } else {
        console.log("✅");
      }
    }

    console.log("\n🔄 Step 4: Configuring GitHub Pages...");
    const pagesRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/pages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        build_type: "workflow"
      })
    });

    if (pagesRes.ok || pagesRes.status === 409) {
      console.log("✅ GitHub Pages enabled via GitHub Actions!");
    } else {
      console.log("ℹ️ Pages build will trigger automatically upon first Actions run.");
    }

    console.log("\n========================================================");
    console.log("🎉 SUCCESS! PROJECT ADDED TO GITHUB AUTOMATICALLY!");
    console.log(`📦 GitHub Repository: https://github.com/${username}/${repoName}`);
    console.log(`🌐 Live Website Link:  https://${username}.github.io/${repoName}/`);
    console.log("========================================================\n");

  } catch (err) {
    console.error("\n❌ Deployment Error:", err.message);
  }
}

main();
