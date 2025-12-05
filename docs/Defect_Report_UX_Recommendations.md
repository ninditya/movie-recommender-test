# **Defect Report & UX Recommendations**

## **1. Search Input Tidak Muncul Setelah Login**
**Severity:** High  

### **Behavior**
- Elemen `input[placeholder="Search"]` tidak muncul di DOM setelah login.
- User harus mengetik minimal 1 karakter agar tombol Search aktif.
- Automasi Playwright gagal menemukan locator karena elemen tidak dirender.

### **Expected**
- Search bar muncul otomatis setelah user login tanpa interaksi tambahan.

### **Impact**
- User tidak bisa melakukan pencarian.
- Core feature tidak dapat digunakan tanpa trigger manual.

### **Possible Cause**
- Conditional rendering berdasarkan state query yang belum ter-update.
- State login tidak memicu re-render komponen.
- Search bar ditempatkan hanya pada state/page tertentu.

### **Additional UX Note**
- Pada halaman pertama, tampilkan rekomendasi default: *film dengan rating tertinggi*.

---

## **2. Tidak Semua Label Film Menampilkan Negara**
**Severity:** Medium  

### **Behavior**
- Struktur card film tidak konsisten; beberapa card menampilkan “Country”, sebagian tidak.

### **Expected**
- Semua card memiliki struktur data seragam atau minimal placeholder.

### **Impact**
- Pencarian berdasarkan negara tidak akurat.
- User tidak bisa menilai asal film dengan jelas.

### **Possible Cause**
- API tidak konsisten mengembalikan field `country`.
- UI tidak menampilkan fallback ketika nilai `country` null.

---

## **3. Recommendation Section Tidak Stabil**
**Severity:** Medium  

### **Behavior**
- Rekomendasi AI muncul tidak konsisten meskipun query sama.
- Kadang tampil, kadang hilang.

### **Expected**
- Rekomendasi stabil dan dapat direproduksi.

### **Impact**
- User kehilangan kepercayaan pada fitur AI.

### **Possible Cause**
- Tidak ada fallback error handling.
- Variasi response AI tidak dinormalisasi.
- Tidak ada mekanisme retry saat permintaan gagal.

---

# **Recommendations for UX Improvements**

## **A. Perbaiki Kemunculan Search Bar**
- Hilangkan conditional rendering yang tidak perlu.
- Pastikan state login memicu re-render halaman.
- Tambahkan loader kecil saat UI sedang memuat elemen search bar.

---

## **B. Standarisasi Informasi Film**
Format card konsisten:
- **Title – Genre – Country – Year – Rating**  
- Bila `country` kosong, tampilkan placeholder: **Country: —**
- Tambahkan logging untuk film yang datanya tidak lengkap.

---

## **C. Tingkatkan Akurasi Pencarian Negara**
- Validasi ketersediaan field `country` sebelum menampilkan card.
- Jika sebagian data tidak lengkap, tampilkan notifikasi:
  > “Beberapa data negara tidak tersedia. Hasil dapat kurang akurat.”
- Pertimbangkan menambahkan filter negara berdasarkan data API yang pasti tersedia.

---

## **D. Stabilkan Output Rekomendasi AI**
- Normalisasi teks AI sebelum di-render (lowercase, trim, remove noise).
- Tambahkan fallback:
  > “Rekomendasi belum tersedia. Coba ganti kata kunci.”
- Terapkan local caching:  
  Query yang sama → tampilkan rekomendasi terakhir.

---

