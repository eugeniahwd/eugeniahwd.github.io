# Eugenia's Portfolio

Website portofolio pribadi, dibuat dengan React + Vite dan di-deploy ke GitHub Pages.

## Menjalankan di komputer

```bash
npm install      # sekali saja
npm run dev      # buka http://localhost:5173
npm run build    # hasil build ada di folder dist/
```

## Mengubah isi website

Semua teks dan data ada di `src/data/`, jadi tidak perlu menyentuh kode tampilan:

| File | Isi |
|---|---|
| `profile.js` | Nama, judul di animasi terminal, email, link sosial, foto profil, bagian "Right now" |
| `about.js` | Paragraf About, 4 bidang fokus, data kampus, daftar mata kuliah |
| `experience.js` | Pengalaman kerja & organisasi |
| `projects.js` | Proyek (judul, deskripsi, gambar, tech stack, detail) |
| `skills.js` | Kelompok skill & tools, hard/soft skills |
| `certifications.js` | Sertifikat & link kredensial |
| `pages.js` | Daftar halaman & urutan navigasi |

### Mengganti foto
1. Taruh foto di `public/images/` (foto profil) atau `public/images/projects/` (foto proyek).
2. Ubah path-nya di `src/data/profile.js` (`photo`) atau `src/data/projects.js` (`image`).

### Menambah logo tools
Taruh file `.svg` di `public/icons/`, lalu tulis nama filenya (tanpa `.svg`) di field `icon`.

## Deploy ke GitHub Pages

1. Buat repo **publik** bernama `eugeniahwd.github.io`.
2. Push folder ini ke branch `main`.
3. Di repo: **Settings → Pages → Source: GitHub Actions**.
4. Setiap push ke `main` akan otomatis build & deploy ke https://eugeniahwd.github.io

Kalau nama repo-nya lain (mis. `portfolio`), ubah `base` di `vite.config.js` menjadi `'/portfolio/'`.

> File PDF (CV, dll.) sudah dikecualikan lewat `.gitignore` supaya tidak ikut ter-upload.
