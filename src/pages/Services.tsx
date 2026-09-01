import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { services } from '@/config/site';

interface ServicesProps {
  onNavigate: (path: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            Our Services
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Complete Eye Care Services
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            From comprehensive exams to advanced surgery, we offer the full spectrum of
            ophthalmic care for patients of all ages.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.slug} className="card-hover flex flex-col overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 shadow-lg">
                      <service.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {service.shortDescription}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.whatToExpect.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-500">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => onNavigate(`/services/${service.slug}`)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Learn More
                      <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => onNavigate('/book')}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      <Calendar className="mr-1 inline h-3.5 w-3.5" />
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
