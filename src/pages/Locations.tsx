import { MapPin, Phone, Mail, Clock, Calendar, Star } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { locations } from '@/config/site';

interface LocationsProps {
  onNavigate: (path: string) => void;
}

export default function Locations({ onNavigate }: LocationsProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            Our Locations
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Visit Us in Singapore or Johor Bahru
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Two modern clinics, one standard of excellence. Find the location nearest
            to you and book your visit today.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {locations.map((location) => (
              <div key={location.slug} className="card-hover overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="badge bg-white/90 text-slate-800">
                      <MapPin className="h-3 w-3" />
                      {location.city}, {location.country}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">{location.name}</h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex gap-3 text-sm text-slate-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      {location.address}
                    </div>
                    <div className="flex gap-3 text-sm text-slate-600">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      <a href={`tel:${location.phone}`} className="hover:text-primary-600">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex gap-3 text-sm text-slate-600">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                      <a href={`mailto:${location.email}`} className="hover:text-primary-600">
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Clock className="h-4 w-4 text-primary-600" />
                      Operating Hours
                    </div>
                    <ul className="mt-3 space-y-2">
                      {location.hours.map((h) => (
                        <li key={h.day} className="flex justify-between text-xs text-slate-500">
                          <span>{h.day}</span>
                          <span className="font-medium text-slate-700">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    <a
                      href={location.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Read Google Reviews
                    </a>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => onNavigate(`/locations/${location.slug}`)}
                      className="btn-secondary flex-1"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onNavigate('/book')}
                      className="btn-primary"
                    >
                      <Calendar className="h-4 w-4" />
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
