export const lessons = [
  { title: 'Dev, Staging, Production', topic: 'DevOps', path: '', keywords: 'môi trường triển khai development CI CD' },
  { title: 'Auto Layout', topic: 'Thiết kế', path: 'thiet-ke/auto-layout/', keywords: 'figma khoảng cách padding gap bố cục' },
  { title: 'Lịch sử Việt Nam', topic: 'Lịch sử', path: 'lich-su/viet-nam/', keywords: 'vietnam dòng thời gian timeline thời kỳ Văn Lang Âu Lạc Bắc thuộc Ngô Quyền Bạch Đằng Lý Trần Lê Nguyễn Tây Sơn độc lập đổi mới 938 1945 1975 1976 1986' },
  { title: 'Lộ trình lập trình viên', topic: 'Lập trình', path: 'lap-trinh/lo-trinh/', keywords: 'developer roadmap frontend backend web javascript typescript database SQL AI cloud DevOps kiến trúc phần mềm lộ trình' },
  { title: 'Lộ trình DSA', topic: 'Lập trình', path: 'lap-trinh/dsa-roadmap/', keywords: 'data structures algorithms arrays strings linked list stack queue recursion binary search trees heap graphs dynamic programming trie cấu trúc dữ liệu giải thuật thuật toán mảng chuỗi danh sách liên kết ngăn xếp hàng đợi đệ quy tìm kiếm nhị phân cây đồ thị quy hoạch động' },
  { title: '13 cụm từ với time', topic: 'Tiếng Anh', path: 'tieng-anh/cum-tu-voi-time/', keywords: 'english từ vựng thời gian lần trước lần sau one more last next first free waste kill on time take your time' },
  { title: 'Cấu trúc source code Backend', topic: 'Lập trình', path: 'lap-trinh/cau-truc-backend/', keywords: 'node javascript npm source code cây thư mục config controllers middlewares models routes services utils test server package backend cấu trúc' },
  { title: 'SQL cơ bản', topic: 'Lập trình', path: 'lap-trinh/sql-co-ban/', keywords: 'SQL database cơ sở dữ liệu SELECT INSERT UPDATE DELETE CREATE ALTER DROP WHERE LIKE COUNT GROUP BY HAVING truy vấn' },
  { title: 'HTTP Status Codes', topic: 'Lập trình', path: 'lap-trinh/http-status-codes/', keywords: 'API HTTP status code mã trạng thái 200 201 204 301 302 304 400 401 403 404 409 422 429 500 502 503 504 debug' },
  { title: 'Cổng mạng DevOps', topic: 'DevOps', path: 'devops/cong-mang/', keywords: 'network ports cổng mạng HTTP HTTPS SSH FTP MySQL Kubernetes Docker MongoDB NGINX Grafana Prometheus Tomcat Kafka Redis RDP Elasticsearch Jenkins SMTP' },
  { title: 'Các loại mạng', topic: 'DevOps', path: 'devops/cac-loai-mang/', keywords: 'types networks PAN LAN MAN WAN mạng cá nhân cục bộ đô thị diện rộng internet' },
  { title: 'Cấu trúc URL', topic: 'Lập trình', path: 'lap-trinh/cau-truc-url/', keywords: 'URL structure địa chỉ giao thức protocol scheme subdomain domain hostname port path query string fragment điểm neo đường dẫn tên miền cổng HTTPS HTTP' },
];
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

