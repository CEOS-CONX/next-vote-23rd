'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const wasAuthOnMount = useRef(isAuthenticated);

  useEffect(() => {
    if (wasAuthOnMount.current) {
      alert('이미 로그인되어 있습니다!');
      router.replace('/voting');
    }
  }, [router]);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { id?: string; password?: string } = {};

    if (!id.trim()) {
      newErrors.id = '해당 아이디를 가진 계정이 없습니다.';
    }
    if (!password.trim()) {
      newErrors.password = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(id, password);
    if (result.success) {
      const redirect = searchParams.get('redirect') || '/voting';
      router.push(redirect);
    } else {
      setErrors({ id: result.error || '로그인에 실패했습니다.' });
    }
  };

  return (
    <div className="mx-auto w-137.5 pt-40 max-md:mx-0 max-md:w-auto max-md:pt-7.5">
      <h1 className="font-suite text-headline5 text-black">LOGIN</h1>
      <div className="mt-3.5 border-b border-black" />

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
        <Input
          placeholder="아이디를 입력해 주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <div className={errors.id ? 'h-9.5' : 'h-4.75'}>
          {errors.id && (
            <div className="flex h-9.5 items-center py-2 max-md:pl-2">
              <p className="text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
                {errors.id}
              </p>
            </div>
          )}
        </div>
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={errors.password ? 'h-13.75' : 'h-9'}>
          {errors.password && (
            <div className="flex h-9.5 items-center py-2 max-md:pl-2">
              <p className="text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
                {errors.password}
              </p>
            </div>
          )}
        </div>

        <Button type="submit">로그인하기</Button>

        <div
          className="text-body1 text-placeholder mt-4.75 text-center underline"
          style={{ fontFeatureSettings: "'case' on" }}
        >
          <p className="hidden max-md:block">아직 계정이 없나요?</p>
          <Link href="/signup">
            <span className="inline max-md:hidden">아직 계정이 없나요? </span>
            회원가입하러 가기
          </Link>
        </div>
      </form>
    </div>
  );
}
