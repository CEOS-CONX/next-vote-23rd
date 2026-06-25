import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ENDPOINTS } from '@/constants/api';

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${API_BASE_URL}${BACKEND_ENDPOINTS.auth.signup}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!backendRes.ok) {
    const error = await backendRes.json().catch(() => ({ message: '회원가입에 실패했습니다.' }));
    const errCode = error.code ?? error.payload?.errCode ?? null;
    const message = error.message ?? error.payload?.errMessage ?? '회원가입에 실패했습니다.';
    return NextResponse.json({ message, errCode }, { status: backendRes.status });
  }

  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json({ message: data.message ?? '회원가입이 완료되었습니다.' });
}
