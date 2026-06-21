// scores presentatie opslaan
if (presentatie_scores && Array.isArray(presentatie_scores)) {
  for (const ps of presentatie_scores) {
    const [bestaand] = await db.query(
      'SELECT id FROM evaluatie_presentatie_score WHERE evaluatie_id=? AND criterium_id=?',
      [evaluatie_id, ps.criterium_id]
    )
    if (bestaand.length > 0) {
      await db.query(
        'UPDATE evaluatie_presentatie_score SET score=? WHERE evaluatie_id=? AND criterium_id=?',
        [ps.score ?? null, evaluatie_id, ps.criterium_id]
      )
    } else {
      await db.query(
        'INSERT INTO evaluatie_presentatie_score (evaluatie_id, criterium_id, score) VALUES (?, ?, ?)',
        [evaluatie_id, ps.criterium_id, ps.score ?? null]
      )
    }
  }
}