import { useState, useEffect } from 'react';
import { AlertCircle, ArrowLeft, Loader2, Calendar, CheckCircle2, AlertTriangle, Home, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { EyeCondition } from './EyeConditions';

interface EyeConditionDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function EyeConditionDetail({ slug, onNavigate }: EyeConditionDetailProps) {
  const [condition, setCondition] = useState<EyeCondition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCondition = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('eye_conditions')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (!data) {
          setError('not-found');
        } else {
          setCondition(data as EyeCondition);
        }
      } catch {
        setError('Unable to load this condition. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCondition();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error === 'not-found' || !condition) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Condition not found</h1>
          <button onClick={() => onNavigate('/eye-conditions')} className="btn-primary mt-4">
            Back to Eye Conditions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative">
          <button
            onClick={() => onNavigate('/eye-conditions')}
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Eye Conditions
          </button>
          <div className="mt-6">
            <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
              {condition.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl text-balance">
              {condition.title}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-primary-100">{condition.summary}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {condition.image_url && (
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={condition.image_url}
                    alt={condition.title}
                    className="h-72 w-full object-cover md:h-80"
                  />
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-slate-900">Symptoms</h2>
                <p className="mt-1 text-sm text-slate-500">Common signs to watch for.</p>
                <ul className="mt-4 space-y-3">
                  {condition.symptoms.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <AlertCircle className="h-4 w-4 text-primary-600" />
                      </div>
                      <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900">Home Care Tips</h2>
                <p className="mt-1 text-sm text-slate-500">Things you can do at home to relieve symptoms.</p>
                <ul className="mt-4 space-y-3">
                  {condition.home_care.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-success-50">
                        <CheckCircle2 className="h-4 w-4 text-success-600" />
                      </div>
                      <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-xl bg-error-50 p-6 ring-1 ring-error-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-error-600" />
                  <h2 className="text-xl font-semibold text-error-900">When to Seek Professional Help</h2>
                </div>
                <p className="mt-1 text-sm text-error-700">Contact us immediately if you experience any of the following:</p>
                <ul className="mt-4 space-y-3">
                  {condition.when_to_seek_help.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-error-100">
                        <AlertTriangle className="h-4 w-4 text-error-600" />
                      </div>
                      <span className="text-sm leading-relaxed text-error-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900">Book an Appointment</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    If you're experiencing symptoms, our specialists can help. Schedule a visit today.
                  </p>
                  <button
                    onClick={() => onNavigate('/book')}
                    className="btn-primary mt-4 w-full"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </button>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900">Need Urgent Care?</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    For eye emergencies, call us directly for priority attention.
                  </p>
                  <a href="tel:+6561234567" className="btn-secondary mt-4 w-full">
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900">Other Conditions</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Browse more eye condition guides.
                  </p>
                  <button
                    onClick={() => onNavigate('/eye-conditions')}
                    className="btn-ghost mt-4 w-full"
                  >
                    <Home className="h-4 w-4" />
                    All Conditions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
