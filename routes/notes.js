const express = require('express');
const db = require('../config/db');

const router = express.Router();
const validDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d);

// GET /api/notes -> semua catatan, terbaru di atas
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, title, content, note_date, created_at, updated_at FROM notes ORDER BY note_date DESC, id DESC');
    res.json({ notes: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Gagal mengambil catatan.' });
  }
});

// POST /api/notes  { title, content, note_date }
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note_date = req.body.note_date || new Date().toISOString().slice(0, 10);
    if (!title || !content) return res.status(400).json({ message: 'Judul dan isi catatan wajib diisi.' });
    if (!validDate(note_date)) return res.status(400).json({ message: 'Format tanggal harus YYYY-MM-DD.' });
    const [r] = await db.query('INSERT INTO notes (title, content, note_date) VALUES (?, ?, ?)', [title, content, note_date]);
    res.status(201).json({ message: 'Catatan disimpan.', id: r.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Gagal menyimpan catatan.' });
  }
});

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, content, note_date } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Judul dan isi catatan wajib diisi.' });
    if (note_date && !validDate(note_date)) return res.status(400).json({ message: 'Format tanggal harus YYYY-MM-DD.' });
    const [r] = await db.query('UPDATE notes SET title = ?, content = ?, note_date = COALESCE(?, note_date) WHERE id = ?', [title, content, note_date || null, req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Catatan tidak ditemukan.' });
    res.json({ message: 'Catatan diperbarui.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Gagal memperbarui catatan.' });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const [r] = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Catatan tidak ditemukan.' });
    res.json({ message: 'Catatan dihapus.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Gagal menghapus catatan.' });
  }
});

module.exports = router;
