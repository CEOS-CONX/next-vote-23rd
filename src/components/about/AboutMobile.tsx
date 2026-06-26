import IconCupfeedeal from '@/assets/icons/icon_cupfeedeal.svg';
import { ABOUT_MEMBERS } from '@/constants/about';

const caseOn = { fontFeatureSettings: "'case' on" } as const;

export default function AboutMobile() {
  const [kimHongyeop, ohYujin, kimDohyun, kimTaehee] = ABOUT_MEMBERS;

  return (
    <div className="px-5 pb-20">
      {/* MADE BY. 타이틀 */}
      <div className="relative top-14 w-fit">
        <div className="absolute bottom-0 left-[-6] h-10.75 w-30.25 bg-[#E3E8F5]" />
        <h1 className="font-suite text-headline1 relative text-black">MADE BY.</h1>
      </div>

      {/* 레이아웃 */}
      <div className="relative mt-10.75 h-128.25">
        {/* 세로 직사각형 */}
        <div className="absolute top-10.75 left-[calc(25%+43.5px)] h-79.75 w-53.25 border border-black" />

        {/* 가로 직사각형 */}
        <div className="absolute top-65.75 left-3.75 h-68 w-53.25 border border-black" />

        {/* 김홍엽 */}
        <div className="absolute top-12 left-[calc(25%+15.5px)] flex h-38.25 w-5.5 items-center justify-center">
          <p
            className="flex-none -rotate-90 text-[16px] leading-[1.4] font-bold tracking-[-0.016px] whitespace-nowrap text-black"
            style={caseOn}
          >
            {kimHongyeop.nameEn} | {kimHongyeop.part}
          </p>
        </div>

        <div
          className="absolute top-13.75 left-[calc(25%+64.5px)] text-[14px] leading-[1.4] font-medium tracking-[-0.014px] text-black"
          style={caseOn}
        >
          {kimHongyeop.contributions.map((item) => (
            <p key={item} className="mb-1.25">
              {item}
            </p>
          ))}
        </div>

        {/* 오유진 */}
        <p
          className="absolute top-47.25 left-[calc(50%+45px)] text-[16px] leading-[1.4] font-bold tracking-[-0.016px] whitespace-nowrap text-black"
          style={caseOn}
        >
          {ohYujin.nameEn} | {ohYujin.part}
        </p>

        <div className="absolute top-54.25 left-[calc(50%+22px)] h-px w-36.5 bg-black" />

        <div
          className="absolute top-57.75 left-[calc(75%+10px)] text-right text-[14px] leading-[1.4] font-medium tracking-[-0.014px] text-black"
          style={caseOn}
        >
          {ohYujin.contributions.map((item) => (
            <p key={item} className="mb-1.25">
              {item}
            </p>
          ))}
        </div>

        {/* CupfeeDeal 아이콘 */}
        <div className="absolute top-72.5 left-[calc(25%+71.5px)]">
          <IconCupfeedeal className="w-14" />
        </div>

        {/* 김도현 */}
        <p
          className="absolute top-97.5 left-6 text-[16px] leading-[1.4] font-bold tracking-[-0.016px] whitespace-nowrap text-black"
          style={caseOn}
        >
          {kimDohyun.nameEn} | {kimDohyun.part}
        </p>

        <div className="absolute top-104.5 left-4 h-px w-43 bg-black" />

        <div
          className="absolute top-76.5 left-10.5 text-[16px] leading-[1.4] font-medium tracking-[-0.016px] text-black"
          style={caseOn}
        >
          {kimDohyun.contributions.map((item) => (
            <p key={item} className="mb-1.25">
              {item}
            </p>
          ))}
        </div>

        {/* 김태희 */}
        <div className="absolute top-99.75 left-[calc(50%+57px)] flex h-34 w-5.5 items-center justify-center">
          <p
            className="flex-none rotate-90 text-[16px] leading-[1.4] font-bold tracking-[-0.016px] whitespace-nowrap text-black"
            style={caseOn}
          >
            {kimTaehee.nameEn} | {kimTaehee.part}
          </p>
        </div>

        <div
          className="absolute top-109.25 left-[calc(25%+54px)] text-right text-[16px] leading-[1.4] font-medium tracking-[-0.016px] text-black"
          style={caseOn}
        >
          {kimTaehee.contributions.map((item) => (
            <p key={item} className="mb-1.25">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
