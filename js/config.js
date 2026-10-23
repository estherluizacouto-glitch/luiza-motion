/* ===================================================================
   ÁREA DE EDIÇÃO — troque só o que está aqui dentro
   =================================================================== */

// 1) Textos que ficam digitando no topo
const ROLES = ["Video Editor", "Motion Designer", "Colorist"];

// 2) Palavras que correm na faixa em movimento
const BAND = ["Editing", "Motion", "Color", "Sound", "VFX", "Storytelling"];

// 3) SEUS VÍDEOS — todos em 9:16 (vertical). Pasta /videos: src = .mp4, poster = capa .jpg (pode ter quantos quiser)
const VIDEOS = [
  { src: "videos/video1.mp4",  poster: "videos/capa1.jpg" },
  { src: "videos/video2.mp4",  poster: "videos/capa2.jpg" },
  { src: "videos/video3.mp4",  poster: "videos/capa3.jpg" },
  { src: "videos/video4.mp4",  poster: "videos/capa4.jpg" },
  { src: "videos/video5.mp4",  poster: "videos/capa5.jpg" },
  { src: "videos/video6.mp4",  poster: "videos/capa6.jpg" },
  { src: "videos/video7.mp4",  poster: "videos/capa7.jpg" }
];

// 4) Ferramentas: nome, nível (0-100) e ícone (pasta /img/icons)
const TOOLS = [
  { name: "Premiere Pro",  pct: 95, icon: "img/icons/adobe-premiere-pro-icon.webp" },
  { name: "After Effects", pct: 90, icon: "img/icons/adobe-after-effects-icon.webp" },
  { name: "Photoshop",     pct: 85, icon: "img/icons/adobe-photoshop-icon.webp" }
];

// 5) Perguntas frequentes
const FAQ = [
  ["What software do you use for editing?", "I mainly use After Effects for motion design and animation, and Premiere Pro for video editing. For design and assets, I use Photoshop and Illustrator."],
  ["How fast will I receive my video?", "It depends on the project. Short videos usually take 1 to 4 days; bigger projects, 3 to 14 days. We agree on the deadline before starting."],
  ["What payment methods do you accept?", "PayPal and Wise. Usually 50% upfront and 50% on delivery."],
  ["Are there any limits on revisions?", "Up to 2 rounds of revisions are included. Extra changes can be agreed on separately."],
  ["What do you need from me to get started?", "Your raw files (footage, audio, logos), a reference for the style you like and your preferred deadline."]
];