/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

export default async function HomePage() {
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
  const response = await fetch('https://my-strapi-blog-be68a5fc8701.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  });

  // Parsujemy odpowiedź
  const json = await response.json();
  const data = json?.data;

  // Jeśli dane są puste lub nie zawierają posts, wyświetlamy fallback
  if (!data || !data.posts) {
    return (
      <main style={{ padding: '1rem' }}>
        <h1>Homepage</h1>
        <h2>Brak danych do wyświetlenia</h2>
      </main>
    );
  }

  // Zwrot gotowego JSX
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Homepage</h1>
      <h2>Posts</h2>
      <ul>
        {data.posts.map((post: { image: any; slug: string; title: string }, i: number) => (
          <li key={i}>
            <h2>{post.title}</h2>
            <Link href={`post/${post.slug}`}>{post.slug}</Link>
            {post.image?.url && (
              <img
                src={`https://my-strapi-blog-be68a5fc8701.herokuapp.com${post.image.url}`}
                alt={post.title}
                style={{ maxWidth: '300px', marginTop: '0.5rem' }}
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
