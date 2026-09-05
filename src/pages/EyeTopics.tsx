import { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight, Loader2, BookOpen, Calendar } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { supabase } from '@/lib/supabase';

export interface EyeTopic {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string;
}

interface EyeTopicsProps {
  onNavigate: (path: string) => void;
}

export default function EyeTopics({ onNavigate }: EyeTopicsProps) {
  const [topics, setTopics] = useState<EyeTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('eye_topics')
          .select('*')
          .order('published_at', { ascending: false })
          .order('sort_order', { ascending: true });

        if (fetchError) throw fetchError;
        setTopics((data || []) as EyeTopic[]);
      } catch {
        setError('Unable to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

  const featured = topics[0];
  const rest = topics.slice(1);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            <BookOpen className="h-3.5 w-3.5" />
            Eye Topics
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Expert Insights for Your Vision
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Expert insights, tips, and clinic news to help you take better care of your vision.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-10 w-10 text-error-500" />
              <p className="mt-4 text-sm text-slate-600">{error}</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="h-10 w-10 text-slate-300" />
              <p className="mt-4 text-sm text-slate-500">No articles are available yet. Please check back soon.</p>
            </div>
          ) : (
            <>
              {featured && (
                <button
                  onClick={() => onNavigate(`/eye-topics/${featured.slug}`)}
                  className="card-hover group mb-12 grid w-full overflow-hidden text-left lg:grid-cols-2"
                >
                  {featured.image_url && (
                    <div className="relative h-64 overflow-hidden lg:h-auto">
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-8">
                    {featured.category && (
                      <span className="badge bg-primary-50 text-primary-700 w-fit">
                        {featured.category}
                      </span>
                    )}
                    <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {featured.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                      {featured.author && <span>By {featured.author}</span>}
                      <span>{formatDate(featured.published_at)}</span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              )}

              {rest.length > 0 && (
                <>
                  <SectionHeader
                    center={false}
                    eyebrow="More Articles"
                    title="Latest from Our Clinic"
                  />
                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => onNavigate(`/eye-topics/${topic.slug}`)}
                        className="card-hover group flex flex-col overflow-hidden text-left"
                      >
                        {topic.image_url && (
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={topic.image_url}
                              alt={topic.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {topic.category && (
                              <span className="absolute bottom-3 left-3 badge bg-white/90 text-slate-800">
                                {topic.category}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                            {topic.excerpt}
                          </p>
                          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                            {topic.author && <span>By {topic.author}</span>}
                            <span>{formatDate(topic.published_at)}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <div className="mt-14 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-center text-white md:p-12">
            <Calendar className="mx-auto h-10 w-10 text-primary-200" />
            <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Due for an Eye Check?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-100">
              Regular eye exams are the best way to protect your vision. Book your appointment today.
            </p>
            <button onClick={() => onNavigate('/book')} className="btn-accent mt-6">
              Book Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
