import { Calendar, ArrowLeft, Globe, Award, MapPin, Stethoscope } from 'lucide-react';
import { doctors, locations, services } from '@/config/site';

interface DoctorDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function DoctorDetail({ slug, onNavigate }: DoctorDetailProps) {
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Doctor not found</h1>
          <button onClick={() => onNavigate('/doctors')} className="btn-primary mt-4">
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const docLocations = locations.filter((l) => doctor.locationSlugs.includes(l.slug));
  const relatedServices = services.filter((s) =>
    s.relatedDoctorSlugs.includes(doctor.slug)
  );

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative">
          <button
            onClick={() => onNavigate('/doctors')}
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Doctors
          </button>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-48 w-48 object-cover md:h-56 md:w-56"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white md:text-4xl">{doctor.name}</h1>
              <p className="mt-2 text-lg text-primary-200">{doctor.title}</p>
              <p className="mt-1 text-sm text-primary-300">{doctor.qualifications}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="badge bg-white/10 text-primary-100 ring-1 ring-white/20"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900">About {doctor.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{doctor.bio}</p>

              <h3 className="mt-10 text-xl font-semibold text-slate-900">
                Areas of Specialisation
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {doctor.specialties.map((spec) => (
                  <div key={spec} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                      <Stethoscope className="h-5 w-5 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{spec}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Globe className="h-5 w-5 text-primary-600" />
                    <h4 className="font-semibold">Languages Spoken</h4>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{doctor.languages.join(', ')}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-slate-900">
                    <Award className="h-5 w-5 text-primary-600" />
                    <h4 className="font-semibold">Qualifications</h4>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{doctor.qualifications}</p>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-slate-900">Services Offered</h3>
                  <div className="mt-4 space-y-3">
                    {relatedServices.map((service) => (
                      <button
                        key={service.slug}
                        onClick={() => onNavigate(`/services/${service.slug}`)}
                        className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/50"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
                          <service.icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{service.title}</p>
                          <p className="text-xs text-slate-500">{service.shortDescription}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900">Book with {doctor.name.split(' ').slice(-1)[0]}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Schedule an appointment with this doctor online.
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
                  <h3 className="font-semibold text-slate-900">Practicing At</h3>
                  <div className="mt-4 space-y-3">
                    {docLocations.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => onNavigate(`/locations/${loc.slug}`)}
                        className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-slate-50"
                      >
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{loc.city}</p>
                          <p className="text-xs text-slate-500">{loc.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
