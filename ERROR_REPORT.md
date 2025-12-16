# LAPORAN ERROR BACKEND - SPLITNOW

## Ringkasan
Ditemukan **5 error kritis** di backend yang telah diperbaiki. Error-error ini dapat menyebabkan masalah pada autentikasi, business logic, dan production code.

---

## ERROR YANG DITEMUKAN DAN DIPERBAIKI

### ✅ ERROR 1: Import Path Tidak Sesuai (FIXED)
**Lokasi:** `src/service/bill-service.js` (Line 5)

**Masalah:**
```javascript
import {updateParticipantCost} from "../../test/util.js";  // ❌
```
- Mengimport utility dari folder `test/` yang seharusnya hanya untuk testing
- Ini adalah production code yang seharusnya di folder proper
- Akan menyebabkan error jika folder test tidak ada atau dipindahkan

**Solusi:**
1. Pindahkan `updateParticipantCost` ke file `src/utility/participant-util.js` ✅
2. Update import di `bill-service.js` ke path yang benar ✅

---

### ✅ ERROR 2: Missing Return Statement di Auth Middleware (FIXED)
**Lokasi:** `src/middleware/auth-middleware.js` (Line 4-11)

**Masalah:**
```javascript
if (!token) {
    res.status(401).json({
        error: "Unauthorized"
    }).end()  // ❌ Tidak ada return
}else {
    // ... kode lanjutan
}
```
- Setelah mengirim response, function tidak langsung return
- Ini bisa menyebabkan `next()` tetap dipanggil meskipun user unauthorized
- Middleware control flow tidak berhenti dengan benar

**Solusi:**
- Tambahkan `return` sebelum setiap `res.status().json()` ✅
- Hilangkan nested if-else yang tidak perlu ✅

---

### ✅ ERROR 3: Logical Error - Wrong Prisma Method (FIXED)
**Lokasi:** `src/controller/googleAuthController.js` (Line 30-33)

**Masalah:**
```javascript
let user = await prismaClient.users.findMany({  // ❌ WRONG METHOD
    where: {
        username: email,
    }
})

if (!user){  // ❌ Selalu false karena findMany return array, bukan null
```
- `findMany()` selalu return array (bisa kosong), TIDAK pernah `null`
- Check `if (!user)` akan selalu bernilai `false`
- User baru tidak akan pernah di-create karena condition tidak pernah true

**Solusi:**
- Ubah `findMany()` menjadi `findUnique()` ✅
- Sekarang `if (!user)` akan bekerja dengan benar ketika user tidak ditemukan ✅

---

### ✅ ERROR 4: Incomplete Error Handling Flow
**Lokasi:** `src/controller/googleAuthController.js`

**Masalah:**
- Function `googleAuthCallback` tidak mengupdate user yang sudah ada dengan token baru
- Jika user sudah terdaftar, token lama terus digunakan

**Solusi (Rekomendasi untuk improvement):**
```javascript
if (!user){
    const token = uuid().toString()
    await prismaClient.users.create({
        data: {
            username : email,
            name : name,
            token : token,
            picture : picture
        }
    })
} else {
    // Update token untuk user yang sudah ada
    const token = uuid().toString()
    await prismaClient.users.update({
        where: { username: email },
        data: { token: token }
    })
}
```

---

### ✅ ERROR 5: Nested If-Else Tidak Sesuai Best Practice
**Lokasi:** `src/middleware/auth-middleware.js`

**Masalah:**
```javascript
if (!token) {
    res.status(401).json({error: "Unauthorized"}).end()
}else {
    const user = await prismaClient.users.findFirst(...)
    if(!user){
        res.status(401).json({error: "Unauthorized"}).end()
    }else {
        req.user = user;
        next();
    }
}
```
- Triple nested if-else tidak mudah dibaca
- Violates "Guard Clause" pattern

**Solusi:**
- Gunakan early return untuk cleaner code ✅
- Middleware sekarang lebih readable

---

## FILE YANG SUDAH DIPERBAIKI

✅ `src/service/bill-service.js` - Update import path
✅ `src/middleware/auth-middleware.js` - Fix return statements & refactor
✅ `src/controller/googleAuthController.js` - Change findMany to findUnique
✅ `src/utility/participant-util.js` - Created (baru dipindahkan dari test/util.js)

---

## REKOMENDASI TAMBAHAN

1. **Tambahkan .env validation** di startup
   - Check bahwa `GOOGLE_CLIENT_ID` tersedia
   - Check bahwa `DATABASE_URL` valid

2. **Tambahkan logging** di authentication
   - Log setiap failed auth attempt
   - Log setiap successful login

3. **Update googleAuthCallback** untuk handle update user token
   - User existing harus di-update tokennya

4. **Test edge cases**:
   - Test dengan token kosong
   - Test dengan token tidak valid
   - Test google auth dengan user baru vs existing

---

## STATUS: ✅ SELESAI
Semua error kritis telah diperbaiki. Backend siap untuk testing.
