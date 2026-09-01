import {
  Eye,
  Scan,
  Sparkles,
  ShieldCheck,
  Droplets,
  Baby,
  Contact,
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
  tagline: 'See Life Clearly',
  description:
    'Premier eye care across Singapore and Johor Bahru — combining world-class ophthalmology with compassionate, patient-first care.',
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
    { value: '25+', label: 'Years of Excellence' },
    { value: '80,000+', label: 'Patients Served' },
    { value: '2', label: 'Clinic Locations' },
    { value: '12', label: 'Specialist Doctors' },
  ],
};

export const services: Service[] = [
  {
    slug: 'comprehensive-eye-exam',
    title: 'Comprehensive Eye Exam',
    shortDescription:
      'A thorough assessment of your vision and eye health using advanced diagnostic technology.',
    icon: Eye,
    image: 'https://images.pexels.com/photos/5752282/pexels-photo-5752282.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Our comprehensive eye examination goes beyond a simple vision test. Using state-of-the-art diagnostic equipment, our specialists evaluate every aspect of your eye health — from visual acuity and refractive error to intraocular pressure, retinal health, and optic nerve integrity. Early detection of conditions like glaucoma, macular degeneration, and diabetic retinopathy can prevent irreversible vision loss.',
    whatToExpect: [
      'Visual acuity testing with Snellen chart and digital refractors',
      'Tonometry to measure intraocular pressure',
      'Dilated fundus examination for retinal health assessment',
      'Optical coherence tomography (OCT) scan for detailed retinal imaging',
      'Personalised consultation and recommendations',
    ],
    whoItsFor:
      'Recommended annually for adults over 40, and for anyone with a family history of eye disease, diabetes, or high blood pressure.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-sarah-lim'],
  },
  {
    slug: 'cataract-surgery',
    title: 'Cataract Surgery',
    shortDescription:
      'Restore crystal-clear vision with advanced, bladeless laser cataract surgery and premium lenses.',
    icon: Scan,
    image: 'https://images.pexels.com/photos/7108168/pexels-photo-7108168.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Cataract surgery is one of the most common and safest surgical procedures performed today. At SkyView Eye Centre, we use femtosecond laser technology for precise, bladeless cataract removal. We offer a range of premium intraocular lenses (IOLs) — including multifocal, toric, and extended-depth-of-focus lenses — tailored to your lifestyle and visual needs. Most patients see dramatically clearer within 24 hours of the procedure.',
    whatToExpect: [
      'Pre-operative biometry and IOL power calculation',
      'Femtosecond laser-assisted cataract removal',
      'Premium IOL implantation tailored to your visual goals',
      'Same-day discharge with minimal downtime',
      'Post-operative review within 24–48 hours',
    ],
    whoItsFor:
      'Adults experiencing cloudy or blurred vision, difficulty seeing at night, or faded colours due to cataracts.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-rajesh-kumar'],
  },
  {
    slug: 'lasik-refractive-surgery',
    title: 'LASIK & Refractive Surgery',
    shortDescription:
      'Achieve freedom from glasses and contact lenses with customised laser vision correction.',
    icon: Sparkles,
    image: 'https://images.pexels.com/photos/7108227/pexels-photo-7108227.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'LASIK and refractive surgery reshape the cornea to correct myopia, hyperopia, and astigmatism. We offer multiple laser platforms — including bladeless IntraLASIK, SMILE, and PRK — selected based on your corneal thickness, pupil size, and lifestyle. Each treatment is fully customised using wavefront-guided technology for sharper, higher-quality vision than glasses can provide.',
    whatToExpect: [
      'Comprehensive corneal mapping and wavefront analysis',
      'Customised treatment plan (LASIK, SMILE, or PRK)',
      'Painless laser procedure completed in under 15 minutes',
      'Most patients return to normal activities within 48 hours',
      'Lifetime follow-up and enhancement guarantee',
    ],
    whoItsFor:
      'Adults aged 21–45 with stable prescription, healthy corneas, and a desire for visual freedom.',
    relatedDoctorSlugs: ['dr-sarah-lim', 'dr-rajesh-kumar'],
  },
  {
    slug: 'glaucoma-management',
    title: 'Glaucoma Management',
    shortDescription:
      'Protect your sight from the "silent thief of vision" with early detection and advanced treatment.',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/5996693/pexels-photo-5996693.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Glaucoma is a group of eye conditions that damage the optic nerve, often caused by elevated intraocular pressure. Because it progresses without symptoms until significant vision is lost, regular screening is essential. Our glaucoma specialists use the latest diagnostic tools — including OCT, visual field perimetry, and corneal biomechanics — to detect glaucoma at its earliest stages. Treatment options include pressure-lowering eye drops, selective laser trabeculoplasty (SLT), and minimally invasive glaucoma surgery (MIGS).',
    whatToExpect: [
      'Comprehensive optic nerve and visual field assessment',
      'OCT imaging for precise nerve fibre layer analysis',
      'Personalised treatment plan (drops, laser, or surgery)',
      'Regular monitoring with visual field and OCT tracking',
      'Patient education on lifelong management',
    ],
    whoItsFor:
      'Adults over 40, individuals with a family history of glaucoma, and patients with high intraocular pressure or risk factors.',
    relatedDoctorSlugs: ['dr-tan-wei-ming', 'dr-nurul-aishah'],
  },
  {
    slug: 'diabetic-eye-care',
    title: 'Diabetic Eye Care',
    shortDescription:
      'Specialised monitoring and treatment to protect vision for patients with diabetes.',
    icon: Droplets,
    image: 'https://images.pexels.com/photos/5201872/pexels-photo-5201872.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Diabetes can damage the blood vessels in the retina, leading to diabetic retinopathy — a leading cause of blindness in working-age adults. Our diabetic eye care programme combines regular retinal screening, OCT angiography, and advanced treatments including anti-VEGF injections and laser therapy. With early detection and proper management, vision loss from diabetic retinopathy is largely preventable.',
    whatToExpect: [
      'Dilated retinal examination and fundus photography',
      'OCT angiography for detailed retinal vessel mapping',
      'Anti-VEGF injection therapy when needed',
      'Retinal laser treatment for macular oedema or proliferative disease',
      'Coordination with your endocrinologist for holistic care',
    ],
    whoItsFor:
      'Patients with Type 1 or Type 2 diabetes, recommended at least annually from the time of diagnosis.',
    relatedDoctorSlugs: ['dr-nurul-aishah', 'dr-rajesh-kumar'],
  },
  {
    slug: 'pediatric-eye-care',
    title: "Children's Eye Care",
    shortDescription:
      'Gentle, child-friendly eye exams and treatment for little eyes that need special attention.',
    icon: Baby,
    image: 'https://images.pexels.com/photos/5996761/pexels-photo-5996761.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      "Children's eyes are still developing, and early detection of problems like amblyopia (lazy eye), strabismus (squint), and refractive errors is critical for normal visual development. Our pediatric eye specialists create a warm, playful environment that puts children at ease. We use child-friendly testing methods and offer treatments including glasses, patching therapy, and vision therapy exercises.",
    whatToExpect: [
      'Child-friendly visual acuity and binocular vision testing',
      'Assessment for amblyopia, strabismus, and refractive errors',
      'Warm, playful environment designed for children',
      'Treatment plans including glasses, patching, or vision therapy',
      'Guidance for parents on screen time and visual habits',
    ],
    whoItsFor:
      'Children from 6 months to 16 years, with recommended check-ups at ages 1, 3, 5, and annually thereafter.',
    relatedDoctorSlugs: ['dr-sarah-lim', 'dr-nurul-aishah'],
  },
  {
    slug: 'contact-lens-fitting',
    title: 'Contact Lens Fitting',
    shortDescription:
      'Expert fitting for comfortable, healthy contact lenses — including specialty and scleral lenses.',
    icon: Contact,
    image: 'https://images.pexels.com/photos/6749714/pexels-photo-6749714.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Finding the right contact lenses involves more than just a prescription. Our optometrists assess your corneal shape, tear film, and lifestyle to recommend the best lens type — from daily disposables and monthly soft lenses to rigid gas-permeable, toric, multifocal, and scleral lenses for complex prescriptions. We provide thorough training on insertion, removal, and lens hygiene to keep your eyes healthy.',
    whatToExpect: [
      'Corneal topography and tear film assessment',
      'Personalised lens selection (soft, toric, multifocal, or scleral)',
      'Trial fitting with comfort and vision evaluation',
      'Hands-on training for insertion, removal, and care',
      'Follow-up check to ensure eye health and comfort',
    ],
    whoItsFor:
      'Anyone seeking an alternative to glasses, including those with astigmatism, presbyopia, or irregular corneas.',
    relatedDoctorSlugs: ['dr-sarah-lim'],
  },
  {
    slug: 'dry-eye-treatment',
    title: 'Dry Eye Treatment',
    shortDescription:
      'Relief for dry, irritated eyes with advanced diagnostics and personalised treatment plans.',
    icon: Glasses,
    image: 'https://images.pexels.com/photos/6749708/pexels-photo-6749708.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description:
      'Dry eye syndrome is increasingly common in our screen-heavy, air-conditioned world. Symptoms include burning, grittiness, redness, and watery eyes. Our dry eye clinic uses advanced diagnostics — including tear osmolarity testing and meibography — to identify the root cause. Treatments range from artificial tears and eyelid hygiene to intense pulsed light (IPL) therapy, LipiFlow thermal pulsation, and punctal plugs.',
    whatToExpect: [
      'Tear film quality and osmolarity testing',
      'Meibography to assess meibomian gland function',
      'Personalised treatment plan based on dry eye severity',
      'Advanced options including IPL, LipiFlow, and punctal plugs',
      'Ongoing management for long-term comfort',
    ],
    whoItsFor:
      'Anyone experiencing persistent dry, gritty, burning, or watery eyes, especially those who work extensively with screens.',
    relatedDoctorSlugs: ['dr-nurul-aishah', 'dr-sarah-lim'],
  },
];

export const doctors: Doctor[] = [
  {
    slug: 'dr-tan-wei-ming',
    name: 'Dr. Tan Wei Ming',
    title: 'Senior Consultant Ophthalmologist',
    qualifications: 'MBBS (Singapore), FRCSEd (Ophth), FRCSGlasg',
    specialties: ['Cataract Surgery', 'Glaucoma', 'Comprehensive Ophthalmology'],
    languages: ['English', 'Mandarin', 'Malay'],
    bio: 'Dr. Tan brings over 20 years of experience in ophthalmology, with subspecialty expertise in cataract and glaucoma surgery. He has performed over 15,000 cataract procedures and is a recognised trainer in femtosecond laser cataract surgery. Dr. Tan believes in patient-centred care and takes time to ensure every patient understands their condition and treatment options.',
    image:
      'https://images.pexels.com/photos/6749767/pexels-photo-6749767.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['singapore'],
  },
  {
    slug: 'dr-sarah-lim',
    name: 'Dr. Sarah Lim',
    title: 'Consultant Ophthalmologist',
    qualifications: 'MBBS (Singapore), MMed (Ophth), FAMS',
    specialties: ['LASIK & Refractive Surgery', 'Pediatric Eye Care', 'Contact Lenses'],
    languages: ['English', 'Mandarin'],
    bio: 'Dr. Lim is a refractive and pediatric eye specialist with a passion for helping patients of all ages achieve their best vision. She has trained internationally in advanced LASIK techniques and SMILE surgery. Dr. Lim is known for her gentle, reassuring manner — particularly with young patients and those feeling anxious about eye procedures.',
    image:
      'https://images.pexels.com/photos/6749762/pexels-photo-6749762.jpeg?auto=compress&cs=tinysrgb&w=800',
    locationSlugs: ['singapore', 'johor-bahru'],
  },
  {
    slug: 'dr-rajesh-kumar',
    name: 'Dr. Rajesh Kumar',
    title: 'Consultant Ophthalmologist',
    qualifications: 'MD (Ophth), FRCSGlasg, Fellowship in Cornea & Refractive Surgery',
    specialties: ['Cataract Surgery', 'LASIK & Refractive Surgery', 'Corneal Disorders'],
    languages: ['English', 'Tamil', 'Malay'],
    bio: 'Dr. Kumar specialises in corneal and refractive surgery, with advanced training in both bladeless LASIK and complex cataract cases. He has published extensively on corneal transplantation techniques and is actively involved in clinical research. Dr. Kumar is committed to making advanced eye care accessible across both Singapore and Johor Bahru.',
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
    slug: 'singapore',
    name: 'SkyView Eye Centre — Singapore',
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Orchard Boulevard, #05-01, Singapore 248649',
    phone: '+65 6123 4567',
    whatsapp: '+65 8123 4567',
    email: 'singapore@skyvieweyecentre.com',
    hours: [
      { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 5:00 PM' },
      { day: 'Sunday & Public Holidays', time: 'Closed' },
    ],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.796!2d103.8198!3d1.3048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMSDCsDE4JzE3LjMiTiAxMDPCsDQ5JzExLjMiRQ!5e0!3m2!1sen!2ssg!4v1234567890',
    mapsUrl: 'https://maps.google.com/?q=1+Orchard+Boulevard+Singapore+248649',
    image:
      'https://images.pexels.com/photos/5646180/pexels-photo-5646180.jpeg?auto=compress&cs=tinysrgb&w=1200',
    googleReviewsUrl: 'https://www.google.com/maps/place/SkyView+Eye+Centre+Singapore',
  },
  {
    slug: 'johor-bahru',
    name: 'SkyView Eye Centre — Johor Bahru',
    city: 'Johor Bahru',
    country: 'Malaysia',
    address: 'Lot G-01, JB City Square, 106-02A, Jalan Tun Abdul Razak, 80000 Johor Bahru, Johor',
    phone: '+60 7 123 4567',
    whatsapp: '+60 12 345 6789',
    email: 'jb@skyvieweyecentre.com',
    hours: [
      { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
      { day: 'Sunday & Public Holidays', time: '10:00 AM – 2:00 PM' },
    ],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d103.756!3d1.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMSDCsDI5JzMxLjIiTiAxMDPCsDQ1JzIxLjYiRQ!5e0!3m2!1sen!2smy!4v1234567890',
    mapsUrl: 'https://maps.google.com/?q=JB+City+Square+Johor+Bahru',
    image:
      'https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg?auto=compress&cs=tinysrgb&w=1200',
    googleReviewsUrl: 'https://www.google.com/maps/place/SkyView+Eye+Centre+Johor+Bahru',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Mei Ling Chan',
    rating: 5,
    text: 'I had my cataract surgery with Dr. Tan at the Singapore clinic and the experience was incredible. The staff were professional and caring, and I could see clearly the very next day. Highly recommend SkyView!',
    source: 'Google Reviews',
    date: '2 months ago',
    locationSlug: 'singapore',
  },
  {
    name: 'Ahmad Ismail',
    rating: 5,
    text: 'Dr. Nurul Aishah explained my glaucoma condition in a way I could finally understand. The Johor Bahru clinic is modern and clean. My eye pressure is now well controlled. Thank you to the whole team.',
    source: 'Google Reviews',
    date: '1 month ago',
    locationSlug: 'johor-bahru',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    text: 'Best decision I made was getting LASIK at SkyView. Dr. Lim was so reassuring throughout the whole process. The procedure was quick and painless, and I now have perfect vision. Life-changing!',
    source: 'Google Reviews',
    date: '3 weeks ago',
    locationSlug: 'singapore',
  },
  {
    name: 'James Wong',
    rating: 5,
    text: 'Brought my daughter for an eye check-up and Dr. Lim was amazing with her. Very patient and made the whole experience fun. The clinic is child-friendly and the staff are wonderful.',
    source: 'Google Reviews',
    date: '1 week ago',
    locationSlug: 'singapore',
  },
  {
    name: 'Siti Rahmah',
    rating: 5,
    text: 'The diabetic eye screening at the JB clinic was thorough and the staff were very attentive. Dr. Nurul took time to explain everything. I feel confident my eyes are in good hands.',
    source: 'Google Reviews',
    date: '2 weeks ago',
    locationSlug: 'johor-bahru',
  },
  {
    name: 'David Lee',
    rating: 5,
    text: 'I was dealing with dry eyes for years. The team at SkyView identified the root cause and the LipiFlow treatment made a huge difference. No more gritty, burning eyes. Excellent care.',
    source: 'Google Reviews',
    date: '1 month ago',
    locationSlug: 'singapore',
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
