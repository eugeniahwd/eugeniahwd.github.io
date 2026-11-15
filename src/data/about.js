// Statement on the About page. Items with hl: true are highlighted.
export const statement = [
  { text: 'A third-year Computer Engineering student at Universitas Indonesia with a growing focus on' },
  { text: 'networking', hl: true },
  { text: ',' , glue: true },
  { text: 'cybersecurity', hl: true },
  { text: ',', glue: true },
  { text: 'hardware systems', hl: true },
  { text: ', and', glue: true },
  { text: 'software development', hl: true },
  { text: '. Eager to apply a strong foundation in networking and security to real-world challenges.', glue: true },
];

export const aboutSub =
  'I build practical skills through academic projects, hands-on experimentation, and collaborative work, while helping other students grow as a laboratory assistant and assistant lecturer.';

export const focusAreas = [
  { icon: 'network', title: 'Networking', text: 'Routing, switching, VLANs and enterprise network operations with Cisco IOS.' },
  { icon: 'shield', title: 'Cybersecurity', text: 'Security fundamentals, SIEM, and hands-on practice with Kali Linux, Wireshark and OWASP ZAP.' },
  { icon: 'chip', title: 'Hardware & IoT', text: 'ESP32, MQTT, Node-RED and embedded systems, from Assembly to VHDL.' },
  { icon: 'code', title: 'Software Development', text: 'Full-stack web apps, REST APIs and AI-integrated systems, from schema to UI.' },
];

export const education = {
  school: 'Universitas Indonesia',
  degree: 'Bachelor of Computer Engineering',
  status: 'Third year',
  date: 'Aug 2024 - Present',
};

// Courses taken so far. `tools` entries use an icon from public/icons when
// `icon` is set, otherwise a line glyph (see components/Icon.jsx).
export const courses = [
  { name: 'Programming Algorithms', local: 'Algoritma Pemrograman', tools: [{ name: 'C++', icon: 'cplusplus' }] },
  { name: 'Basic Programming', local: 'Pemrograman Dasar', tools: [{ name: 'C', icon: 'c' }] },
  {
    name: 'Object-Oriented Programming', local: 'Pemrograman Berorientasi Objek',
    tools: [{ name: 'Java', icon: 'java' }, { name: 'Spring Boot', icon: 'spring' }, { name: 'LibGDX', glyph: 'game' }],
  },
  { name: 'Computer Networks', local: 'Jaringan Komputer', tools: [{ name: 'Cisco', icon: 'cisco' }] },
  { name: 'Network Design & Management', local: 'Desain dan Manajemen Jaringan', tools: [{ name: 'Cisco', icon: 'cisco' }] },
  { name: 'Embedded Systems', local: 'Sistem Embedded', tools: [{ name: 'Assembly', glyph: 'terminal' }] },
  { name: 'Digital System Design', local: 'Perancangan Sistem Digital', tools: [{ name: 'VHDL', glyph: 'chip' }] },
  { name: 'Operating Systems', local: 'Sistem Operasi', tools: [{ name: 'Ubuntu VM', icon: 'ubuntu' }] },
  {
    name: 'Database Systems', local: 'Sistem Basis Data',
    tools: [{ name: 'PostgreSQL', icon: 'postgresql' }, { name: 'SQL', glyph: 'database' }],
  },
  { name: 'Telecommunication Networks', local: 'Jaringan Telekomunikasi', tools: [] },
  {
    name: 'Network Security', local: 'Keamanan Jaringan',
    tools: [
      { name: 'Kali Linux', icon: 'kalilinux' },
      { name: 'OWASP ZAP', icon: 'zap' },
      { name: 'Autoruns', glyph: 'eye' },
      { name: 'Wireshark', icon: 'wireshark' },
    ],
  },
  {
    name: 'Real-Time Systems & IoT', local: 'Sistem Waktu Nyata dan IoT',
    tools: [
      { name: 'Wokwi', glyph: 'cpu' },
      { name: 'ESP32', icon: 'espressif' },
      { name: 'Node-RED', icon: 'nodered' },
      { name: 'MQTT Broker', icon: 'mqtt' },
      { name: 'Blynk', glyph: 'phone' },
    ],
  },
];
