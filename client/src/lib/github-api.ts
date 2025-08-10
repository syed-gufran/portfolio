import { GitHubRepo, GitHubUser } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchFeaturedRepos(username: string): Promise<GitHubRepo[]> {
  const repos = await fetchGitHubRepos(username);
  
  // Filter out only the profile repo (usually named same as username)
  return repos
    .filter(repo => !repo.name.includes(username)) // Exclude profile repo
    .sort((a, b) => {
      // Sort by stars, then by recent activity
      const starDiff = b.stargazers_count - a.stargazers_count;
      if (starDiff !== 0) return starDiff;
      
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, 6); // Take top 6 repos
}
