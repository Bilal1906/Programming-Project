import jwt from 'jsonwebtoken';
import db from '@/app/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit';

export async function GET(request, { params }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return Response.json({ fout: 'Geen token' }, { status: 401 });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const stagementor_id = payload.stagementor_id;
    const stage_id = params.id;

    const [rows] = await db.query(`
      SELECT 
        u.voornaam,
        u.achternaam,
        u.email,
        u.telefoon,
        s.opleiding,
        s.academiejaar,
        stage.id as stage_id,
        stage.startdatum,
        stage.einddatum,
        stage.aantal_weken,
        stage.status,
        du.voornaam as docent_voornaam,
        du.achternaam as docent_achternaam,
        b.naam as bedrijf_naam
      FROM stage
      JOIN student s ON stage.student_id = s.id
      JOIN user u ON s.user_id = u.id
      JOIN docent d ON stage.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      JOIN stagementor sm ON stage.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      WHERE stage.id = ? AND stage.stagementor_id = ?
    `, [stage_id, stagementor_id]);

    if (rows.length === 0) {
      return Response.json({ fout: 'Niet gevonden' }, { status: 404 });
    }

    return Response.json(rows[0]);

  } catch (error) {
    return Response.json({ fout: error.message }, { status: 500 });
  }
}