import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Calendar } from 'lucide-react';
import { clinic, locations, navLinks } from '@/config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="Logo transparent.jpeg"
                alt="SkyView Eye Centre logo"
                className="h-10 w-10 rounded-xl"
              />
              <div>
                <span className="block font-display text-lg font-bold leading-tight text-white">
                  SkyView
                </span>
                <span className="block text-xs font-medium leading-tight text-primary-400">
                  Eye Centre
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {clinic.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={clinic.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={clinic.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="text-sm text-slate-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/book')}
                  className="text-sm text-slate-400 transition-colors hover:text-primary-400"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {locations.map((location) => (
            <div key={location.slug}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {location.city}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <span>{location.address}</span>
                </li>
                <li className="flex gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <a href={`tel:${location.phone}`} className="hover:text-primary-400">
                    {location.phone}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  <a href={`mailto:${location.email}`} className="hover:text-primary-400">
                    {location.email}
                  </a>
                </li>
                <li>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300"
                  >
                    View on Google Maps
                    <MapPin className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <button
            onClick={() => onNavigate('/book')}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300"
          >
            <Calendar className="h-4 w-4" />
            Book an appointment
          </button>
        </div>
      </div>
    </footer>
  );
}
