import { MapPin, Phone, Mail, Clock, Calendar, ArrowLeft, Star, MessageCircle } from 'lucide-react';
import { activeLocations, doctors } from '@/config/site';

interface LocationDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function LocationDetail({ slug, onNavigate }: LocationDetailProps) {
  const location = activeLocations.find((l) => l.slug === slug);

  if (!location) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Location not found</h1>
          <button onClick={() => onNavigate('/locations')} className="btn-primary mt-4">
            Back to Locations
          </button>
        </div>
      </div>
    );
  }

  const locationDoctors = doctors.filter((d) => d.locationSlugs.includes(location.slug));

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative">
          <button
            onClick={() => onNavigate('/locations')}
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Locations
          </button>
          <div className="mt-6">
            <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
              <MapPin className="h-3 w-3" />
              {location.city}, {location.country}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              {location.name}
            </h1>
            <p className="mt-2 text-primary-200">{location.address}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={location.image}
                  alt={location.name}
                  className="h-72 w-full object-cover"
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold text-slate-900">Contact Information</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <a href={`tel:${location.phone}`} className="text-sm font-medium text-slate-900 hover:text-primary-600">
                      {location.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                    <MessageCircle className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">WhatsApp</p>
                    <a href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-900 hover:text-secondary-600">
                      {location.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
                    <Mail className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <a href={`mailto:${location.email}`} className="text-sm font-medium text-slate-900 hover:text-accent-600">
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-900">Operating Hours</h3>
              <div className="mt-4 rounded-xl bg-slate-50 p-5">
                <ul className="space-y-3">
                  {location.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="text-slate-500">{h.day}</span>
                      <span className="font-medium text-slate-700">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <a
                  href={location.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Read Google Reviews
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Find Us</h2>
              <div className="mt-4 overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src={location.mapEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                />
              </div>
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-4 w-full"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>

              {locationDoctors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900">Doctors at This Location</h3>
                  <div className="mt-4 space-y-3">
                    {locationDoctors.map((doctor) => (
                      <button
                        key={doctor.slug}
                        onClick={() => onNavigate(`/doctors/${doctor.slug}`)}
                        className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/50"
                      >
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-slate-900">{doctor.name}</p>
                          <p className="text-xs text-slate-500">{doctor.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white">
                <h3 className="text-lg font-semibold">Book at {location.city}</h3>
                <p className="mt-1 text-sm text-primary-100">
                  Schedule your visit to our {location.city} clinic online.
                </p>
                <button
                  onClick={() => onNavigate('/book')}
                  className="btn-accent mt-4 w-full"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
