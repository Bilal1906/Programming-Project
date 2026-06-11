import jwt from 'jsonwebtoken';
import db from '@/app/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return Response.json({ fout: 'Geen token' }, { status: 401 });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const stagementor_id = payload.stagementor_id;

    const [stagiairs] = await db.query(`
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
        du.achternaam as docent_achternaam
      FROM stage
      JOIN student s ON stage.student_id = s.id
      JOIN user u ON s.user_id = u.id
      JOIN docent d ON stage.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      WHERE stage.stagementor_id = ?
    `, [stagementor_id]);

    return Response.json(stagiairs);

  } catch (error) {
    return Response.json({ fout: error.message }, { status: 500 });
  }
}