# ESPORTS MANAGER

Türkçe, koyu temalı espor organizasyon yönetim paneli.

## Kurulum
1. Node.js 20+ kur.
2. Projeyi indir ve klasörü VS Code ile aç.
3. Terminalde `npm install` çalıştır.
4. `npm run dev` komutunu çalıştır.
5. `http://localhost:3000` adresini aç.

## Modüller
- Genel Bakış: takım, oyuncu ve finans özeti.
- Takımlar: kayıt ekleme, düzenleme, silme ve listeleme.
- Oyuncular: profil, takım, oyun ID, rol, iletişim ve ücret bilgileri.
- Muhasebe: gelir/gider, kategori, tutar, tarih ve ödeme durumu.
- İhtiyaç & Envanter: ürün, adet, maliyet, zimmet ve durum takibi.
- Turnuvalar: organizatör, takım, tarih, katılım ücreti, ödül ve derece.
- Sözleşmeler: takım/oyuncu, tarih aralığı, ücret ve belge bağlantısı.
- Hatırlatıcılar: tarihli görev ekleme ve tamamlandı işaretleme.
- Notlar: not ekleme, düzenleme ve silme.
- Ayarlar: organizasyon adı, JSON yedek alma/geri yükleme ve verileri sıfırlama.

## Veri saklama
Bu sürüm kayıtları tarayıcının `localStorage` alanında saklar. Aynı tarayıcı ve cihazda kalıcıdır; cihazlar arasında otomatik senkronizasyon yapmaz. Tarayıcı verilerini temizlemeden önce Ayarlar bölümünden JSON yedeği indir. Supabase istemci dosyası ve SQL şeması projede bulunur ancak mevcut modüller henüz Supabase'e bağlı değildir. Çok kullanıcılı çevrimiçi veritabanı ve kimlik doğrulama için Supabase Auth, proje anahtarları ve güvenli RLS politikaları ayrıca yapılandırılmalıdır.

## Komutlar
- `npm run dev` — geliştirme sunucusu
- `npm run build` — üretim derlemesi
- `npm start` — derlenmiş uygulama
- `npm run lint` — TypeScript kontrolü
