import {type User, Language, UserStatus, UserRole } from './user-context';

export const FALLBACK_USER: User = {
  id: 'fallback-user',
  firstName: 'Muhammad',
  lastName: 'Fauzi',
  email: 'fauzym02@gmail.com',
  headline: 'Vibe coder enjoyers',
  biography: 'Lorem Ipsum',
  language: Language.ENGLISH_US,
  profilePictures: [],
  websiteUrl: 'https://chatgpt.com/g/g-p-68e7b33f4d508191ae99b284b5f7414e-cp-salingtau/project',
  facebookUrl: 'https://www.facebook.com/share/1Cvn9e8KTR/',
  instagramUrl: 'https://www.instagram.com/mhmdfauzy27?igsh=eGVudjh6ZWdtYmp4',
  linkedinUrl: 'https://www.linkedin.com/in/muhammad-fauzi-2a90a935b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  tiktokUrl: 'https://www.tiktok.com/@partaigerindra?_r=1&_t=ZS-910lOmydfQQ',
  xUrl: 'https://x.com/bahlillahadalia?t=JxUDjvSj6_jMlC69qWl60A&s=08 ',
  youtubeUrl: 'https://youtube.com/@windahbasudara?si=ZyYqyWzcpxAM0ss3',
  status: UserStatus.INACTIVE,
  lastLoggedInAt: undefined,
  roles: [UserRole.STUDENT],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};