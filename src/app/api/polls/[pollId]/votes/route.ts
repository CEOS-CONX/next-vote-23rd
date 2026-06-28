import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_ENDPOINTS } from '@/constants/api';

const API_BASE_URL = process.env.API_BASE_URL;

async function forward(pollId: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  const backendRes = await fetch(`${API_BASE_URL}${BACKEND_ENDPOINTS.vote.votes(Number(pollId))}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await backendRes.json().catch(() => ({}));
  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message ?? '요청 실패', errCode: data.code ?? data.payload?.errCode },
      { status: backendRes.status },
    );
  }
  return NextResponse.json(data.payload ?? data);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ pollId: string }> }) {
  const { pollId } = await params;
  const body = await req.json();
  return forward(pollId, 'POST', body); // 첫 투표
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ pollId: string }> }) {
  const { pollId } = await params;
  const body = await req.json();
  return forward(pollId, 'PATCH', body); // 재투표
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ pollId: string }> },
) {
  const { pollId } = await params;
  return forward(pollId, 'DELETE'); // 투표 취소
}
