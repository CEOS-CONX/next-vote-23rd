'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { teams, membersByTeam, type TeamName } from '@/mocks/teams';
import { useAuthStore } from '@/stores/auth';
import { PARTS, type PartKey } from '@/constants/part';
import { ERROR_CODES } from '@/constants/error';

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const wasAuthOnMount = useRef(isAuthenticated);

  useEffect(() => {
    if (wasAuthOnMount.current) {
      alert('이미 로그인되어 있습니다!');
      router.replace('/voting');
    }
  }, [router]);

  const [part, setPart] = useState<PartKey>('FRONTEND');
  const [team, setTeam] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameOptions = team ? membersByTeam[team as TeamName] || [] : [];

  const handleTeamChange = (value: string) => {
    setTeam(value);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '이메일 형식이 올바르지 않습니다';
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await signup({ part: PARTS[part].value, team, username: name, userId, email, password });
    if (result.success) {
      router.push('/login');
    } else if (result.errCode === ERROR_CODES.DUPLICATE_USER_ID) {
      setErrors({ userId: result.error || '이미 사용 중인 아이디입니다.' });
    } else if (result.errCode === ERROR_CODES.DUPLICATE_EMAIL) {
      setErrors({ email: result.error || '이미 사용 중인 이메일입니다.' });
    } else {
      setErrors({ userId: result.error || '회원가입에 실패했습니다.' });
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-white" />
      <div className="mx-auto mt-50.25 mb-66.5 w-137.5 max-md:mx-0 max-md:mt-0 max-md:mb-28 max-md:w-auto max-md:pt-7.5">
        <h1 className="font-suite text-headline5 text-black">SIGNUP</h1>
        <div className="mt-3.5 border-b border-black" />

        <form onSubmit={handleSubmit} className="mt-8.25 flex flex-col gap-7.5">
          {/* Part Toggle */}
          <div className="border-foreground flex h-12.75 overflow-hidden rounded-xl border">
            {(Object.keys(PARTS) as PartKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setPart(key)}
                className={`text-subhead flex-1 text-center ${
                  part === key ? 'bg-btn-dark text-white' : 'text-foreground bg-white'
                }`}
              >
                {PARTS[key].display}
              </button>
            ))}
          </div>

          {/* Team & Name Dropdowns */}
          <div className="flex gap-4">
            <Dropdown
              label="팀"
              placeholder="팀을 선택해 주세요"
              options={[...teams]}
              value={team}
              onChange={handleTeamChange}
            />
            <Dropdown
              label="이름"
              placeholder="이름을 선택해 주세요"
              options={nameOptions}
              value={name}
              onChange={setName}
            />
          </div>

          {/* Form Fields */}
          <div className="mt-7.5 flex flex-col max-md:mt-0">
            <Input
              label="아이디"
              placeholder="아이디를 입력해 주세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <div className="h-7.5" />
            <Input
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={errors.email ? 'h-12 max-md:h-7.5' : 'h-7.5'}>
              {errors.email && (
                <div className="mb-3 ml-auto flex h-9 w-92 items-center px-1 pt-2 pb-2 max-md:mb-0 max-md:w-64 max-md:pb-0.5">
                  <p className="text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
                    {errors.email}
                  </p>
                </div>
              )}
            </div>
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="h-7.5" />
            <Input
              label="비밀번호 재확인"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <div className={errors.passwordConfirm ? 'h-9' : 'h-3.75 max-md:h-4.5'}>
              {errors.passwordConfirm && (
                <div className="ml-auto flex w-92 items-center px-1 py-2 max-md:w-64">
                  <p className="text-body2 text-error" style={{ fontFeatureSettings: "'case' on" }}>
                    {errors.passwordConfirm}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="mt-0.5 max-md:-mt-4.75">
            회원가입하기
          </Button>
        </form>
      </div>
    </>
  );
}
