# Deniz Group Taşımacılık kurumsal web sitesi

Deniz Group Taşımacılık için hazırlanan, Cloudflare Pages üzerinde yayınlanan statik kurumsal site.

## Yapı

- `index.html`: Semantik tek sayfa kurumsal içerik ve yapılandırılmış veri
- `styles.css`: Responsive tasarım sistemi
- `script.js`: Mobil menü, görünürlük animasyonları, SSS ve WhatsApp teklif akışı
- `assets/`: Marka ve operasyon görselleri
- `_headers`: Cloudflare güvenlik ve önbellek başlıkları

## Yerel önizleme

```sh
python3 -m http.server 4173
```

Ardından `http://localhost:4173` adresi açılır.

## Yayın

`main` dalına gönderilen değişiklikler, bağlı Cloudflare Pages projesi tarafından otomatik olarak yayınlanır. Bu alan adı önizleme amacıyla kullanıldığı için arama motoru indekslemesi kapalıdır.
