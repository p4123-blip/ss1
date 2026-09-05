import { useState, useEffect } from 'react';
import { AlertCircle, ArrowLeft, Loader2, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { EyeTopic } from './EyeTopics';

interface EyeTopicDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function EyeTopicDetail({ slug, onNavigate }: EyeTopicDetailProps) {
  const [topic, setTopic] = useState<EyeTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('eye_topics')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (!data) {
          setError('not-found');
        } else {
          setTopic(data as EyeTopic);
        }
      } catch {
        setError('Unable to load this article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error === 'not-found' || !topic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Article not found</h1>
          <button onClick={() => onNavigate('/eye-topics')} className="btn-primary mt-4">
            Back to Eye Topics
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

  const paragraphs = topic.content.split('\n\n').filter((p) => p.trim());

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative">
          <button
            onClick={() => onNavigate('/eye-topics')}
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Eye Topics
          </button>
          <div className="mt-6 max-w-3xl">
            {topic.category && (
              <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
                {topic.category}
              </span>
            )}
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl text-balance">
              {topic.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-primary-200">
              {topic.author && <span>By {topic.author}</span>}
              {topic.author && <span className="text-primary-400">·</span>}
              <span>{formatDate(topic.published_at)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            {topic.image_url && (
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={topic.image_url}
                  alt={topic.title}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            )}

            <div className="mt-8 space-y-4">
              {paragraphs.map((para, i) => {
                const isHeading = para.length < 80 && !para.endsWith('.');
                if (isHeading) {
                  return (
                    <h2 key={i} className="pt-4 text-xl font-semibold text-slate-900">
                      {para}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-base leading-relaxed text-slate-600">
                    {para}
                  </p>
                );
              })}
            </div>

            <div className="mt-10 border-t border-slate-100 pt-8">
              <button
                onClick={() => onNavigate('/eye-topics')}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-700 to-primary-900 py-16">
        <div className="container-page text-center">
          <BookOpen className="mx-auto h-10 w-10 text-primary-200" />
          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Have Questions About Your Eye Health?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-100">
            Our specialists are here to help. Book a consultation today.
          </p>
          <button onClick={() => onNavigate('/book')} className="btn-accent mt-6">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
