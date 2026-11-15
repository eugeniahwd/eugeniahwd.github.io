export const profile = {
  firstName: 'Eugenia',
  middleName: 'Huwaida',
  lastName: 'Imtinan',
  eyebrow: 'Computer Engineering · Universitas Indonesia',

  // Titles shown in the terminal-style typing animation on the home page
  roles: [
    'Computer Engineering Student',
    'Laboratory Assistant @ NetLab UI',
    'Network & Security Enthusiast',
    'Hardware & IoT Enthusiast',
  ],

  email: 'eugeniahwda@gmail.com',
  github: 'https://github.com/eugeniahwd/',
  linkedin: 'https://www.linkedin.com/in/eugeniahuwaida',

  // Profile photo (4:5, cropped from my-photo.png). To change it, put a new
  // photo in public/images/ and update this path.
  photo: 'images/profile.webp',
};

// Opens a Gmail compose window addressed to you
export function gmailCompose({ subject = '', body = '' } = {}) {
  let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
  if (subject) url += `&su=${encodeURIComponent(subject)}`;
  if (body) url += `&body=${encodeURIComponent(body)}`;
  return url;
}

export const socials = [
  { name: 'GitHub', href: profile.github, icon: 'github' },
  { name: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { name: 'Email', href: gmailCompose(), icon: 'gmail' },
];
