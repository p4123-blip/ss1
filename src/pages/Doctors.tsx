import { Calendar, ArrowRight, Globe, Award } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { doctors, locations } from '@/config/site';

interface DoctorsProps {
  onNavigate: (path: string) => void;
}

export default function Doctors({ onNavigate }: DoctorsProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-page text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            Our Specialists
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Meet Our Eye Care Experts
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Our team of fellowship-trained ophthalmologists and optometrists bring
            world-class expertise and genuine compassion to every consultation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            {doctors.map((doctor) => {
              const docLocations = locations.filter((l) =>
                doctor.locationSlugs.includes(l.slug)
              );
              return (
                <div key={doctor.slug} className="card-hover overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-2/5">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-64 w-full object-cover sm:h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent sm:bg-gradient-to-r" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                      <p className="text-sm font-medium text-primary-600">{doctor.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{doctor.qualifications}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {doctor.specialties.map((spec) => (
                          <span key={spec} className="badge bg-primary-50 text-primary-700">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-slate-500 line-clamp-3">
                        {doctor.bio}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <Globe className="h-3.5 w-3.5" />
                        {doctor.languages.join(' · ')}
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <Award className="h-3.5 w-3.5" />
                        {docLocations.map((l) => l.city).join(' & ')}
                      </div>

                      <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                        <button
                          onClick={() => onNavigate(`/doctors/${doctor.slug}`)}
                          className="btn-secondary flex-1"
                        >
                          View Profile
                          <ArrowRight className="h-3.5 w-3.5" />
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
