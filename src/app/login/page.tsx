'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = '해당 아이디를 가진 계정이 없습니다.';
    }
    if (!password.trim()) {
      newErrors.password = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
  };

  return (
    <div className="mx-auto w-[550px] pt-40 max-md:mx-0 max-md:w-auto max-md:pt-6">
      <h1 className="font-suite text-headline5 text-black">LOGIN</h1>
      <div className="mt-3 border-b border-black" />

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-[19px]">
        <Input
          placeholder="아이디를 입력해 주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="mt-4">
          <Button type="submit">로그인하기</Button>
        </div>

        <div
          className="text-body1 text-placeholder mt-2 text-center underline"
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
