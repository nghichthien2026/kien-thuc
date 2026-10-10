export const lessons = [
  { title: 'Dev, Staging, Production', topic: 'DevOps', path: '', keywords: 'môi trường triển khai development CI CD' },
  { title: 'Auto Layout', topic: 'Thiết kế', path: 'thiet-ke/auto-layout/', keywords: 'figma khoảng cách padding gap bố cục' },
  { title: 'Lịch sử Việt Nam', topic: 'Lịch sử', path: 'lich-su/viet-nam/', keywords: 'vietnam dòng thời gian timeline thời kỳ Văn Lang Âu Lạc Bắc thuộc Ngô Quyền Bạch Đằng Lý Trần Lê Nguyễn Tây Sơn độc lập đổi mới 938 1945 1975 1976 1986' },
  { title: 'Lộ trình lập trình viên', topic: 'Lập trình', path: 'lap-trinh/lo-trinh/', keywords: 'developer roadmap frontend backend web javascript typescript database SQL AI cloud DevOps kiến trúc phần mềm lộ trình' },
  { title: 'Lộ trình DSA', topic: 'Lập trình', path: 'lap-trinh/dsa-roadmap/', keywords: 'data structures algorithms arrays strings linked list stack queue recursion binary search trees heap graphs dynamic programming trie cấu trúc dữ liệu giải thuật thuật toán mảng chuỗi danh sách liên kết ngăn xếp hàng đợi đệ quy tìm kiếm nhị phân cây đồ thị quy hoạch động' },
];
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

