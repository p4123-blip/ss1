import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { locations } from '@/config/site';

const TURNSTILE_SITE_KEY = '0x4AAAAAAEkAYh4NfObPr1cb';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    location: '',
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Please enter your message';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: Prevent submission if Turnstile hasn't validated
    if (!turnstileToken) {
      setErrors((prev) => ({ ...prev, turnstile: 'Please complete the security check.' }));
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    if (!isSupabaseConfigured) {
      console.error('❌ Supabase is not configured! Check your .env file.');
      setStatus('error');
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
        location: form.location || null,
      };

      console.log('Sending payload to Supabase:', payload);

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(payload)
        
      if (error) {
        console.error('❌ Supabase insert error:', error.message, error.details, error.hint);
        throw error;
      }

      console.log('✅ Successfully inserted row:', data);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '', location: '' });
      setTurnstileToken(null);
    } catch (err) {
      console.error('❌ Full catch error:', err);
      setStatus('error');
    }
  };
  
  /*
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    if (!isSupabaseConfigured) {
      setStatus('error');
      return;
    }

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
        location: form.location || null,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '', location: '' });
    } catch {
      setStatus('error');
    }
  };
  */

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            Contact Us
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Get in Touch With Our Team
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Have a question or want to learn more about our services? We're here to help.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {locations.map((loc) => (
                  <div key={loc.slug} className="card p-5">
                    <h3 className="font-semibold text-slate-900">{loc.city} Clinic</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-2 text-sm text-slate-500">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                        {loc.address}
                      </div>
                      <div className="flex gap-2 text-sm text-slate-500">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                        <a href={`tel:${loc.phone}`} className="hover:text-primary-600">{loc.phone}</a>
                      </div>
                      <div className="flex gap-2 text-sm text-slate-500">
                        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600" />
                        <a href={`https://wa.me/${loc.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary-600">
                          WhatsApp: {loc.whatsapp}
                        </a>
                      </div>
                      <div className="flex gap-2 text-sm text-slate-500">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                        <a href={`mailto:${loc.email}`} className="hover:text-primary-600">{loc.email}</a>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {loc.hours[0].time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="card p-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
                      <CheckCircle2 className="h-8 w-8 text-success-600" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-slate-900">Message Sent!</h2>
                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                      Thank you for reaching out. Our team will get back to you within
                      one business day.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-secondary mt-6"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 rounded-lg bg-error-50 p-3 text-sm text-error-700">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Name <span className="text-error-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`input-field ${errors.name ? 'border-error-400 ring-error-400/20' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-error-600">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Email <span className="text-error-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`input-field ${errors.email ? 'border-error-400 ring-error-400/20' : ''}`}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-error-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="input-field"
                          placeholder="+6012 123 4567"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                          Preferred Location
                        </label>
                        <select
                          value={form.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select a clinic</option>
                          {locations.map((loc) => (
                            <option key={loc.slug} value={loc.slug}>
                              {loc.city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className="input-field"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Message <span className="text-error-500">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        rows={5}
                        className={`input-field resize-none ${errors.message ? 'border-error-400 ring-error-400/20' : ''}`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-error-600">{errors.message}</p>
                      )}
                    </div>

                    {/* Cloudflare Turnstile Widget */}
                    <div className="py-1">
                      <Turnstile
                        siteKey={TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {
                          setTurnstileToken(token);
                          if (errors.turnstile) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.turnstile;
                              return next;
                            });
                          }
                        }}
                        onExpire={() => setTurnstileToken(null)}
                        onError={() => setTurnstileToken(null)}
                      />
                      {errors.turnstile && (
                        <p className="mt-1 text-xs text-error-600">{errors.turnstile}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting' || !turnstileToken}
                      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
