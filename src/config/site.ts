import {
  Eye,
  Scan,
  Sparkles,
  ShieldCheck,
  Droplets,
  Baby,
  AlertCircle,
  Glasses,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  image: string;
  description: string;
  whatToExpect: string[];
  whoItsFor: string;
  relatedDoctorSlugs: string[];
}

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  qualifications: string;
  specialties: string[];
  languages: string[];
  bio: string;
  image: string;
  locationSlugs: string[];
}

export interface Location {
  slug: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: { day: string; time: string }[];
  mapEmbedUrl: string;
  mapsUrl: string;
  image: string;
  googleReviewsUrl: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  source: string;
  date: string;
  locationSlug: string;
}

export const clinic = {
  name: 'SkyView Eye Centre',
  description:
    'Premier eye care across modern eye centres — combining world-class ophthalmology with compassionate, patient-first care.',
  email: 'info@skyvieweyecentre.com',
  phone: '+65 6123 4567',
  whatsapp: '+65 8123 4567',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
  platoEmbedUrl: 'https://clinic.platomedical.com/book/ZHJnYW5lc2g=/1ce462e2232c40619f459ca02896a02a',
  stats: [
    { value: '20+', label: 'Years of Excellence' },
    { value: '80,000+', label: 'Patients Served' },
    { value: '2', label: 'Clinic Locations' },
    { value: '4', label: 'Specialist Doctors' },
  ],
};

export const services: Service[] = [
  {
    slug: 'comprehensive-eye-exam',
    title: 'Comprehensive Eye Examination',
    shortDescription:
      'In-depth clinical assessments and diagnostic imaging to safeguard your family’s vision.',
    icon: Eye,
    image: 'https://images.pexels.com/photos/5752282/pexels-photo-5752282.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Our comprehensive eye examinations go far beyond basic prescription checks. Using state-of-the-art diagnostic platforms—including corneal topography, pachymetry, anterior segment OCT, and dilated retinal photography—our specialists evaluate complete ocular health. Early detection of asymptomatic conditions like glaucoma, macular degeneration, and diabetic eye disease prevents irreversible vision loss.',
    whatToExpect: [
      'Visual acuity testing and automated refraction',
      'Tonometry to evaluate intraocular pressure (IOP)',
      'High-resolution Optical Coherence Tomography (OCT) scans',
      'Dilated fundus examination of the retina and optic nerve',
      'Personalised consultation and preventive management plan',
    ],
    whoItsFor:
      'Recommended annually for adults over 40, seniors, and anyone with a history of diabetes, hypertension, or family eye disease.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-sarah-lim'],
  },
  {
    slug: 'cataract-surgery',
    title: 'Cataract Surgery & Aftercare',
    shortDescription:
      'Modern micro-incision cataract removal, premium IOL implantation, and YAG capsulotomy.',
    icon: Scan,
    image: 'https://images.pexels.com/photos/7108168/pexels-photo-7108168.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Cataract surgery restores clarity when the natural lens becomes cloudy, causing glare, faded colours, and hazy sight. We specialise in phacoemulsification (micro-incision ultrasonic removal) and complex Extracapsular Cataract Extraction (ECCE) paired with tailored premium monofocal, toric, or multifocal lenses. We also offer painless outpatient YAG laser capsulotomy to clear secondary cataracts (posterior capsule opacification).',
    whatToExpect: [
      'Pre-operative optical biometry and precise IOL power calculation',
      'Micro-incision phacoemulsification under gentle local or topical anaesthesia',
      'Premium intraocular lens implantation customised to your visual goals',
      'Same-day day-surgery discharge with fast recovery',
      'In-office YAG laser capsulotomy for hazy post-surgical capsules',
    ],
    whoItsFor:
      'Adults experiencing blurry vision, night-driving glare, halos around lights, or cloudy vision following prior cataract surgery.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-rajesh-kumar'],
  },
  {
    slug: 'retina-macular-care',
    title: 'Retina & Macular Care',
    shortDescription:
      'Specialised care for diabetic retinopathy, macular oedema, tears, and anti-VEGF therapy.',
    icon: Droplets,
    image: 'https://images.pexels.com/photos/5201872/pexels-photo-5201872.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Retinal and macular conditions require prompt, specialised intervention to safeguard central sight. We provide comprehensive retinal laser therapies including Panretinal Photocoagulation (PRP), focal/grid macular lasers, and laser retinopexy for retinal breaks. In addition, we administer in-clinic intravitreal anti-VEGF injections under sterile conditions to control swelling and stabilize vision.',
    whatToExpect: [
      'Dilated fundus examination and OCT retinal thickness mapping',
      'In-clinic targeted retinal laser treatment (PRP, focal, or retinopexy)',
      'Comfortable intravitreal injections administered under topical anaesthesia',
      'Screening schedules coordinated with your diabetes management plan',
      'Clear protocols for identifying urgent signs like flashes and sudden floaters',
    ],
    whoItsFor:
      'Patients with diabetes, macular oedema, unexplained flashes, a sudden shower of floaters, or diagnosed retinal breaks.',
    relatedDoctorSlugs: ['dr-nurul-aishah', 'dr-rajesh-kumar'],
  },
  {
    slug: 'glaucoma-management',
    title: 'Glaucoma Management & Lasers',
    shortDescription:
      'Pressure screening, visual fields, long-term monitoring, and therapeutic YAG laser iridotomy.',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/5996693/pexels-photo-5996693.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Known as the "silent thief of sight," glaucoma damages the optic nerve and peripheral vision without noticeable early warning. We provide thorough diagnostic evaluations—including corneal pachymetry, OCT retinal nerve fibre layer (RNFL) mapping, and visual field perimetry. We tailor pressure-lowering drop regimens and perform outpatient YAG Laser Peripheral Iridotomy (LPI) for angle-closure glaucoma.',
    whatToExpect: [
      'Intraocular pressure (tonometry) testing and gonioscopy evaluation',
      'High-resolution OCT imaging of the optic nerve head and RNFL',
      'Computerised visual field testing to track peripheral vision',
      'Outpatient YAG laser iridotomy to relieve narrow or closed angles',
      'Continuous long-term monitoring to preserve visual function',
    ],
    whoItsFor:
      'Individuals over 40, those with high eye pressure, narrow drainage angles, or a family history of glaucoma.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-nurul-aishah'],
  },
  {
    slug: 'cornea-ocular-surface',
    title: 'Cornea & Ocular Surface Disease',
    shortDescription:
      'Targeted care for dry eye syndrome, pterygium, microbial keratitis, and keratoconus.',
    icon: Eye,
    image: 'https://images.pexels.com/photos/6749708/pexels-photo-6749708.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'A healthy ocular surface is essential for clear and comfortable sight. We offer diagnostic and surgical solutions for conditions ranging from chronic dry eyes and severe microbial keratitis to keratoconus and pterygium. Our clinical procedures include diagnostic corneal scrapings, punctal plug occlusion, therapeutic bandage contact lenses, conjunctival autograft pterygium excision, and anterior chamber paracentesis.',
    whatToExpect: [
      'Tear film evaluation, corneal pachymetry, and corneal topography',
      'Microbiological corneal scraping and smear cultures for severe keratitis',
      'Punctal occlusion plug placement for lasting dry eye relief',
      'Surgical pterygium removal with conjunctival autograft to prevent recurrence',
      'Therapeutic bandage lenses applied to support corneal healing',
    ],
    whoItsFor:
      'Patients troubled by gritty, burning, red, or watery eyes, fleshy conjunctival growths (pterygium), or irregular corneal shape.',
    relatedDoctorSlugs: ['dr-sarah-lim', 'dr-tan-wei-ming'],
  },
  {
    slug: 'pediatric-eye-care',
    title: "Children's Eye Care",
    shortDescription:
      'Dedicated paediatric examinations and vision development care in a child-friendly environment.',
    icon: Baby,
    image: 'https://images.pexels.com/photos/5996761/pexels-photo-5996761.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      "A child's visual system develops rapidly during early years, making timely detection of conditions like amblyopia (lazy eye), strabismus (squint), and high refractive errors essential. Our team creates a gentle, engaging environment to thoroughly assess your child’s sight, eye alignment, and binocular vision, recommending timely interventions to support healthy visual milestones.",
    whatToExpect: [
      'Child-friendly visual acuity testing and non-threatening exams',
      'Screening for amblyopia (lazy eye), strabismus (squint), and refractive errors',
      'Evaluation of binocular coordination and focusing ability',
      'Customised management plans including corrective eyewear and patching therapy',
      'Actionable guidance for parents on digital screen habits and visual ergonomics',
    ],
    whoItsFor:
      'Infants, children, and teenagers, especially those showing signs of eye turns, frequent eye rubbing, squinting, or learning difficulties in school.',
    relatedDoctorSlugs: ['dr-sarah-lim', 'dr-nurul-aishah'],
  },
  {
    slug: 'oculoplastics-eyelid-procedures',
    title: 'Oculoplastics & Minor Eyelid Procedures',
    shortDescription:
      'Specialised treatment for chalazia, styes, eyelid malpositions, and benign lid lesions.',
    icon: Sparkles,
    image: 'https://images.pexels.com/photos/5996693/pexels-photo-5996693.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Eyelid and adnexal disorders can cause persistent irritation, corneal abrasions, or visual obstruction. We provide minor office-based oculoplastic treatments including incision and drainage for persistent chalazia (styes), lash epilation for trichiasis, incisional/excisional biopsies, shave excisions, and surgical repair for entropion (inward-turning lid) and ectropion (outward-turning lid).',
    whatToExpect: [
      'Detailed clinical evaluation of eyelid margins, lash alignment, and tear drainage',
      'Comfortable in-office minor procedures performed under local anaesthesia',
      'Incision and drainage (I&D) for stubborn chalazia with rapid recovery',
      'Delicate microsurgical biopsies and aesthetic wound closures',
      'Clear postoperative guidance and long-term eyelid hygiene management',
    ],
    whoItsFor:
      'Patients with recurring eyelid lumps, ingrown eyelashes scratching the eye, drooping or turned-in lids, or lesions requiring biopsy.',
    relatedDoctorSlugs: ['dr-sarah-lim', 'dr-rajesh-kumar'],
  },
  {
    slug: 'emergency-eye-care-trauma',
    title: 'Urgent Eye Care & Trauma Repair',
    shortDescription:
      'Immediate attention for corneal foreign bodies, chemical burns, and globe/lid injuries.',
    icon: AlertCircle,
    image: 'https://images.pexels.com/photos/7108168/pexels-photo-7108168.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Ocular emergencies require immediate specialist evaluation to save sight. Both our clinics are equipped for prompt acute triage and treatment, including superficial/embedded corneal and conjunctival foreign body removal, rust ring debridement, chemical burn irrigation, temporary tarsorrhaphy, tissue adhesive sealing, and primary suturing of lid lacerations and corneoscleral wounds.',
    whatToExpect: [
      'Priority triage and rapid slit-lamp assessment',
      'Topical anaesthesia for pain relief and safe extraction',
      'Delicate removal of metal, foreign matter, and corneal rust rings',
      'Urgent suture repair or medical gluing for lacerations and wounds',
      'Protective eye shielding, antimicrobial coverage, and close post-trauma reviews',
    ],
    whoItsFor:
      'Anyone suffering from sudden foreign body sensation, cuts to the eyelid or eye, chemical splashes, or acute ocular trauma.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-nurul-aishah', 'dr-rajesh-kumar'],
  },
];

export const doctors: Doctor[] = [
  {
    slug: 'dr-tan-wei-ming',
    name: 'Dr. Tan Wei Ming',
    title: 'Senior Consultant Ophthalmologist',
    qualifications: 'MBBS (Harimau Tarum), FRCSEd (Ophth), FRCSGlasg',
    specialties: ['Cataract Surgery', 'Glaucoma', 'Comprehensive Ophthalmology'],
    languages: ['English', 'Mandarin', 'Malay'],
    bio: 'Dr. Tan brings over 20 years of experience in ophthalmology, with subspecialty expertise in cataract and glaucoma surgery. He has performed over 15,000 cataract procedures and is a recognised trainer in femtosecond laser cataract surgery. Dr. Tan believes in patient-centred care and takes time to ensure every patient understands their condition and treatment options.',
    image:
      'https://images.pexels.com/photos/6749767/pexels-photo-6749767.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['Harimau-Tarum'],
  },
  {
    slug: 'dr-sarah-lim',
    name: 'Dr. Sarah Lim',
    title: 'Consultant Ophthalmologist',
    qualifications: 'MBBS (Harimau Tarum), MMed (Ophth), FAMS',
    specialties: ['LASIK & Refractive Surgery', 'Pediatric Eye Care', 'Contact Lenses'],
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Lim is a refractive and pediatric eye specialist with a passion for helping patients of all ages achieve their best vision. She has trained internationally in advanced LASIK techniques and SMILE surgery. Dr. Lim is known for her gentle, reassuring manner — particularly with young patients and those feeling anxious about eye procedures.',
    image:
      'https://images.pexels.com/photos/6749762/pexels-photo-6749762.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['Harimau-Tarum', 'johor-bahru'],
  },
  {
    slug: 'dr-rajesh-kumar',
    name: 'Dr. Rajesh Kumar',
    title: 'Consultant Ophthalmologist',
    qualifications: 'MD (Ophth), FRCSGlasg, Fellowship in Cornea & Refractive Surgery',
    specialties: ['Cataract Surgery', 'LASIK & Refractive Surgery', 'Corneal Disorders'],
    languages: ['English', 'Tamil', 'Malay'],
    bio: 'Dr. Kumar specialises in corneal and refractive surgery, with advanced training in both bladeless LASIK and complex cataract cases. He has published extensively on corneal transplantation techniques and is actively involved in clinical research. Dr. Kumar is committed to making advanced eye care accessible across both Harimau Tarum and Tun Aminah.',
    image:
      'https://images.pexels.com/photos/6749738/pexels-photo-6749738.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['johor-bahru'],
  },
  {
    slug: 'dr-nurul-aishah',
    name: 'Dr. Nurul Aishah',
    title: 'Consultant Ophthalmologist',
    qualifications: 'MD (UKM), MMed (Ophth), Fellowship in Medical Retina',
    specialties: ['Glaucoma Management', 'Diabetic Eye Care', 'Dry Eye Treatment'],
    languages: ['English', 'Malay', 'Arabic'],
    bio: 'Dr. Nurul Aishah is a medical retina and glaucoma specialist dedicated to preserving vision in patients with chronic eye conditions. She has a particular interest in diabetic retinopathy management and has led community screening programmes in Johor. Dr. Nurul is fluent in three languages and is known for her warm, thorough consultations.',
    image:
      'https://images.pexels.com/photos/6749714/pexels-photo-6749714.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['johor-bahru'],
  },
];

export const locations: Location[] = [
  {
    slug: 'Harimau-Tarum',
    name: 'SkyView Eye Centre — Harimau Tarum',
    city: 'Johor Bahru',
    country: 'Malaysia',
    address: 'No. 100, Jalan Harimau Tarum, Taman Abad, 80250 Johor Bahru, Johor, Malaysia',
    phone: '+65 6123 4567',
    whatsapp: '+65 8123 4567',
    email: 'info@skyvieweyecentre.com',
    hours: [
      { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 5:00 PM' },
      { day: 'Sunday & Public Holidays', time: 'Closed' },
    ],
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Shanthi+Eye+Klinik+%26+Surgery&t=&z=17&ie=UTF8&iwloc=&output=embed',
    mapsUrl: 'https://maps.app.goo.gl/LUYB3EhoobL7yXWG9',
    image:
      'https://images.pexels.com/photos/5493994/pexels-photo-5493994.jpeg?auto=compress&cs=tinysrgb&w=1200',
    googleReviewsUrl: 'https://www.google.com/maps/place/Shanthi+Eye+Klinik+%26+Surgery/@1.4854206,103.765508,17z/data=!4m8!3m7!1s0x31da6d2fbeec05b9:0x288d91a8e16e4e7f!8m2!3d1.4854206!4d103.765508!9m1!1b1!16s%2Fg%2F1xgz89sc?entry=ttu&g_ep=EgoyMDI2MDgzMC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    slug: 'johor-bahru',
    name: 'SkyView Eye Centre — Tun Aminah',
    city: 'Johor Bahru',
    country: 'Malaysia',
    address: 'No. 87, Jalan Bentara 1, Taman Ungku Tun Aminah, 81300 Skudai, Johor, Malaysia',
    phone: '+60 7 123 4567',
    whatsapp: '+60 12 345 6789',
    email: 'info@skyvieweyecentre.com',
    hours: [
      { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
      { day: 'Sunday & Public Holidays', time: '10:00 AM – 2:00 PM' },
    ],
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Shanthi+Eye+Klinik+%26+Surgery&t=&z=17&ie=UTF8&iwloc=&output=embed',
    mapsUrl: 'https://maps.app.goo.gl/LUYB3EhoobL7yXWG9',
    image:
      'https://images.pexels.com/photos/4596321/pexels-photo-4596321.jpeg?auto=compress&cs=tinysrgb&w=1200',
    googleReviewsUrl: 'https://www.google.com/maps/place/Shanthi+Eye+Klinik+%26+Surgery/@1.4854206,103.765508,17z/data=!4m8!3m7!1s0x31da6d2fbeec05b9:0x288d91a8e16e4e7f!8m2!3d1.4854206!4d103.765508!9m1!1b1!16s%2Fg%2F1xgz89sc?entry=ttu&g_ep=EgoyMDI2MDgzMC4wIKXMDSoASAFQAw%3D%3D',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'D Sagadeven',
    rating: 5,
    text: 'Had a very pleasant experience at the clinic. The staff were welcoming and the doctor took time to explain my husband condition clearly. The whole process was smooth and comfortable. Highly recommend for anyone looking for good eye care 👁️',
    source: 'Google Reviews',
    date: '4 months ago',
    locationSlug: 'Harimau-Tarum',
  },
  {
    name: 'Md A Hossain',
    rating: 5,
    text: 'Im old patient of dr. Shanthi.last 7 years my eye was ok but recently i face same problem and i wanted the same medicine but i lost the medicine name so i  WhatsApp customers service. The stuff name Bella take some details and she provide me my medicines name.Im very greatfull to her and their customers service. Thank you so much😊',
    source: 'Google Reviews',
    date: '4 month ago',
    locationSlug: 'Harimau-Tarum',
  },
  {
    name: 'Md A Harith',
    rating: 5,
    text: 'Visited this clinic last week, experienced doctor, and staffs were very attentive and helpful towards my mom, thanks for the great service!',
    source: 'Google Reviews',
    date: '2 months ago',
    locationSlug: 'Harimau-Tarum',
  },
  {
    name: 'B B Pu',
    rating: 5,
    text: 'Very satisfied with clinic service. Doctor Shanthi is an experience & friendly doctor .staff are all very nice and friendly.',
    source: 'Google Reviews',
    date: '5 months ago',
    locationSlug: 'Harimau-Tarum',
  },
  {
    name: 'M Fung',
    rating: 5,
    text: 'Very good service and treatment by Dr Shanti. Nurses here are ever friendly and cheerful.',
    source: 'Google Reviews',
    date: '7 months ago',
    locationSlug: 'Harimau-Tarum',
  },
  {
    name: 'R Rijal',
    rating: 5,
    text: 'First time here and i already love the service. Plenty of seats (very comfortable too) and the waiting time is reasonable..Staff are very attentive and Dr.Shanti is professional and friendly.. Price is reasonable..',
    source: 'Google Reviews',
    date: 'a year ago',
    locationSlug: 'Harimau-Tarum',
  },
];

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Locations', path: '/locations' },
  { label: 'Contact', path: '/contact' },
];
