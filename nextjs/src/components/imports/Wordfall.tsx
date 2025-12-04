import svgPaths from "./svg-bar39n05xz";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1a2e29] text-[20px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">wordfall</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[28px] relative shrink-0 w-[114.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[28px] items-center relative w-[114.922px]">
        <Icon />
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p28a13700} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2a96b00} id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[36px] left-0 overflow-clip rounded-[16.4px] top-[8px] w-[92.406px]" data-name="Button">
      <Icon1 />
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[20px] left-[58px] not-italic text-[#1a2e29] text-[14px] text-center text-nowrap top-[8px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">作品集</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#6b9e8d] h-[36px] left-[104.41px] overflow-clip rounded-[16.4px] top-[8px] w-[107.203px]" data-name="Button">
      <Icon2 />
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[20px] left-[66.5px] not-italic text-[14px] text-center text-nowrap text-white top-[8px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">新建作品</p>
    </div>
  );
}

function App() {
  return (
    <div className="absolute h-[24px] left-[60px] top-[14px] w-[124.828px]" data-name="App">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[24px] left-[62.5px] not-italic text-[#1a2e29] text-[16px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">test2@gmail.com</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[196.83px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 bg-sky-300 grow h-[36px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <p className="font-['STSong:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-sky-900 tracking-[1.2px] whitespace-pre">TE</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] overflow-clip rounded-[3.35544e+07px] size-[36px] top-[8px]" data-name="Primitive.span">
      <Text />
    </div>
  );
}

function SlotClone() {
  return (
    <div className="absolute h-[52px] left-[223.61px] overflow-clip rounded-[10px] top-0 w-[224.828px]" data-name="SlotClone">
      <App />
      <Icon3 />
      <PrimitiveSpan />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[52px] relative shrink-0 w-[448.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[52px] relative w-[448.438px]">
        <Button />
        <Button1 />
        <SlotClone />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(245, 250, 248) 0%, rgb(245, 250, 248) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none shadow-[0px_4px_12px_0px_rgba(107,125,158,0.15)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[64px] items-center justify-between px-[25px] py-px relative w-full">
          <Container />
          <Container1 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_0px_inset_rgba(255,255,255,0.5),0px_1px_0px_0px_inset_rgba(255,255,255,0.8)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-[39.609px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[39.609px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#1a2e29] text-[12px] text-nowrap top-0 tracking-[1.2px] uppercase whitespace-pre">收藏册</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip rounded-[10px] size-[32px] top-0" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 2V14" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p128dbc60} id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[36px] overflow-clip rounded-[10px] size-[32px] top-0" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[32px] relative shrink-0 w-[68px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68px]">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container3 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p300f1e80} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function DroppableFolder() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[44.406px]" data-name="DroppableFolder">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">收藏夹</p>
    </div>
  );
}

function DroppableFolder1() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableFolder">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">65</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon6 />
      <DroppableFolder />
      <DroppableFolder1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_523)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_523">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableFolder2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[59.203px]" data-name="DroppableFolder">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">最近使用</p>
    </div>
  );
}

function DroppableFolder3() {
  return (
    <div className="absolute h-[16px] left-[231.56px] opacity-50 top-[14px] w-[6.438px]" data-name="DroppableFolder">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[3px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon7 />
      <DroppableFolder2 />
      <DroppableFolder3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f315b00} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function DroppableFolder4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[59.203px]" data-name="DroppableFolder">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">所有内容</p>
    </div>
  );
}

function DroppableFolder5() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableFolder">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">65</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon8 />
      <DroppableFolder4 />
      <DroppableFolder5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[184px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[16px] left-0 opacity-50 top-[8px] w-[52.813px]" data-name="Heading 3">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#1a2e29] text-[12px] text-nowrap top-0 tracking-[1.2px] uppercase whitespace-pre">标签分类</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[218px] overflow-clip rounded-[10px] size-[32px] top-0" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Button7 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[12.125px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">n.</p>
    </div>
  );
}

function DroppableTag1() {
  return (
    <div className="absolute h-[16px] left-[231.56px] opacity-50 top-[14px] w-[6.438px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[3px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon10 />
      <DroppableTag />
      <DroppableTag1 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[11.25px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">v.</p>
    </div>
  );
}

function DroppableTag3() {
  return (
    <div className="absolute h-[16px] left-[231.56px] opacity-50 top-[14px] w-[6.438px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[3px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon11 />
      <DroppableTag2 />
      <DroppableTag3 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[23.656px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">adj.</p>
    </div>
  );
}

function DroppableTag5() {
  return (
    <div className="absolute h-[16px] left-[231.56px] opacity-50 top-[14px] w-[6.438px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[3px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon12 />
      <DroppableTag4 />
      <DroppableTag5 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag6() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[27.109px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">adv.</p>
    </div>
  );
}

function DroppableTag7() {
  return (
    <div className="absolute h-[16px] left-[231.56px] opacity-50 top-[14px] w-[6.438px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[3px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">0</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon13 />
      <DroppableTag6 />
      <DroppableTag7 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_515)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #6B9E8D)" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_515">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b9e8d] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function DroppableTag9() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Bold',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#6b9e8d] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">13</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#e8f4f0] h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon14 />
      <DroppableTag8 />
      <DroppableTag9 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function DroppableTag11() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">27</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon15 />
      <DroppableTag10 />
      <DroppableTag11 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag12() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function DroppableTag13() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">22</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon16 />
      <DroppableTag12 />
      <DroppableTag13 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_497)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #1A2E29)" id="Vector_2" stroke="var(--stroke-0, #1A2E29)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_497">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DroppableTag14() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">生活</p>
    </div>
  );
}

function DroppableTag15() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">14</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Icon17 />
      <DroppableTag14 />
      <DroppableTag15 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[380px] items-start relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[424px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[680px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[680px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container6 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[298px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[298px]">
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(245, 250, 248) 0%, rgb(245, 250, 248) 100%)" }}>
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container11 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_0px_inset_rgba(255,255,255,0.5),0px_1px_0px_0px_inset_rgba(255,255,255,0.8)]" />
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none shadow-[0px_4px_12px_0px_rgba(107,125,158,0.15)]" />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.3%_8.34%_20.83%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.88%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.pa02df80} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_33.33%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d="M15 1L1 15" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_27.08%_37.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-11.76%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M9.5 1H1" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#6b9e8d] opacity-[0.15] relative rounded-[16.4px] shrink-0 size-[44px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[10px] px-[10px] relative size-[44px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1a2e29] text-[18px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">词语联想</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] opacity-50 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">通过修辞手法发现词语的多重可能</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[44px] relative shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[192px]">
        <Heading5 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_505)" id="Icon">
          <path d={svgPaths.p2b60d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 1.33333V4" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 2.66667H12" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p22966600} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_505">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute bg-[#c5dfd6] content-stretch flex items-center justify-center left-[1435px] opacity-50 rounded-[16px] size-[48px] top-0" data-name="Button">
      <Icon19 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#e8f4f0] h-[48px] left-0 rounded-[16px] top-0 w-[1423px]" data-name="Input">
      <div className="box-border content-stretch flex h-[48px] items-center overflow-clip px-[44px] py-[4px] relative rounded-[inherit] w-[1423px]">
        <p className="font-['STSong:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[15px] text-neutral-500 text-nowrap tracking-[1.2px] whitespace-pre">输入一个词语...</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.4">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[1423px]" data-name="Container">
      <Input />
      <Icon20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Button16 />
      <Container16 />
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute bg-[rgba(107,125,158,0.08)] border border-[rgba(107,125,158,0.19)] border-solid h-[26px] left-0 rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#6b7d9e] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">联想</p>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute bg-[rgba(158,107,125,0.08)] border border-[rgba(158,107,125,0.19)] border-solid h-[26px] left-[59.61px] rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#9e6b7d] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">隐喻</p>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-[rgba(212,137,92,0.08)] border border-[rgba(212,137,92,0.19)] border-solid h-[26px] left-[119.22px] rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#d4895c] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">比喻</p>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute bg-[rgba(125,158,158,0.08)] border border-[rgba(125,158,158,0.19)] border-solid h-[26px] left-[178.83px] rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#7d9e9e] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">类比</p>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute bg-[rgba(158,107,139,0.08)] border border-[rgba(158,107,139,0.19)] border-solid h-[26px] left-[238.44px] rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#9e6b8b] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">拟人</p>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute bg-[rgba(139,115,85,0.08)] border border-[rgba(139,115,85,0.19)] border-solid h-[26px] left-[298.05px] rounded-[3.35544e+07px] top-0 w-[51.609px]" data-name="Button">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[25.5px] not-italic text-[#8b7355] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">对比</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="Container">
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[22.5px] left-0 top-0 w-[1483px]" data-name="Paragraph">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[742.19px] not-italic text-[#1a2e29] text-[15px] text-center text-nowrap top-[-1px] tracking-[1.2px] translate-x-[-50%] whitespace-pre">开始你的联想之旅</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[32px] left-[581.5px] opacity-50 top-[30.5px] w-[320px]" data-name="Paragraph">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[160.3px] not-italic text-[#4a6961] text-[12px] text-center top-0 tracking-[0.8px] translate-x-[-50%] w-[300px]">输入任何词语，AI 将通过联想、隐喻、比喻等修辞手法，为你生成富有诗意的关联词汇</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[62.5px] left-0 top-[190px] w-[1483px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container21() {
  return <div className="absolute bg-[#6b9e8d] left-0 opacity-5 rounded-[3.35544e+07px] size-[96px] top-0" data-name="Container" />;
}

function Icon21() {
  return (
    <div className="absolute left-[24px] size-[48px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon" opacity="0.3">
          <path d={svgPaths.p25a8fe80} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M40 4V12" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M44 8H36" id="Vector_3" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p6c07e00} id="Vector_4" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute left-[693.5px] size-[96px] top-[64px]" data-name="Container">
      <Container21 />
      <Icon21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[316.5px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container22 />
    </div>
  );
}

function WordAssociationPanel() {
  return (
    <div className="h-[542.5px] relative shrink-0 w-full" data-name="WordAssociationPanel">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[542.5px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container15 />
          <Container19 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[rgba(248,245,237,0.8)] h-[543.5px] left-0 top-0 w-[1531px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[543.5px] items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] w-[1531px]">
        <WordAssociationPanel />
      </div>
      <div aria-hidden="true" className="absolute border-[#c5dfd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] opacity-60 relative shrink-0 w-[93.047px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[93.047px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a6961] text-[14px] top-0 tracking-[0.8px] w-[94px]">13 个词语碎片</p>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6H14" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 10H14" id="Vector_3" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 2V14" id="Vector_4" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 2V14" id="Vector_5" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[rgba(212,137,92,0.13)] relative rounded-[6.8px] shadow-[0px_0px_0px_1px_rgba(212,137,92,0.25)] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon22 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 3.33333H2.00667" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 8H2.00667" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 12.6667H2.00667" id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 3.33333H14" id="Vector_4" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 8H14" id="Vector_5" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 12.6667H14" id="Vector_6" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[6.8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center justify-center relative w-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute box-border content-stretch flex gap-[2px] h-[34px] items-start left-[72px] pb-px pt-[3px] px-[3px] rounded-[10px] top-0 w-[64px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Button23 />
      <Button24 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip rounded-[10px] size-[32px] top-px" data-name="Button">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[36px] overflow-clip rounded-[10px] size-[32px] top-px" data-name="Button">
      <Icon25 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1a14b300} id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2295f880} id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[140px] overflow-clip rounded-[10px] size-[32px] top-px" data-name="Button">
      <Icon26 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[34px] relative shrink-0 w-[172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[34px] relative w-[172px]">
        <Container25 />
        <Button25 />
        <Button26 />
        <Button27 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[34px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[rgba(248,245,237,0.8)] box-border content-stretch flex flex-col h-[59px] items-start left-0 pb-px pt-[12px] px-[16px] top-[543.5px] w-[1531px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c5dfd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container27 />
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-[#e8f4f0] h-[48px] left-0 rounded-[16.4px] top-0 w-[1423px]" data-name="Input">
      <div className="box-border content-stretch flex h-[48px] items-center overflow-clip pl-[12px] pr-[40px] py-[4px] relative rounded-[inherit] w-[1423px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap tracking-[0.8px] whitespace-pre">输入词语，可用 #标签 添加标签...</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-[#c5dfd6] content-stretch flex items-center justify-center left-[1435px] opacity-50 overflow-clip rounded-[3.35544e+07px] size-[48px] top-0" data-name="Button">
      <Icon27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Button28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[rgba(248,245,237,0.8)] box-border content-stretch flex flex-col h-[97px] items-start left-0 pb-0 pt-[25px] px-[24px] top-[1167px] w-[1531px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c5dfd6] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#ad9e8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.226px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.226px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[23.727px] relative shrink-0 w-[33.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.727px] relative w-[33.246px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.12px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">瞬间</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[25.371px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.447px] h-[25.371px] items-center pl-[0.317px] pr-0 py-0 relative w-full">
          <Container31 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[20.01px] left-0 rounded-[4px] top-[1.52px] w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[20.009px] left-[39.58px] rounded-[4px] top-0 w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[21.53px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[48.01px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.11px] h-[48.01px] items-start pl-0 pr-[0.87px] py-0 relative w-full">
          <Container33 />
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.995px] items-start pb-px pt-[9.492px] px-[13.336px] relative rounded-[10px] w-[103.569px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#8b9ead] relative rounded-[3.35544e+07px] shrink-0 size-[6.042px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.042px]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[22.726px] relative shrink-0 w-[32.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.726px] relative w-[32.563px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.03px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">叠化</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.9px] h-[22.823px] items-center left-[0.16px] pl-[0.058px] pr-0 py-0 top-0 w-[46.562px]" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[rgba(139,158,173,0.08)] h-[18.904px] left-0 rounded-[4px] top-[26.5px] w-[35.739px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b9ead] text-[11px] text-nowrap top-[1.04px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[45.479px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Text3 />
    </div>
  );
}

function DraggableWord1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[63.66px] items-start pb-px pt-[9.091px] px-[13.063px] relative rounded-[10px] w-[72.845px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container39 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#6b7d8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.175px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.175px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[23.451px] relative shrink-0 w-[33.06px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.451px] relative w-[33.06px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.09px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">景深</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.574px] h-[23.867px] items-center left-0 pl-[0.245px] pr-0 py-0 top-0 w-[47.053px]" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[rgba(107,125,139,0.08)] h-[19.704px] left-[0.79px] rounded-[4px] top-[26.81px] w-[36.147px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#6b7d8b] text-[11px] text-nowrap top-[1.18px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[46.513px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Text4 />
    </div>
  );
}

function DraggableWord2() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.276px] items-start pb-px pt-[9.382px] px-[13.261px] relative rounded-[10px] w-[74.248px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#9e8b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.236px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.236px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[23.782px] relative shrink-0 w-[33.283px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.782px] relative w-[33.283px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.18px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">闪回</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.422px] h-[24.344px] items-center left-[0.91px] pl-[0.331px] pr-0 py-0 top-0 w-[47.272px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[rgba(158,139,125,0.08)] h-[20.07px] left-0 rounded-[4px] top-[26.48px] w-[36.329px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#9e8b7d] text-[11px] text-nowrap top-[1.24px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[46.982px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Text5 />
    </div>
  );
}

function DraggableWord3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.011px] items-start pb-px pt-[9.514px] px-[13.351px] relative rounded-[10px] w-[74.883px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#7d8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.135px]" />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[23.597px] relative shrink-0 w-[49.107px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.597px] relative w-[49.107px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.07px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">画外音</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.675px] h-[23.915px] items-center left-0 pl-[0.187px] pr-0 py-0 top-0 w-[63.104px]" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[rgba(125,139,158,0.08)] h-[19.459px] left-[0.6px] rounded-[4px] top-[27.11px] w-[36.023px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#7d8b9e] text-[11px] text-nowrap top-[1.14px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[46.565px] relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Text6 />
    </div>
  );
}

function DraggableWord4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.15px] items-start pb-px pt-[9.293px] px-[13.201px] relative rounded-[10px] w-[90.019px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container51 />
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#ad9e8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.196px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.196px]" />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[23.562px] relative shrink-0 w-[33.134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.562px] relative w-[33.134px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.15px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">胶片</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.523px] h-[24.026px] items-center left-[0.75px] pl-[0.273px] pr-0 py-0 top-0 w-[47.127px]" data-name="Container">
      <Container52 />
      <Container53 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[19.827px] left-0 rounded-[4px] top-[26.49px] w-[36.208px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.05px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.2px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[46.67px] relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Text7 />
    </div>
  );
}

function DraggableWord5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.522px] items-start pb-px pt-[9.426px] px-[13.291px] relative rounded-[10px] w-[74.46px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#8b7d9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.063px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[22.838px] relative shrink-0 w-[32.64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.838px] relative w-[32.64px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.03px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">配乐</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.85px] h-[22.985px] items-center left-0 pl-[0.086px] pr-0 py-0 top-0 w-[46.639px]" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[rgba(139,125,158,0.08)] h-[19.028px] left-[0.28px] rounded-[4px] top-[26.61px] w-[35.803px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b7d9e] text-[11px] text-nowrap top-[1.06px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[45.64px] relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Text8 />
    </div>
  );
}

function DraggableWord6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[63.911px] items-start pb-px pt-[9.136px] px-[13.094px] relative rounded-[10px] w-[73.064px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#9e7d8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.124px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.124px]" />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[23.174px] relative shrink-0 w-[32.87px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.174px] relative w-[32.87px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.09px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">特写</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.7px] h-[23.467px] items-center left-[0.47px] pl-[0.173px] pr-0 py-0 top-0 w-[46.867px]" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[rgba(158,125,139,0.08)] h-[19.398px] left-0 rounded-[4px] top-[26.49px] w-[35.992px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#9e7d8b] text-[11px] text-nowrap top-[1.13px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[46.118px] relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Text9 />
    </div>
  );
}

function DraggableWord7() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.659px] items-start pb-px pt-[9.27px] px-[13.186px] relative rounded-[10px] w-[73.713px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container63 />
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#7d6b8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.256px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.256px]" />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[23.892px] relative shrink-0 w-[33.357px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.892px] relative w-[33.357px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.13px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">剪辑</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.371px] h-[24.503px] items-center left-0 pl-[0.36px] pr-0 py-0 top-0 w-[47.344px]" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[rgba(125,107,139,0.08)] h-[20.192px] left-[1.16px] rounded-[4px] top-[26.95px] w-[36.389px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#7d6b8b] text-[11px] text-nowrap top-[1.26px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[47.137px] relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Text10 />
    </div>
  );
}

function DraggableWord8() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.254px] items-start pb-px pt-[9.558px] px-[13.38px] relative rounded-[10px] w-[75.092px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[#ad8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.206px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.206px]" />
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[24.183px] relative shrink-0 w-[49.365px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24.183px] relative w-[49.365px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.16px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">长镜头</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.498px] h-[24.671px] items-center left-[0.79px] pl-[0.288px] pr-0 py-0 top-0 w-[63.357px]" data-name="Container">
      <Container68 />
      <Container69 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[rgba(173,139,158,0.08)] h-[19.888px] left-0 rounded-[4px] top-[26.48px] w-[36.239px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.05px] not-italic text-[#ad8b9e] text-[11px] text-nowrap top-[1.21px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[47.314px] relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Text11 />
    </div>
  );
}

function DraggableWord9() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.21px] items-start pb-px pt-[9.448px] px-[13.306px] relative rounded-[10px] w-[90.76px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="bg-[#9e7d6b] relative rounded-[3.35544e+07px] shrink-0 size-[6.104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.104px]" />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[23.062px] relative shrink-0 w-[32.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.062px] relative w-[32.794px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.05px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">镜头</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.75px] h-[23.306px] items-center left-0 pl-[0.144px] pr-0 py-0 top-0 w-[46.792px]" data-name="Container">
      <Container72 />
      <Container73 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[rgba(158,125,107,0.08)] h-[19.275px] left-[0.46px] rounded-[4px] top-[26.68px] w-[35.929px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#9e7d6b] text-[11px] text-nowrap top-[1.1px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[45.959px] relative shrink-0 w-full" data-name="Container">
      <Container74 />
      <Text12 />
    </div>
  );
}

function DraggableWord10() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.41px] items-start pb-px pt-[9.226px] px-[13.155px] relative rounded-[10px] w-[73.498px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container75 />
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-[#9e6b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.206px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.206px]" />
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[24.183px] relative shrink-0 w-[49.365px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24.183px] relative w-[49.365px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.16px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">电影院</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[25.111px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.498px] h-[25.111px] items-center pl-[0.288px] pr-0 py-0 relative w-full">
          <Container76 />
          <Container77 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[rgba(158,107,125,0.08)] h-[19.888px] left-0 rounded-[4px] top-0 w-[36.239px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.05px] not-italic text-[#9e6b7d] text-[11px] text-nowrap top-[1.21px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[rgba(158,107,125,0.08)] h-[19.888px] left-[39.59px] rounded-[4px] top-[1.38px] w-[36.239px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.05px] not-italic text-[#9e6b7d] text-[11px] text-nowrap top-[1.21px] tracking-[0.8px] whitespace-pre">生活</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[21.27px] relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[47.754px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.372px] h-[47.754px] items-start pl-[0.791px] pr-0 py-0 relative w-full">
          <Container78 />
          <Container79 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord11() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.65px] items-start pb-px pt-[9.448px] px-[13.306px] relative rounded-[10px] w-[103.361px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container80 />
    </div>
  );
}

function Container81() {
  return (
    <div className="bg-[#7d6b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.052px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.052px]" />
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[22.923px] relative shrink-0 w-[48.804px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.923px] relative w-[48.804px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.04px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">蒙太奇</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.875px] h-[23.046px] items-center left-[0.2px] pl-[0.072px] pr-0 py-0 top-0 w-[62.803px]" data-name="Container">
      <Container81 />
      <Container82 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[rgba(125,107,158,0.08)] h-[18.966px] left-0 rounded-[4px] top-[26.5px] w-[35.771px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#7d6b9e] text-[11px] text-nowrap top-[1.05px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[45.701px] relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Text15 />
    </div>
  );
}

function DraggableWord12() {
  return (
    <div className="box-border content-stretch flex flex-col h-[63.927px] items-start pb-px pt-[9.113px] px-[13.078px] relative rounded-[10px] w-[89.157px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container84 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[63.156px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex h-[70.922px] items-center justify-center left-[-1.17px] top-[-5.9px] w-[106.064px]" style={{ "--transform-inner-width": "103.5625", "--transform-inner-height": "66.984375" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.8deg]">
          <DraggableWord />
        </div>
      </div>
      <div className="absolute flex h-[64.167px] items-center justify-center left-[108.55px] top-[-0.25px] w-[73.288px]" style={{ "--transform-inner-width": "72.84375", "--transform-inner-height": "63.65625" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.4deg]">
          <DraggableWord1 />
        </div>
      </div>
      <div className="absolute flex h-[67.45px] items-center justify-center left-[188.7px] top-[-3.26px] w-[76.152px]" style={{ "--transform-inner-width": "74.234375", "--transform-inner-height": "65.265625" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.3deg]">
          <DraggableWord2 />
        </div>
      </div>
      <div className="absolute flex h-[68.963px] items-center justify-center left-[266.14px] top-[-1.43px] w-[77.471px]" style={{ "--transform-inner-width": "74.875", "--transform-inner-height": "66" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.3deg]">
          <DraggableWord3 />
        </div>
      </div>
      <div className="absolute flex h-[67.176px] items-center justify-center left-[349.73px] top-[-3.04px] w-[91.474px]" style={{ "--transform-inner-width": "90.015625", "--transform-inner-height": "65.140625" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.7deg]">
          <DraggableWord4 />
        </div>
      </div>
      <div className="absolute flex h-[67.955px] items-center justify-center left-[443.85px] top-[-1.18px] w-[76.592px]" style={{ "--transform-inner-width": "74.453125", "--transform-inner-height": "65.515625" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.9deg]">
          <DraggableWord5 />
        </div>
      </div>
      <div className="absolute flex h-[64.673px] items-center justify-center left-[527.12px] top-[-1.14px] w-[73.729px]" style={{ "--transform-inner-width": "73.0625", "--transform-inner-height": "63.90625" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.4deg]">
          <DraggableWord6 />
        </div>
      </div>
      <div className="absolute flex h-[66.188px] items-center justify-center left-[605.85px] top-[-0.75px] w-[75.051px]" style={{ "--transform-inner-width": "73.703125", "--transform-inner-height": "64.65625" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.2deg]">
          <DraggableWord7 />
        </div>
      </div>
      <div className="absolute flex h-[69.467px] items-center justify-center left-[686.92px] top-[-4.82px] w-[77.911px]" style={{ "--transform-inner-width": "75.078125", "--transform-inner-height": "66.25" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.5deg]">
          <DraggableWord8 />
        </div>
      </div>
      <div className="absolute flex h-[69.337px] items-center justify-center left-[765.29px] top-[-1.53px] w-[93.015px]" style={{ "--transform-inner-width": "90.75", "--transform-inner-height": "66.203125" } as React.CSSProperties}>
        <div className="flex-none rotate-[2deg]">
          <DraggableWord9 />
        </div>
      </div>
      <div className="absolute flex h-[65.683px] items-center justify-center left-[864.74px] top-[-1.91px] w-[74.61px]" style={{ "--transform-inner-width": "73.484375", "--transform-inner-height": "64.40625" } as React.CSSProperties}>
        <div className="flex-none rotate-[359deg]">
          <DraggableWord10 />
        </div>
      </div>
      <div className="absolute flex h-[70.217px] items-center justify-center left-[942.29px] top-[-1.75px] w-[105.624px]" style={{ "--transform-inner-width": "103.359375", "--transform-inner-height": "66.640625" } as React.CSSProperties}>
        <div className="flex-none rotate-[2deg]">
          <DraggableWord11 />
        </div>
      </div>
      <div className="absolute flex h-[64.703px] items-center justify-center left-[1054.07px] top-[-0.39px] w-[89.712px]" style={{ "--transform-inner-width": "89.15625", "--transform-inner-height": "63.921875" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.5deg]">
          <DraggableWord12 />
        </div>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[111.156px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[111.156px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container85 />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex flex-col h-[564.5px] items-start left-0 overflow-clip top-[602.5px] w-[1531px]" data-name="Container">
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div className="[grid-area:1_/_2] overflow-clip place-self-stretch relative shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(232, 244, 240) 0%, rgb(232, 244, 240) 100%)" }}>
      <Container24 />
      <Container28 />
      <Container30 />
      <Container87 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#1a2e29] text-[20px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">集合属性</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[16px] opacity-60 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">当前选择</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[48px] items-start left-0 top-0 w-[84.813px]" data-name="Container">
      <Heading1 />
      <Paragraph4 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 2V14" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f176a00} id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[278px] overflow-clip rounded-[10px] size-[32px] top-[8px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Container89 />
      <Button29 />
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[97px] relative shrink-0 w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c5dfd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[97px] items-start pb-px pt-[24px] px-[24px] relative w-[358px]">
        <Container90 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[48.417px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 49">
        <g id="Icon">
          <path d={svgPaths.p1ce57300} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.03471" />
          <path d={svgPaths.p209cc100} fill="var(--fill-0, #6B9E8D)" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.03471" />
        </g>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-[#6b9e8d] content-stretch flex items-center justify-center opacity-10 relative rounded-[3.35544e+07px] size-[96.833px]" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[36px] left-0 top-[136px] w-[310px]" data-name="Heading 3">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[36px] left-[154.8px] not-italic text-[#1a2e29] text-[30px] text-center text-nowrap top-0 tracking-[1.2px] translate-x-[-50%] whitespace-pre">电影</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute h-[24px] left-[126.19px] overflow-clip rounded-[3.35544e+07px] top-[186px] w-[57.609px]" data-name="Badge">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[29.5px] not-italic text-[#6b9e8d] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">标签</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[234px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex items-center justify-center left-[105.74px] size-[97.673px] top-[13.6px]" style={{ "--transform-inner-width": "96.828125", "--transform-inner-height": "96.828125" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.499deg]">
          <Container92 />
        </div>
      </div>
      <Heading6 />
      <Badge />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="bg-[#c5dfd6] h-px opacity-50 shrink-0 w-full" data-name="Primitive.div" />;
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1f315b00} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">词语数量</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon30 />
      <Text16 />
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] top-0 tracking-[1.2px] w-[75px]">13 个词语</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container94 />
      <Container95 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">创建时间</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon31 />
      <Text17 />
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">2024年1月1日</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container97 />
      <Container98 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_448)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_448">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">最后修改</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Text18 />
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">今天</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container100 />
      <Container101 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[184px] items-start relative shrink-0 w-full" data-name="Container">
      <Container96 />
      <Container99 />
      <Container102 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_515)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #6B9E8D)" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_515">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <Icon33 />
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">词语分类统计</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.406px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">电影</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[30.859px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[30.859px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">12</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text19 />
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.406px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">心情</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[24.438px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[24.438px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text20 />
          <Badge2 />
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[108px] items-start relative shrink-0 w-full" data-name="Container">
      <Container104 />
      <Container105 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[148px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container106 />
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[712px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[712px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container93 />
          <PrimitiveDiv />
          <Container103 />
          <PrimitiveDiv />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[358px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[358px]">
        <Container108 />
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="[grid-area:1_/_3] place-self-stretch relative shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(245, 250, 248) 0%, rgb(245, 250, 248) 100%)" }}>
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container91 />
        <Container109 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_0px_inset_rgba(255,255,255,0.5),0px_1px_0px_0px_inset_rgba(255,255,255,0.8)]" />
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none shadow-[0px_4px_12px_0px_rgba(107,125,158,0.15)]" />
    </div>
  );
}

function Container111() {
  return (
    <div className="grid grid-cols-[300px_1531px_minmax(0px,_1fr)] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[1264px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container88 />
      <Container110 />
    </div>
  );
}

function App1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1328px] items-start left-0 overflow-clip top-0 w-[2191px]" data-name="App" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(232, 244, 240) 0%, rgb(232, 244, 240) 100%)" }}>
      <Container2 />
      <Container111 />
    </div>
  );
}

function App2() {
  return <div className="absolute left-0 size-0 top-0" data-name="App" />;
}

export default function Wordfall() {
  return (
    <div className="bg-white relative size-full" data-name="Wordfall">
      <App1 />
      <App2 />
    </div>
  );
}