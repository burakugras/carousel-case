# Ebebek Ürün Karuseli Tasarımı

Bu proje, Ebebek ana sayfasındaki ürün karuseline birebir benzeyen bir karusel oluşturmayı amaçlamaktaydı. Karusel, önerilen ürünleri listeleyerek kullanıcı deneyimini geliştirmeyi hedeflendi.

## 🚀 Proje Özellikleri

- **Ürün Verisi:** Ürünler, aşağıdaki API üzerinden çekildi:
  ```
  https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json
  ```

- **Karusel Özellikleri:**
  - "Beğenebileceğinizi düşündüklerimiz" başlığı ile gösterildi.
  - Kullanıcıların, sağa/sola kaydırarak ürünleri inceleyebilmesi sağlandı.
  - Ürünlere tıklandığında, yeni sekmede açıldı.
  - "price" ve "original_price" farklı olduğunda, her iki fiyat da gösterildi ve indirim miktarı hesaplanarak gösterildi.
  - Kalp simgesine tıklandığında turuncu renge dönüştü ve favorilere eklendi.

- **Favoriler:**
  - Kullanıcı tercihleri `localStorage` içinde saklandı.
  - Sayfa yenilendiğinde favori ürünler tekrar yüklendi.
  - Sayfa ikinci kez yüklendiğinde, ürün listesi doğrudan `localStorage`'dan alındı.

- **Sayfa Kontrolü:**
  - Kod yalnızca ana sayfada çalıştı.
  - Kullanıcı başka bir sayfadaysa konsola "wrong page" mesajı yazdırıldı.

- **Duyarlı Tasarım:**
  - Mobil, tablet ve masaüstü cihazlara uyumlu hale getirildi.
  - Görülebilen ürün sayısı ekran boyutuna göre değiştirildi.

## 📌 Kullanılan Teknolojiler

- **JavaScript** (Vanilla JS & jQuery)
- **HTML & CSS** (Dinamik olarak JavaScript ile oluşturuldu.)

## 📂 Proje Kurulumu

1. Bu repository klonlandı:
   ```sh
   git clone https://github.com/burakugras.git
   ```

2. Proje dizinine gidildi:
   ```sh
   cd carousel-case
   ```

## 🎯 Kullanım

- Sayfa yüklendiğinde önerilen ürünler görüntülendi.
- Ok düğmeleri ile karusel kaydırılması sağlandı
- Ürüne tıklandığında yeni sekmede açıldı.
- Favorilere eklenen ürünler, sayfa yenilendiğinde korundu.
- Sayfa ana sayfa değilse, "wrong page" mesajı konsola yazdırıldı.

## 📜 Kurallar

- **Tek bir .js dosyası** kullanıldı.
- **Kod okunabilir** ve düzenli hale getirildi.
- **3. parti kütüphaneler (Swiper, Bootstrap vb.) kullanılmadı.**
- **Kod Chrome Developer Tools konsolunda çalıştırılabilir şekilde yazıldı.**
- **HTML ve CSS yapıları JavaScript ile oluşturuldu.**

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isteyenler **pull request** açabilir veya önerilerini paylaşabilir.

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atılabilir.
