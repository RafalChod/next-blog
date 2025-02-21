import Link from 'next/link'


// src/app/page.tsx
export default async function HomePage() {
  // Definiujemy zapytanie GraphQL
  const query = `
    query Posts {
  posts {
     title
     slug
     image {
      url
     }
  }
    }
  `;

  // Wysyłamy zapytanie POST na endpoint GraphQL w Strapi
  const response = await fetch('http://localhost:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body musi zawierać klucz "query"
    body: JSON.stringify({ query }),
    // UWAGA 1: domyślnie fetch w App Router jest caching: 'force-cache'
    // Jeśli chcesz mieć tzw. Incremental Static Regeneration:
    // next: { revalidate: 60 }  <-- revalidate co 60 sekund
    // next: { revalidate: 0 }   <-- SSR przy każdym odświeżeniu
    next: { revalidate: 60 },
  });

  // Parsujemy odpowiedź
  const { data } = await response.json();

  // Zwrot gotowego JSX
  return (
    <main>
      <h1>Homepage</h1>
      <h2>Posts</h2>
      <ul>
        {data.posts?.map((post: { title: string }, i: number) => (
          <div key={i}>
          <h2 key={i}>{post.title}</h2>
          <Link href={`post/` + post.slug}>{post.slug}</Link>
          <img src={`http://localhost:1337` + post.image?.url} alt={post.title} />
          </div>
        ))}
      </ul>
    </main>
  );
}