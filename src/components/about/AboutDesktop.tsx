import IconAvatar from '@/assets/icons/icon_avartar.svg';
import IconCupfeedeal from '@/assets/icons/icon_cupfeedeal.svg';
import IconCupfeedealText from '@/assets/icons/icon_cupfeedeal_text.svg';
import { ABOUT_MEMBERS } from '@/constants/about';

export default function AboutDesktop() {
  const [kimHongyeop, ohYujin, kimDohyun, kimTaehee] = ABOUT_MEMBERS;

  return (
    <div className="relative mx-auto min-h-200 max-w-7xl -translate-x-11.25">
      {/* 세로 직사각형 */}
      <div className="absolute top-31 left-[calc(25%-47px)] h-118 w-84 border border-black" />

      {/* 가로 직사각형 */}
      <div className="absolute top-81.75 left-[calc(50%+65px)] flex h-84 w-118.25 items-center justify-center">
        <div className="flex-none -rotate-90">
          <div className="h-118.25 w-84 border border-black" />
        </div>
      </div>

      {/* 모서리 사각형 — 좌상 */}
      <div className="absolute top-28.25 left-[calc(25%-58px)] h-5.5 w-5.5 border border-black" />
      {/* 모서리 사각형 — 좌하 */}
      <div className="absolute top-146.25 left-[calc(25%-58px)] h-5.5 w-5.5 border border-black" />
      {/* 모서리 사각형 — 우상 */}
      <div className="absolute top-146 left-[calc(50%-43px)] h-5.5 w-5.5 border border-black" />
      {/* 모서리 사각형 — 우하 */}
      <div className="absolute top-163.25 left-[calc(100%-114px)] h-5.5 w-5.5 border border-black" />

      {/* 수평선 */}
      <div className="absolute top-81.75 left-[calc(25%+150px)] h-px w-83.75 bg-black" />

      {/* 대각선 */}
      <div className="absolute top-81.75 left-[calc(40%+194px)] flex h-84 w-117.75 items-center justify-center">
        <div className="flex-none rotate-[-35.46deg]">
          <div className="h-px w-144.5 bg-black" />
        </div>
      </div>

      {/* 멤버 1 */}
      <div className="absolute top-13.5 left-[calc(50%-100px)]">
        <IconAvatar className="h-36 w-36" />
      </div>
      <p className="absolute top-35.75 left-[calc(25%-33px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] whitespace-nowrap text-black">
        {kimHongyeop.nameEn} | {kimHongyeop.part}
      </p>
      <div className="absolute top-45.5 left-[calc(25%-24px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] text-black">
        {kimHongyeop.contributions.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {/* 멤버 2 */}
      <div className="absolute top-93 left-[calc(25%-137px)]">
        <IconAvatar className="h-36 w-36" />
      </div>
      <p className="absolute top-93.75 left-[calc(25%+120px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] whitespace-nowrap text-black">
        {ohYujin.nameEn} | {ohYujin.part}
      </p>
      <div className="absolute top-104 left-[calc(25%+248px)] -translate-x-full text-right text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] text-black">
        {ohYujin.contributions.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {/* 멤버 3 */}
      <div className="absolute top-71 left-[calc(25%+315px)]">
        <IconAvatar className="h-36 w-36" />
      </div>
      <p className="absolute top-86 left-[calc(50%+160px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] whitespace-nowrap text-black">
        {kimDohyun.nameEn} | {kimDohyun.part}
      </p>
      <div className="absolute top-96 left-[calc(50%+160px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] text-black">
        {kimDohyun.contributions.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {/* 멤버 4 */}
      <div className="absolute top-124 left-[calc(75%+146px)]">
        <IconAvatar className="h-36 w-36" />
      </div>
      <p className="absolute top-152.75 left-[calc(75%-20px)] text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] whitespace-nowrap text-black">
        {kimTaehee.nameEn} | {kimTaehee.part}
      </p>
      <div className="absolute top-130.25 left-[calc(75%+60px)] text-right text-[20px] leading-[1.35] font-semibold tracking-[-0.02px] text-black">
        {kimTaehee.contributions.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {/* CupfeeDeal 로고 */}
      <div className="absolute top-40.5 left-[calc(50%+132px)]">
        <IconCupfeedeal className="w-19.5" />
      </div>
      <div className="absolute top-47.5 left-[calc(50%+230px)]">
        <IconCupfeedealText className="w-217" />
      </div>
    </div>
  );
}
