import { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight, Loader2, Eye, Home, Phone } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { supabase } from '@/lib/supabase';

export interface EyeCondition {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  symptoms: string[];
  home_care: string[];
  when_to_seek_help: string[];
  image_url: string | null;
  sort_order: number;
}

interface EyeConditionsProps {
  onNavigate: (path: string) => void;
}

export default function EyeConditions({ onNavigate }: EyeConditionsProps) {
  const [conditions, setConditions] = useState<EyeCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('eye_conditions')
          .select('*')
          .order('category', { ascending: true })
          .order('sort_order', { ascending: true });

        if (fetchError) throw fetchError;
        setConditions((data || []) as EyeCondition[]);
      } catch {
        setError('Unable to load eye conditions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchConditions();
  }, []);

  const categories = ['All', ...Array.from(new Set(conditions.map((c) => c.category)))];
  const filtered = activeCategory === 'All'
    ? conditions
    : conditions.filter((c) => c.category === activeCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            <Eye className="h-3.5 w-3.5" />
            Eye Conditions
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Common Eye Conditions, Explained
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Browse our guides by category. Each guide covers symptoms, home care tips,
            and when to seek professional help.
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
          ) : conditions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Eye className="h-10 w-10 text-slate-300" />
              <p className="mt-4 text-sm text-slate-500">No eye condition guides are available yet. Please check back soon.</p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-primary-800 text-white shadow-md'
                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => onNavigate(`/eye-conditions/${condition.slug}`)}
                    className="card-hover group flex flex-col overflow-hidden text-left"
                  >
                    {condition.image_url && (
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={condition.image_url}
                          alt={condition.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                        <span className="absolute bottom-3 left-3 badge bg-white/90 text-slate-800">
                          {condition.category}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-slate-900">{condition.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                        {condition.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                        Read guide
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-14 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-center text-white md:p-12">
            <Home className="mx-auto h-10 w-10 text-primary-200" />
            <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Experiencing Symptoms?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-100">
              Don't wait. Our specialists can assess your symptoms and recommend the right
              treatment. Book an appointment or call us today.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => onNavigate('/book')} className="btn-accent">
                Book Appointment
              </button>
              <a href="tel:+6561234567" className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
