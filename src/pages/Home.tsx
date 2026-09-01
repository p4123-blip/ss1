import { useState, useEffect, useRef } from 'react';
import { Star, Calendar, ArrowRight, MapPin, Phone, CheckCircle2, Quote, Award, Users, Building2, Stethoscope, ChevronDown } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { clinic, services, doctors, locations, testimonials } from '@/config/site';

interface HomeProps {
  onNavigate: (path: string) => void;
}

// ── Replace this with your own video file URL ──
const HERO_VIDEO_URL = '';
const HERO_POSTER = 'https://images.pexels.com/photos/5752282/pexels-photo-5752282.jpeg?auto=compress&cs=tinysrgb&w=1920';

function VideoHero({ onNavigate }: { onNavigate: (path: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !HERO_VIDEO_URL) return;

    const handleCanPlay = () => setVideoReady(true);
    v.addEventListener('canplaythrough', handleCanPlay);
    v.play().catch(() => {});

    return () => v.removeEventListener('canplaythrough', handleCanPlay);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary-950">
      {/* Background image (always present, fades out when video is ready) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: videoReady ? 0 : 1 }}
      >
        <img
          src={HERO_POSTER}
          alt="Eye examination at SkyView Eye Centre"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Background video (fades in when ready) */}
      {HERO_VIDEO_URL && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
          src={HERO_VIDEO_URL}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge bg-white/10 text-primary-200 ring-1 ring-white/20 animate-fade-in-up">
            <Award className="h-3.5 w-3.5" />
            Trusted Eye Care Since 2001
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl text-balance animate-fade-in-up">
            See Life Clearly at{' '}
            <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
              SkyView Eye Centre
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-100 md:text-xl animate-fade-in-up [animation-delay:100ms]">
            {clinic.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up [animation-delay:200ms]">
            <button onClick={() => onNavigate('/book')} className="btn-accent">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 focus:ring-white/30"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-200 animate-fade-in-up [animation-delay:300ms]">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <span>Rated 5.0 on Google</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      {/* Full-screen video/photo hero */}
      <VideoHero onNavigate={onNavigate} />

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {clinic.stats.map((stat, i) => {
              const icons = [Award, Users, Building2, Stethoscope];
              const Icon = icons[i];
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Services"
            title="Comprehensive Eye Care Under One Roof"
            description="From routine eye exams to advanced surgical procedures, our specialist team delivers world-class care tailored to your needs."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <button
                key={service.slug}
                onClick={() => onNavigate(`/services/${service.slug}`)}
                className="card-hover group flex flex-col p-6 text-left"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-600">
                  <service.icon className="h-7 w-7 text-primary-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Modern clinic interior at SkyView Eye Centre"
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-xl bg-primary-600 p-5 text-white shadow-xl md:block">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm text-primary-100">Years of Excellence</p>
              </div>
            </div>
            <div>
              <SectionHeader
                center={false}
                eyebrow="Why SkyView"
                title="Excellence in Every Detail of Your Eye Care"
                description="We combine cutting-edge technology with genuine compassion to deliver an experience that puts you at ease and your vision first."
              />
              <div className="mt-8 space-y-5">
                {[
                  {
                    title: 'World-Class Specialists',
                    desc: 'Our team of 12 ophthalmologists and optometrists are fellowship-trained and internationally recognised.',
                  },
                  {
                    title: 'Advanced Technology',
                    desc: 'From femtosecond lasers to OCT angiography, we invest in the latest diagnostic and surgical equipment.',
                  },
                  {
                    title: 'Two Convenient Locations',
                    desc: 'With clinics in Singapore and Johor Bahru, quality eye care is always within reach.',
                  },
                  {
                    title: 'Patient-First Approach',
                    desc: 'We take time to listen, explain, and tailor treatment plans to your unique needs and lifestyle.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50">
                      <CheckCircle2 className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Specialists"
            title="Meet Our Expert Eye Care Team"
            description="Our doctors bring decades of combined experience and international training to provide you with the highest standard of care."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.slug}
                onClick={() => onNavigate(`/doctors/${doctor.slug}`)}
                className="card-hover group overflow-hidden text-left"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                    <p className="text-sm text-primary-200">{doctor.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.specialties.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="badge bg-primary-50 text-primary-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => onNavigate('/doctors')} className="btn-secondary">
              View All Doctors
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Patient Stories"
            title="What Our Patients Say"
            description="Real reviews from our patients on Google. We're proud of the trust they place in us."
          />
          <div className="mt-10 flex justify-center">
            <a
              href={locations[0].googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-100"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              Read all reviews on Google
            </a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card-hover p-6">
                <Quote className="h-8 w-8 text-primary-200" />
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  "{testimonial.text}"
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Preview */}
      <section className="section-padding bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Locations"
            title="Two Clinics, One Standard of Excellence"
            description="Visit us in Singapore or Johor Bahru for world-class eye care delivered with a personal touch."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
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
                  <h3 className="text-xl font-semibold text-slate-900">
                    {location.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{location.address}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-primary-600" />
                    {location.phone}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => onNavigate(`/locations/${location.slug}`)}
                      className="btn-secondary flex-1"
                    >
                      View Details
                    </button>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      <MapPin className="h-4 w-4" />
                      Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 py-16 md:py-20">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl text-balance">
            Ready to See Life More Clearly?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Book your appointment today and take the first step towards better vision.
            Our team is ready to welcome you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => onNavigate('/book')} className="btn-accent">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 focus:ring-white/30"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
