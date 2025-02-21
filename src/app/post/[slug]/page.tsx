// app/post/[slug]/page.tsx
import ReactMarkdown from 'react-markdown';

interface Post {
  title: string;
  slug: string;
  content: string;
  image?: {
    url: string;
  };
  documentId: string;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 1. Pobieramy slug z parametrów
  const { slug } = params;

  // 2. Definiujemy zapytanie GraphQL
  const query = `
    query PostBySlug($slug: String!) {
      posts(filters: { slug: { eq: $slug } }) {
        title
        slug
        content
        image {
          url
        }
        documentId
      }
    }
  `;

  // 3. Wysyłamy zapytanie z parametrem $slug
  const response = await fetch('https://my-strapi-blog-be68a5fc8701.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { slug },
    }),
    // ewentualnie revalidate dla ISR:
    next: { revalidate: 60 },
  });

  const { data } = await response.json();

  // Jeżeli API zwróci pustą tablicę, to znaczy, że nie ma posta o takim slug
  const postData: Post[] = data?.posts ?? [];
  if (postData.length === 0) {
    return (
      <main style={{ padding: '1rem' }}>
        <h1>Nie znaleziono posta o slug: {slug}</h1>
      </main>
    );
  }

  // Bierzemy pierwszy (jedyny) post z wyniku
  const post = postData[0];

  return (
    <main style={{ padding: '1rem' }}>
      <h2>{post.title}</h2>
      <ReactMarkdown>{post.content}</ReactMarkdown>

      {post.image?.url ? (
        <img
          src={`https://my-strapi-blog-be68a5fc8701.herokuapp.com/${post.image.url}`}
          alt={post.title}
          style={{ maxWidth: '300px', display: 'block', marginTop: '0.5rem' }}
        />
      ) : (
        <em>Brak zdjęcia</em>
      )}
    </main>
  );
}
