import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ENDPOINTS } from '@/constants/api';

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${API_BASE_URL}${BACKEND_ENDPOINTS.auth.login}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!backendRes.ok) {
    const error = await backendRes.json().catch(() => ({ message: '로그인에 실패했습니다.' }));
    const errCode = error.code ?? error.payload?.errCode ?? null;
    const message = error.message ?? error.payload?.errMessage ?? '로그인에 실패했습니다.';
    return NextResponse.json({ message, errCode }, { status: backendRes.status });
  }

  const accessToken = backendRes.headers.get('Authorization')?.replace('Bearer ', '');
  const setCookie = backendRes.headers.get('Set-Cookie');
  const refreshToken = setCookie?.match(/refreshToken=([^;]+)/)?.[1];
  const data = await backendRes.json().catch(() => ({}));
  const user = data.payload;
  const res = NextResponse.json({ user });

  res.cookies.set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  if (accessToken) {
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 30,
    });
  }

  if (refreshToken) {
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}
