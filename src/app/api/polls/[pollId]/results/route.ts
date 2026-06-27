import { NextResponse } from 'next/server';
import { BACKEND_ENDPOINTS } from '@/constants/api';

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(_req: Request, { params }: { params: Promise<{ pollId: string }> }) {
  const { pollId } = await params;
  const backendRes = await fetch(
    `${API_BASE_URL}${BACKEND_ENDPOINTS.vote.results(Number(pollId))}`,
    { cache: 'no-store' },
  );
  const data = await backendRes.json();
  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message ?? '결과 조회 실패', errCode: data.code },
      { status: backendRes.status },
    );
  }
  return NextResponse.json(data.payload);
}
