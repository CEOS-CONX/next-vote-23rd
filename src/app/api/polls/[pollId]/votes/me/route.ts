import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_ENDPOINTS } from '@/constants/api';

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(_req: Request, { params }: { params: Promise<{ pollId: string }> }) {
  const { pollId } = await params;
  const accessToken = (await cookies()).get('accessToken')?.value;

  const backendRes = await fetch(
    `${API_BASE_URL}${BACKEND_ENDPOINTS.vote.myVote(Number(pollId))}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    },
  );

  const data = await backendRes.json().catch(() => ({}));
  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message ?? '조회 실패', errCode: data.code ?? data.payload?.errCode },
      { status: backendRes.status },
    );
  }
  return NextResponse.json(data.payload ?? data);
}
