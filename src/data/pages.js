// Site pages, in navigation order. Used by the navbar, menu, home index,
// "next page" links and the GitHub Pages build script.
export const pages = [
  { path: '/about', name: 'About', num: '01', desc: 'Who I am, what I focus on, and the courses that shaped me.' },
  { path: '/experience', name: 'Experience', num: '02', desc: 'Teaching, lab work, and leadership in student organizations.' },
  { path: '/projects', name: 'Projects', num: '03', desc: 'Selected work across AI, web, IoT, and game development.' },
  { path: '/skills', name: 'Skills', num: '04', desc: 'The tools and technologies I work with, from packets to pixels.' },
  { path: '/certifications', name: 'Certifications', num: '05', desc: 'Industry certifications from Google, Cisco, and Meta.' },
  { path: '/contact', name: 'Contact', num: '06', desc: 'Have an idea or opportunity? Let us talk.' },
];

export const pageName = path => (path === '/' ? 'Home' : pages.find(p => p.path === path)?.name ?? '');
