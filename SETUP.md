# Website Ulang Tahun Haris Arianda

Website ini memakai Supabase agar ucapan tersimpan online.

## 1. Buat database
Buat project di Supabase, buka SQL Editor, lalu jalankan isi `schema.sql`.

## 2. Hubungkan website
Buka `config.js` dan ganti:
- `GANTI_DENGAN_SUPABASE_URL`
- `GANTI_DENGAN_SUPABASE_ANON_KEY`

Gunakan URL project dan **anon/publishable key**, bukan service_role key.

## 3. Hosting
Upload seluruh folder ke hosting statis seperti GitHub Pages, Netlify, atau Cloudflare Pages.

File utama:
- `index.html` = halaman teman
- `admin.html` = halaman pribadi
- `assets/haris.jpg` = foto

## 4. Halaman admin
Setelah website online, buka `/admin.html`.

Password demo yang diminta pemilik adalah password yang dimasukkan ke `admin.js`.

### Catatan keamanan penting
Versi ini cocok sebagai prototipe pribadi, tetapi password yang ditulis di JavaScript browser **bukan keamanan tingkat tinggi** karena kode browser dapat dilihat pengunjung yang mengetahui URL admin. Untuk website publik yang benar-benar aman, ganti login admin menjadi **Supabase Auth + Row Level Security**. Jangan pernah menaruh `service_role` key di file website.

## 5. QR Code
Setelah mendapat URL website final, URL tersebut dapat dibuat menjadi QR Code. QR Code tidak mengubah keamanan database; QR hanya mempermudah teman membuka halaman utama.


## Login admin yang aman
Versi terbaru memakai Supabase Auth, bukan password yang ditulis di JavaScript.

1. Di Supabase buka Authentication > Users.
2. Buat user admin dengan email kamu dan password admin yang kamu pilih.
3. Di `schema.sql`, ganti `EMAIL_KAMU` dengan email tersebut.
4. Jalankan ulang SQL di Supabase SQL Editor.
5. Di `admin.html`, login memakai email + password admin itu.

Jangan masukkan password admin ke file HTML/JavaScript dan jangan membagikannya kepada teman.


## Kode undangan
Halaman utama sekarang memiliki kode undangan sebelum formulir ucapan dapat dibuka.

Kode awal:
`HBD26`

Kode ini dapat diubah di `app.js` pada:
`const INVITE_CODE = "HBD26";`

**Catatan keamanan:** kode undangan di JavaScript adalah penghalang akses untuk mencegah orang yang sekadar menemukan URL masuk dengan mudah, tetapi bukan sistem keamanan tingkat tinggi karena kode website publik secara teknis dapat diperiksa. Untuk keamanan yang benar-benar kuat, kode undangan sebaiknya divalidasi di server/Edge Function sebelum menerima ucapan.

`robots.txt` dan `noindex,nofollow` juga ditambahkan agar halaman tidak meminta mesin pencari untuk mengindeksnya. Ini mengurangi kemungkinan ditemukan lewat pencarian, tetapi bukan jaminan bahwa URL tidak akan pernah ditemukan.
