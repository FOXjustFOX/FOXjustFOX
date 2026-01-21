const https = require('https');
const fs = require('fs');

// CONFIGURATION
const USERNAME = 'foxjustfox'; // Your GitHub username
const OUTPUT_FILE = 'repos.json';

const options = {
    hostname: 'api.github.com',
    path: `/users/${USERNAME}/repos?sort=updated&per_page=100`,
    method: 'GET',
    headers: {
        'User-Agent': 'Node.js Fetch Script'
    }
};

console.log(`Fetching repos for user: ${USERNAME}...`);

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const fetchedRepos = JSON.parse(data);

                // Load existing local repos to preserve edits
                let localRepos = [];
                if (fs.existsSync(OUTPUT_FILE)) {
                    try {
                        localRepos = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
                    } catch (err) {
                        console.warn('Could not parse existing repos.json, starting fresh.');
                    }
                }

                // Helper to simplify GitHub repo object
                const simplify = (repo) => ({
                    title: repo.name,
                    description: repo.description,
                    url: repo.html_url
                });

                // Create a Map of fetched repos for easy lookup
                const fetchedMap = new Map(fetchedRepos.map(r => [r.html_url, simplify(r)]));

                // 1. Keep existing local repos (preserving order and custom titles/descs)
                const finalRepos = [];
                const processedUrls = new Set();

                localRepos.forEach(localRepo => {
                    // If it still exists on GitHub, we keep the LOCAL version (to preserve edits)
                    // If it doesn't exist on GitHub anymore (or was manual), we ALSO keep it (persistence)
                    finalRepos.push(localRepo);
                    processedUrls.add(localRepo.url);
                });

                // 2. Add NEW repos that are not yet in the local list
                fetchedRepos.forEach(repo => {
                    if (!processedUrls.has(repo.html_url)) {
                        finalRepos.push(simplify(repo));
                    }
                });

                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalRepos, null, 2));
                console.log(`Success! Updated ${OUTPUT_FILE} (Preserved ${localRepos.length} local entries, added ${finalRepos.length - localRepos.length} new).`);
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        } else {
            console.error(`Error fetching repos: ${res.statusCode} ${res.statusMessage}`);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
