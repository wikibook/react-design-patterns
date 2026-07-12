const imageUrl =
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80';

export default function LazyImageExample() {
  return (
    <div>
      <h1>이미지 Lazy Loading</h1>
      <img
        src={imageUrl}
        alt="코드를 작성하는 노트북 화면"
        loading="lazy"
        width={800}
        height={533}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
