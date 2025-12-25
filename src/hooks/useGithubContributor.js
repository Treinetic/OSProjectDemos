import { useState, useEffect } from 'react';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useGithubContributor(repoSlug) {
  const [contributor, setContributor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoSlug) {
      setLoading(false);
      return;
    }

    const fetchContributor = async () => {
      const cacheKey = `github_contributor_${repoSlug}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired) {
          setContributor(data);
          setLoading(false);
          // If valid cache exists, we stop here (cache-first strategy)
          // The user requested to check "next time" if expired, so strictly obeying cache until expiry matches.
          // Or we could do a background revalidate, but "cache for 24 hours" implies strict expiration.
          return;
        }
      }

      // If no cache or expired, fetch from API
      try {
        const response = await fetch(`https://api.github.com/repos/${repoSlug}/contributors?per_page=1`);
        
        if (response.ok) {
          const contributors = await response.json();
          if (contributors && contributors.length > 0) {
            const topContributor = {
              name: contributors[0].login,
              image: contributors[0].avatar_url,
              url: contributors[0].html_url
            };
            
            // Update state
            setContributor(topContributor);

            // Update cache
            localStorage.setItem(cacheKey, JSON.stringify({
              data: topContributor,
              timestamp: Date.now()
            }));
          }
        } else {
            console.warn(`Failed to fetch contributor for ${repoSlug}: ${response.status}`);
            // If fetch fails (limit exceeded), fallback to existing cache if available even if expired?
            // For now, let's just leave it empty or stale.
            if (cachedData) {
                const { data } = JSON.parse(cachedData);
                setContributor(data); 
            }
        }
      } catch (error) {
        console.error("Error fetching GitHub contributor:", error);
         // Fallback to cache on error
         if (cachedData) {
            const { data } = JSON.parse(cachedData);
            setContributor(data); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContributor();
  }, [repoSlug]);

  return { contributor, loading };
}
