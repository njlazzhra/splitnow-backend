# SETUP PANDUAN - PRISMA & DATABASE

## ✅ Yang Sudah Berhasil

1. ✅ Prisma client berhasil di-generate
2. ✅ `.env` file sudah dibuat
3. ✅ Semua dependencies sudah terinstall

---

## ❌ Langkah Selanjutnya - Setup Database

### PILIHAN 1: PostgreSQL Lokal (Recommended untuk Development)

#### Windows:
1. Download PostgreSQL dari: https://www.postgresql.org/download/windows/
2. Install dengan installer
3. Saat install, ingat password untuk user `postgres`
4. Buka pgAdmin atau Command Line

#### Membuat Database:
```sql
-- Buka pgAdmin atau psql command line
CREATE DATABASE splitnow;
```

#### Update `.env`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/splitnow"
```

Ganti `YOUR_PASSWORD` dengan password yang Anda set saat install PostgreSQL.

---

### PILIHAN 2: Menggunakan Supabase (Cloud PostgreSQL)

1. Daftar di: https://supabase.com
2. Buat project baru
3. Copy connection string dari Settings → Database
4. Update `.env`:
```
DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
```

---

### PILIHAN 3: Menggunakan Docker

```bash
docker run --name splitnow-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=splitnow -p 5432:5432 -d postgres
```

Lalu update `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/splitnow"
```

---

## 🚀 Setelah Database Siap

Jalankan commands ini:

```bash
# 1. Test koneksi database
npx prisma db push

# 2. Run migrations
npx prisma migrate deploy

# 3. Generate Prisma client (optional, sudah done)
npx prisma generate

# 4. Lihat database dengan Prisma Studio
npx prisma studio

# 5. Start server
npm start
```

---

## 🔧 Troubleshooting

### Error: "Authentication failed against database server"
- Check DATABASE_URL di `.env`
- Pastikan PostgreSQL running
- Pastikan username/password benar
- Pastikan database sudah di-create

### Error: "Could not connect to the database"
- Check host dan port (default: localhost:5432)
- Check firewall settings
- Restart PostgreSQL service

### Error: "relation already exists"
- Database sudah ada migrations, jalankan: `npx prisma migrate deploy`

---

## 📝 File yang Sudah Dibuat

- ✅ `.env` - Environment variables (sudah dibuat)
- ✅ `.env.example` - Template untuk reference
- ✅ Prisma Client sudah di-generate

---

## ✅ Setelah Setup Selesai

Aplikasi siap dijalankan:

```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

Selamat! Aplikasi backend Anda sudah siap! 🎉
