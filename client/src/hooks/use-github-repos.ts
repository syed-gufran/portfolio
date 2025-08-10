import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser, fetchFeaturedRepos } from "@/lib/github-api";

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGitHubUser(username),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ["github-repos", username],
    queryFn: () => fetchFeaturedRepos(username),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
