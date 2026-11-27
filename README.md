# ESPORTS MANAGER

PUBG esports organizasyonun için Türkçe, koyu temalı, mobil uyumlu yönetim paneli başlangıç projesi.

## İçerik
- Next.js uygulama iskeleti
- Responsive koyu tema dashboard
- Takım oluşturma arayüzü (şu an demo/local state)
- Supabase istemci bağlantı noktası
- Takımlar, oyuncular, muhasebe, envanter, hatırlatıcılar, notlar, turnuvalar ve sözleşmeler için SQL şeması

## Yerel çalıştırma
1. Node.js 20+ kurun.
2. Proje klasöründe `npm install` çalıştırın.
3. `.env.example` dosyasını `.env.local` olarak kopyalayın.
4. Supabase proje URL ve anon key değerlerini girin.
5. `npm run dev` çalıştırın ve `http://localhost:3000` adresini açın.

## Online yayın
Önerilen yayın: Vercel + Supabase.
- Supabase'te yeni proje açın.
- `supabase/schema.sql` dosyasını SQL Editor'da çalıştırın.
- Supabase Auth ile tek yönetici hesabını kurun.
- RLS politikalarını yalnızca bu yönetici hesabına izin verecek şekilde tamamlayın.
- Vercel'e GitHub üzerinden projeyi aktarın ve iki `NEXT_PUBLIC_SUPABASE_*` ortam değişkenini ekleyin.

## Güvenlik notu
Bu paket bir başlangıç iskeletidir; henüz canlıya alınmış bir site değildir. Takım/oyuncu/finans kayıt ekranları, Supabase CRUD bağlantıları, yönetici girişi, dosya yükleme ve yedekleme sonraki geliştirme adımlarında tamamlanmalıdır. RLS güvenliği tamamlanmadan gerçek verileri girmeyin. Supabase `service_role` anahtarını asla tarayıcıya veya `NEXT_PUBLIC_` değişkenine koymayın.
