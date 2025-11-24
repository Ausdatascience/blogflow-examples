import { BlogFlow } from "@blogflow/sdk/core";
import { ExamplesClient } from "./AdminClient";

// Create client instance (reused across requests)
function getClient() {
  return new BlogFlow({
    apiKey: process.env.BLOGFLOW_API_KEY || process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY || "",
    defaultLanguage: "en",
  });
}

export default async function HomePage() {
  const client = getClient();

  try {
    // Fetch initial posts on server with ISR caching (revalidate every 5 minutes)
    const response = await client.getPaginatedPosts({
      lang: "en",
      page: 1,
      pageSize: 12,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

  return (
      <ExamplesClient
        initialPosts={response.items}
        initialTotalCount={response.totalCount}
        initialTotalPages={response.totalPages}
        initialPage={response.page}
      />
    );
  } catch (error) {
    // If server fetch fails, still render client component (it will handle errors)
    console.error("Error fetching initial posts:", error);
    return (
      <ExamplesClient
        initialPosts={[]}
        initialTotalCount={0}
        initialTotalPages={1}
        initialPage={1}
      />
  );
  }
}
