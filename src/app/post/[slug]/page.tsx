import { Container } from '@/components/ui/container';
import ReactMarkdown from 'react-markdown';
import { FaFacebook, FaTwitter, FaLinkedin, FaShare } from 'react-icons/fa';

interface Post {
  title: string;
  slug: string;
  content: string;
  image?: {
    url: string;
  };
  documentId: string;
}

// Upewniamy się, że typ params jest Promise, zgodnie z oczekiwaniami Next.js
interface Params {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Params) {
  // Czekamy, aż promise zostanie rozwiązany
  const { slug } = await params;

  // Definiujemy zapytanie GraphQL
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

  // Wysyłamy zapytanie z parametrem $slug
  const response = await fetch('https://strapi-cms-app-2x2e.onrender.com/graphql', {
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
      <main className="py-8">
        <Container size="cramped">
          <h1 className="text-2xl font-bold text-center">Nie znaleziono posta o slug: {slug}</h1>
        </Container>
      </main>
    );
  }

  // Bierzemy pierwszy (jedyny) post z wyniku
  const post = postData[0];

  // Dane dodane na sztywno
  const hardcodedSubtitle = "Odkrywając tajemnice nowoczesnego programowania";
  const hardcodedDate = "15 czerwca 2023";
  const hardcodedTags = ["JavaScript", "React", "Next.js", "Web Development"];

  return (
    <main className="py-8">
      <Container size="cramped" className="px-4 md:px-0">
        <article className="prose prose-lg mx-auto max-w-none">
          {/* Title - centered */}
          <h1 className="text-[3.5rem] font-bold text-center mb-3">{post.title}</h1>
          
          {/* Subtitle - hardcoded */}
          <h2 className="text-[2rem] md:text-2xl text-gray-600 font-medium text-center mb-6 my-3">
            {hardcodedSubtitle}
          </h2>
          
          {/* Date and social media section */}
          <div className="flex justify-between items-center my-8 text-gray-500 text-sm">
            {/* Date - hardcoded */}
            <time>{hardcodedDate}</time>
            
            {/* Social media icons */}
            <div className="flex gap-3 justify-center">
              <button className="hover:text-blue-600" aria-label="Udostępnij na Facebook">
                <FaFacebook size={18} />
              </button>
              <button className="hover:text-blue-400" aria-label="Udostępnij na Twitter">
                <FaTwitter size={18} />
              </button>
              <button className="hover:text-blue-700" aria-label="Udostępnij na LinkedIn">
                <FaLinkedin size={18} />
              </button>
              <button className="hover:text-indigo-600" aria-label="Więcej opcji udostępniania">
                <FaShare size={18} />
              </button>
            </div>
          </div>
          
          {/* Featured image */}
            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={post.title || "Post image"}
                className="w-full h-auto rounded-lg object-cover"
              />
            </figure>
          
          {/* Tags - hardcoded */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {hardcodedTags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xl rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Content */}
          <div className="mt-6 article-content">
          <ReactMarkdown
              components={{
                h2: ({ ...props }) => <h2 className="text-2xl font-semibold mb-3 mt-7" {...props} />,
                p: ({ ...props }) => <h2 className="text-[1.4rem] my-3 text-[#090115]" {...props} />,

                // itd. dla innych tagów
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </Container>
    </main>
  );
}
