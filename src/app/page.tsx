/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroSection from '@/components/hero-section';
import Link from 'next/link';
import PostSection from '@/components/post-section';
import About from '@/components/about';

// Wymuszamy dynamiczne renderowanie strony
export const dynamic = 'force-dynamic';

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

  try {
    // Wysyłamy zapytanie POST na endpoint GraphQL w Strapi bez cache
    const response = await fetch('https://strapi-cms-app-2x2e.onrender.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    // Parsujemy odpowiedź
    const json = await response.json();
    console.log('Otrzymany JSON:', json);
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
        <HeroSection />
        <About />
        <PostSection />
        <ul>
          {data.posts.map((post: { image: any; slug: string; title: string }, i: number) => (
            <li key={i}>
              <h2>{post.title}</h2>
              <Link href={`/post/${post.slug}`}>{post.slug}</Link>
              {post.image?.url && (
                <img
                  src={`https://strapi-cms-app-2x2e.onrender.com${post.image.url}`}
                  alt={post.title}
                  style={{ maxWidth: '300px', marginTop: '0.5rem' }}
                />
              )}
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.error('Błąd przy pobieraniu danych:', error);
    return (
      <main style={{ padding: '1rem' }}>
        <h2>Błąd przy pobieraniu danych</h2>
      </main>
    );
  }
}
