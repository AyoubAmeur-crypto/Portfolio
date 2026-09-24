import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'AyoubAmeur-crypto';
  const yearStr = (req.query?.year as string) || '';

  if (!token) {
    return res.status(500).json({ error: 'GitHub token is not configured on the server' });
  }

  let fromToArgs = '';
  if (yearStr) {
    fromToArgs = `(from: "${yearStr}-01-01T00:00:00Z", to: "${yearStr}-12-31T23:59:59Z")`;
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        followers {
          totalCount
        }
        repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
        recentRepositories: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 4, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            description
            url
            stargazerCount
            pushedAt
            primaryLanguage {
              name
              color
            }
          }
        }
        contributionsCollection${fromToArgs} {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AyoubAmeur-Portfolio/1.0',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('GitHub API error:', errText);
      return res.status(response.status).json({ error: 'Failed to fetch GitHub contributions' });
    }

    const data = await response.json();

    // Cache on Vercel CDN for 30 minutes, allow stale for 1 hour
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Network error fetching GitHub contributions:', error);
    return res.status(500).json({ error: 'Network error fetching GitHub contributions' });
  }
}
