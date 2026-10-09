export const lessons = [
  { title: 'Dev, Staging, Production', topic: 'DevOps', path: '', keywords: 'môi trường triển khai development CI CD' },
  { title: 'Auto Layout', topic: 'Thiết kế', path: 'thiet-ke/auto-layout/', keywords: 'figma khoảng cách padding gap bố cục' },
];
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
