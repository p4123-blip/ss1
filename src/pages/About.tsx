import { Calendar, Award, Heart, Microscope, Globe, CheckCircle2, Target, Eye } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { clinic } from '@/config/site';

interface AboutProps {
  onNavigate: (path: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      desc: 'Every patient is treated with empathy, respect, and genuine concern for their wellbeing.',
    },
    {
      icon: Microscope,
      title: 'Clinical Excellence',
      desc: 'We hold ourselves to the highest clinical standards, backed by continuous training and research.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      desc: 'With clinics in Harimau Tarum and Tun Aminah, we make world-class eye care accessible across borders.',
    },
    {
      icon: Award,
      title: 'Integrity',
      desc: 'We recommend only what you need and always act in your best interest — no exceptions.',
    },
  ];

  const milestones = [
    { year: '2001', title: 'Founded in Harimau Tarum', desc: 'SkyView Eye Centre opens its first clinic in Orchard Boulevard.' },
    { year: '2008', title: 'Laser Centre Launch', desc: 'Introduced bladeless femtosecond laser cataract surgery to the region.' },
    { year: '2015', title: 'Tun Aminah Expansion', desc: 'Opened our second clinic in JB City Square to serve patients across the causeway.' },
    { year: '2020', title: 'Retina & Glaucoma Centre', desc: 'Launched a dedicated medical retina and glaucoma subspecialty unit.' },
    { year: '2024', title: '80,000+ Patients', desc: 'Surpassed 80,000 patients served across both locations.' },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-page relative text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20">
            About Us
          </span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl text-balance">
            Two Decades of Protecting Vision
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            {clinic.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="SkyView Eye Centre clinic"
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 hidden rounded-xl bg-secondary-600 p-5 text-white shadow-xl md:block">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm text-secondary-100">Years of Care</p>
              </div>
            </div>
            <div>
              <SectionHeader
                center={false}
                eyebrow="Our Story"
                title="A Vision Born From Compassion"
                description="SkyView Eye Centre was founded in 2001 with a simple but powerful mission: to make world-class eye care accessible to everyone, regardless of which side of the causeway they call home."
              />
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                What began as a single clinic in Harimau Tarum has grown into a two-location
                eye care network serving over 80,000 patients across Harimau Tarum and Johor
                Bahru. Our team of 12 specialist doctors brings together decades of
                international training and clinical experience, united by a commitment to
                patient-first care.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                We invest continuously in the latest technology — from femtosecond lasers
                for bladeless cataract surgery to OCT angiography for early retinal disease
                detection. But we never forget that behind every pair of eyes is a person
                who deserves to be heard, understood, and cared for with genuine compassion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Mission & Vision"
            title="What Drives Us Forward"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card-hover p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
                <Target className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                To preserve and restore vision through compassionate, world-class eye care
                that is accessible to patients across Harimau Tarum and Tun Aminah — combining
                advanced technology with a deeply personal approach.
              </p>
            </div>
            <div className="card-hover p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-50">
                <Eye className="h-7 w-7 text-secondary-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                To be the most trusted eye care provider in the region — recognised for
                clinical excellence, patient satisfaction, and a commitment to making
                life-changing vision care available to all who need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Values"
            title="The Principles That Guide Our Care"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="card-hover p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
                  <value.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Journey"
            title="Milestones Through the Years"
          />
          <div className="mt-12 space-y-6">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className={`flex flex-col gap-4 md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1" />
                <div className="flex-1">
                  <div className="card-hover p-6">
                    <span className="badge bg-primary-600 text-white">{milestone.year}</span>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">{milestone.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-700 to-primary-900 py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Experience the SkyView Difference
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Join thousands of patients who trust us with their vision.
          </p>
          <button onClick={() => onNavigate('/book')} className="btn-accent mt-6">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
