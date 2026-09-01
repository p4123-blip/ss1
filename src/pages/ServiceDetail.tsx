import { Calendar, ArrowRight, CheckCircle2, ArrowLeft, Clock, User } from 'lucide-react';
import { services, doctors } from '@/config/site';

interface ServiceDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ServiceDetail({ slug, onNavigate }: ServiceDetailProps) {
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Service not found</h1>
          <button onClick={() => onNavigate('/services')} className="btn-primary mt-4">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const relatedDoctors = doctors.filter((d) =>
    service.relatedDoctorSlugs.includes(d.slug)
  );

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </button>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <service.icon className="h-8 w-8 text-primary-200" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                {service.title}
              </h1>
              <p className="mt-1 text-primary-200">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                About This Service
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {service.description}
              </p>

              <h3 className="mt-10 text-xl font-semibold text-slate-900">
                What to Expect
              </h3>
              <ul className="mt-4 space-y-3">
                {service.whatToExpect.map((item) => (
                  <li key={item} className="flex gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary-50">
                      <CheckCircle2 className="h-4 w-4 text-secondary-600" />
                    </div>
                    <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-primary-50 p-6">
                <div className="flex gap-3">
                  <User className="h-5 w-5 shrink-0 text-primary-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Who is this for?</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {service.whoItsFor}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900">Book This Service</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Schedule your appointment online in just a few clicks.
                  </p>
                  <button
                    onClick={() => onNavigate('/book')}
                    className="btn-primary mt-4 w-full"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </button>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    Average response time: under 2 hours
                  </div>
                </div>

                {relatedDoctors.length > 0 && (
                  <div className="card p-6">
                    <h3 className="font-semibold text-slate-900">Related Doctors</h3>
                    <div className="mt-4 space-y-3">
                      {relatedDoctors.map((doctor) => (
                        <button
                          key={doctor.slug}
                          onClick={() => onNavigate(`/doctors/${doctor.slug}`)}
                          className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50"
                        >
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {doctor.name}
                            </p>
                            <p className="text-xs text-slate-500">{doctor.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
