// `icon` = file name in public/icons, `glyph` = built-in line icon,
// `text` = short text badge when no logo exists.

export const skillGroups = [
  {
    id: 'security',
    icon: 'shield',
    title: 'Networking & Security',
    subtitle: 'Infrastructure, analysis & defense',
    items: [
      { name: 'Cisco IOS', icon: 'cisco' },
      { name: 'Kali Linux', icon: 'kalilinux' },
      { name: 'Wireshark', icon: 'wireshark' },
      { name: 'OWASP ZAP', icon: 'zap' },
      { name: 'Autoruns', glyph: 'eye' },
      { name: 'Ubuntu', icon: 'ubuntu' },
      { name: 'Linux', icon: 'linux' },
      { name: 'SIEM', glyph: 'radar' },
      { name: 'Routing', glyph: 'network' },
    ],
  },
  {
    id: 'iot',
    icon: 'chip',
    title: 'Hardware & IoT',
    subtitle: 'Embedded, real-time & connected devices',
    items: [
      { name: 'ESP32', icon: 'espressif' },
      { name: 'Node-RED', icon: 'nodered' },
      { name: 'MQTT', icon: 'mqtt' },
      { name: 'Wokwi', glyph: 'cpu' },
      { name: 'Blynk', glyph: 'phone' },
      { name: 'VHDL', glyph: 'chip' },
      { name: 'Assembly', glyph: 'terminal' },
    ],
  },
  {
    id: 'languages',
    icon: 'code',
    title: 'Languages & Frameworks',
    subtitle: 'Systems, web, back-end & machine learning',
    wide: true,
    items: [
      { name: 'C', icon: 'c' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'Java', icon: 'java' },
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind', icon: 'tailwindcss' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'LibGDX', text: 'GDX' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
    ],
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Data, Cloud & AI',
    subtitle: 'Databases, deployment & AI APIs',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'SQL', glyph: 'database' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Render', icon: 'render' },
      { name: 'Gemini API', icon: 'gemini' },
      { name: 'OpenAI API', icon: 'openai' },
    ],
  },
  {
    id: 'tools',
    icon: 'tool',
    title: 'Tools & Workflow',
    subtitle: 'Daily drivers, design & testing',
    items: [
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Streamlit', icon: 'streamlit' },
      { name: 'Pytest', icon: 'pytest' },
    ],
  },
];

export const marqueeRows = [
  ['vscode', 'kalilinux', 'wireshark', 'cisco', 'zap', 'github', 'ubuntu', 'python', 'cplusplus', 'figma'],
  ['espressif', 'nodered', 'mqtt', 'react', 'nextjs', 'typescript', 'java', 'postgresql', 'fastapi', 'git'],
];

export const iconNames = {
  vscode: 'VS Code', kalilinux: 'Kali Linux', wireshark: 'Wireshark', cisco: 'Cisco IOS', zap: 'OWASP ZAP',
  github: 'GitHub', ubuntu: 'Ubuntu', python: 'Python', cplusplus: 'C++', figma: 'Figma',
  espressif: 'ESP32', nodered: 'Node-RED', mqtt: 'MQTT', react: 'React', nextjs: 'Next.js',
  typescript: 'TypeScript', java: 'Java', postgresql: 'PostgreSQL', fastapi: 'FastAPI', git: 'Git',
};

export const hardSkills = [
  'Network Security', 'SIEM Fundamentals', 'Routing Fundamentals', 'Cisco IOS', 'Linux (Kali & Ubuntu)',
  'SQL', 'DBMS', 'OOP', 'React.js', 'JavaScript', 'Internet of Things', 'Sensor Integration',
  'UI/UX Design', 'Editing', 'Content Strategy & Planning',
];

export const softSkills = [
  'Teamwork', 'Adaptability', 'Problem-solving', 'Decision-making',
  'Project Management', 'Analytical Thinking', 'Communication',
];
