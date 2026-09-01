import { Calendar, Phone, Clock } from 'lucide-react';
import { clinic, locations } from '@/config/site';

export default function Book() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            <Calendar className="h-3.5 w-3.5" />
            Book Appointment
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Schedule Your Visit
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Choose a time that works for you. Our team will confirm your appointment
            shortly.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">Online Scheduling</h2>
                    <p className="text-xs text-slate-500">Select your preferred date and time below</p>
                  </div>
                </div>
              </div>

              <div className="bg-white" style={{ minHeight: '600px' }}>
                <iframe
                  src={clinic.platoEmbedUrl}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  title="Schedule an appointment at SkyView Eye Centre"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {locations.map((loc) => (
                <div key={loc.slug} className="card p-5">
                  <h3 className="text-sm font-semibold text-slate-900">{loc.city}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="h-3.5 w-3.5 text-primary-600" />
                      {loc.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-primary-600" />
                      {loc.hours[0].time}
                    </div>
                  </div>
                </div>
              ))}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900">Prefer to call?</h3>
                <p className="mt-2 text-xs text-slate-500">
                  Our team is happy to help you schedule over the phone.
                </p>
                <a href={`tel:${clinic.phone}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600">
                  <Phone className="h-3.5 w-3.5" />
                  {clinic.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
