import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: '리프레시 토큰이 없습니다.' }, { status: 401 });
  }

  if (!API_BASE_URL) {
    return NextResponse.json({ message: '백엔드 미연동 상태입니다.' }, { status: 501 });
  }

  // 추후 백엔드 refresh 엔드포인트 연동
  // const backendRes = await fetch(`${API_BASE_URL}/reissue`, {
  //   method: 'POST',
  //   headers: { Cookie: `refreshToken=${refreshToken}` },
  // });

  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}
