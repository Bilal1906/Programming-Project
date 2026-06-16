import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function PUT(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const body = await request.json()
    const { stage_id, type } = body

    await db.query(
      `UPDATE document SET status = 'ondertekend', ondertekend_op = NOW() WHERE stage_id = ? AND type = ?`,
      [stage_id, type]
    )

    return NextResponse.json({ bericht: 'Document ondertekend!' })

  } catch (error) {
    console.error('Document ondertekenen fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}