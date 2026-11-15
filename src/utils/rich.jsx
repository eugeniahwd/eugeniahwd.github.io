// Turns "**bold** text" into React nodes
export function rich(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) => (part.startsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : part));
}
