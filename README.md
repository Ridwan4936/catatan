# Catatan Harian

Aplikasi catatan sehari-hari. Stack: Node.js + Express + MySQL (Aiven).

## Fitur
- Tambah, lihat, ubah, hapus catatan (CRUD)
- Catatan dikelompokkan per hari, ada pencarian
- Semua data disimpan di database MySQL

## Struktur proyek
```
server.js            entry point
config/db.js         koneksi database
routes/notes.js      endpoint CRUD catatan
public/index.html    tampilan web
schema.sql           struktur tabel notes
```

## Menjalankan di komputer
1. `npm install`
2. Salin `.env.example` menjadi `.env`, isi data dari halaman service MySQL di Aiven.
3. Jalankan isi `schema.sql` di MySQL Workbench / DBeaver (pada database yang sama dengan DB_NAME).
4. `npm start`, lalu buka http://localhost:3000

## Endpoint API
| Method | Path |
|---|---|
| GET | /api/notes |
| POST | /api/notes |
| PUT | /api/notes/:id |
| DELETE | /api/notes/:id |

## Deploy (contoh: Render)
1. Upload ke GitHub (`.env` tidak ikut, sudah di `.gitignore`).
2. Render: New > Web Service > pilih repo. Build command `npm install`, start command `npm start`.
3. Isi variabel DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL di menu Environment.
4. Di Aiven, pastikan service MySQL berstatus Running dan akses dari Render diizinkan.
5. Link dari Render dipakai sebagai link website di laporan.
