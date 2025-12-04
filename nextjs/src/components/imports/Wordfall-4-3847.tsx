import svgPaths from "./svg-vfhmg8cd4p";

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

function DroppableTag8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function DroppableTag9() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#1a2e29] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">13</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
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

function DroppableTag10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[12px] w-[29.609px]" data-name="DroppableTag">
      <p className="font-['Songti_SC:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b9e8d] text-[14px] text-center text-nowrap tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function DroppableTag11() {
  return (
    <div className="absolute h-[16px] left-[225.14px] opacity-50 top-[14px] w-[12.859px]" data-name="DroppableTag">
      <p className="absolute font-['Songti_SC:Bold',sans-serif] leading-[16px] left-[6.5px] not-italic text-[#6b9e8d] text-[12px] text-center text-nowrap top-0 tracking-[0.8px] translate-x-[-50%] whitespace-pre">30</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#e8f4f0] h-[44px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Button">
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
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a6961] text-[14px] top-0 tracking-[0.8px] w-[94px]">30 个词语碎片</p>
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
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-500 text-nowrap tracking-[0.8px] whitespace-pre">测试 #自然</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#6b9e8d] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[1379px] rounded-[10px] size-[40px] top-[4px]" data-name="Button">
      <Icon27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[1423px]" data-name="Container">
      <Input1 />
      <Button28 />
    </div>
  );
}

function Icon28() {
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

function Button29() {
  return (
    <div className="absolute bg-[#6b9e8d] content-stretch flex items-center justify-center left-[1435px] overflow-clip rounded-[3.35544e+07px] size-[48px] top-0" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[48px] left-[24px] top-[24px] w-[1483px]" data-name="Container">
      <Container29 />
      <Button29 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute box-border content-stretch flex gap-[4px] h-[20px] items-center justify-center left-[24px] overflow-clip px-[8px] py-[2px] rounded-[6.8px] top-[84px] w-[50.422px]" data-name="Badge">
      <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6b9e8d] text-[12px] text-nowrap tracking-[0.8px] whitespace-pre">#自然</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-[rgba(248,245,237,0.8)] border-[#c5dfd6] border-[1px_0px_0px] border-solid h-[129px] left-0 top-[1135px] w-[1531px]" data-name="Container">
      <Container30 />
      <Badge />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#ad8b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.196px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.196px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[23.562px] relative shrink-0 w-[33.134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.562px] relative w-[33.134px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.1px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">暮色</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[24.982px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.523px] h-[24.982px] items-center pl-[0.274px] pr-0 py-0 relative w-full">
          <Container32 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[rgba(173,139,125,0.08)] h-[19.827px] left-0 rounded-[4px] top-[1.31px] w-[36.208px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad8b7d] text-[11px] text-nowrap top-[1.2px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[rgba(173,139,125,0.08)] h-[19.827px] left-[39.59px] rounded-[4px] top-0 w-[36.208px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad8b7d] text-[11px] text-nowrap top-[1.2px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[21.14px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[47.625px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.504px] h-[47.625px] items-start pl-0 pr-[0.751px] py-0 relative w-full">
          <Container34 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.477px] items-start pb-px pt-[9.426px] px-[13.291px] relative rounded-[10px] w-[103.257px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[#8badad] relative rounded-[3.35544e+07px] shrink-0 size-[6.216px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.216px]" />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[23.672px] relative shrink-0 w-[33.209px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.672px] relative w-[33.209px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.16px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">流转</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.472px] h-[24.185px] items-center left-[0.83px] pl-[0.302px] pr-0 py-0 top-0 w-[47.2px]" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[rgba(139,173,173,0.08)] h-[19.949px] left-0 rounded-[4px] top-[26.48px] w-[36.269px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#8badad] text-[11px] text-nowrap top-[1.22px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[46.826px] relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Text3 />
    </div>
  );
}

function DraggableWord1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.767px] items-start pb-px pt-[9.47px] px-[13.321px] relative rounded-[10px] w-[74.672px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#9eb8c5] relative rounded-[3.35544e+07px] shrink-0 size-[6.165px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.165px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[23.396px] relative shrink-0 w-[33.022px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.396px] relative w-[33.022px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.08px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">静谧</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[24.591px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.599px] h-[24.591px] items-center pl-[0.23px] pr-0 py-0 relative w-full">
          <Container41 />
          <Container42 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[rgba(158,184,197,0.08)] h-[19.643px] left-0 rounded-[4px] top-[1.11px] w-[36.116px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#9eb8c5] text-[11px] text-nowrap top-[1.17px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[rgba(158,184,197,0.08)] h-[19.643px] left-[39.59px] rounded-[4px] top-0 w-[36.116px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#9eb8c5] text-[11px] text-nowrap top-[1.17px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[20.749px] relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[47.239px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.898px] h-[47.239px] items-start pl-0 pr-[0.633px] py-0 relative w-full">
          <Container43 />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord2() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.958px] items-start pb-px pt-[9.359px] px-[13.246px] relative rounded-[10px] w-[102.943px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#b8c5d6] h-[6.094px] relative rounded-[3.35544e+07px] shrink-0 w-[6.093px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6.094px] w-[6.093px]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[23.006px] relative shrink-0 w-[32.756px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.006px] relative w-[32.756px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.07px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">诗意</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[23.679px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.775px] h-[23.679px] items-center pl-[0.13px] pr-0 py-0 relative w-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[rgba(184,197,214,0.08)] h-[19.213px] left-0 rounded-[4px] top-0 w-[35.898px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#b8c5d6] text-[11px] text-nowrap top-[1.09px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[rgba(184,197,214,0.08)] h-[19.213px] left-[39.6px] rounded-[4px] top-[0.62px] w-[35.898px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#b8c5d6] text-[11px] text-nowrap top-[1.09px] tracking-[0.8px] whitespace-pre">生活</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[19.835px] relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[46.332px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.818px] h-[46.332px] items-start pl-[0.356px] pr-0 py-0 relative w-full">
          <Container48 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.738px] items-start pb-px pt-[9.203px] px-[13.14px] relative rounded-[10px] w-[102.198px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#ad9e8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.226px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.226px]" />
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[23.727px] relative shrink-0 w-[33.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.727px] relative w-[33.246px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.12px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">瞬间</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[25.371px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.447px] h-[25.371px] items-center pl-[0.317px] pr-0 py-0 relative w-full">
          <Container51 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[20.01px] left-0 rounded-[4px] top-[1.52px] w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[20.009px] left-[39.58px] rounded-[4px] top-0 w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[21.53px] relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[48.01px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.11px] h-[48.01px] items-start pl-0 pr-[0.87px] py-0 relative w-full">
          <Container53 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.995px] items-start pb-px pt-[9.492px] px-[13.336px] relative rounded-[10px] w-[103.569px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#9e8b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.185px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.185px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[23.507px] relative shrink-0 w-[33.097px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.507px] relative w-[33.097px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.14px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">永恒</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.548px] h-[23.947px] items-center left-[0.71px] pl-[0.259px] pr-0 py-0 top-0 w-[47.09px]" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[rgba(158,139,125,0.08)] h-[19.766px] left-0 rounded-[4px] top-[26.49px] w-[36.178px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.05px] not-italic text-[#9e8b7d] text-[11px] text-nowrap top-[1.19px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[46.592px] relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Text10 />
    </div>
  );
}

function DraggableWord5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.399px] items-start pb-px pt-[9.404px] px-[13.276px] relative rounded-[10px] w-[74.354px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#7d8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.155px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.155px]" />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[23.341px] relative shrink-0 w-[32.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.341px] relative w-[32.984px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.08px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">远方</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[24.461px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.624px] h-[24.461px] items-center pl-[0.216px] pr-0 py-0 relative w-full">
          <Container60 />
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[rgba(125,139,158,0.08)] h-[19.582px] left-0 rounded-[4px] top-[1.04px] w-[36.086px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#7d8b9e] text-[11px] text-nowrap top-[1.16px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[rgba(125,139,158,0.08)] h-[19.582px] left-[39.6px] rounded-[4px] top-0 w-[36.086px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#7d8b9e] text-[11px] text-nowrap top-[1.16px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[20.619px] relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[47.11px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.03px] h-[47.11px] items-start pl-0 pr-[0.593px] py-0 relative w-full">
          <Container62 />
          <Container63 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.784px] items-start pb-px pt-[9.337px] px-[13.231px] relative rounded-[10px] w-[102.837px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="bg-[#9e8bad] relative rounded-[3.35544e+07px] shrink-0 size-[6.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.083px]" />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[22.95px] relative shrink-0 w-[32.717px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.95px] relative w-[32.717px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.04px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">梦境</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.8px] h-[23.146px] items-center left-0 pl-[0.115px] pr-0 py-0 top-0 w-[46.716px]" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[rgba(158,139,173,0.08)] h-[19.152px] left-[0.37px] rounded-[4px] top-[26.65px] w-[35.866px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#9e8bad] text-[11px] text-nowrap top-[1.08px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[45.8px] relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Text13 />
    </div>
  );
}

function DraggableWord7() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.161px] items-start pb-px pt-[9.181px] px-[13.124px] relative rounded-[10px] w-[73.281px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container68 />
    </div>
  );
}

function Container69() {
  return (
    <div className="bg-[#b8ad9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.114px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.114px]" />
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[23.118px] relative shrink-0 w-[32.832px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.118px] relative w-[32.832px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.09px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">回忆</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.725px] h-[23.387px] items-center left-[0.44px] pl-[0.158px] pr-0 py-0 top-0 w-[46.83px]" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[rgba(184,173,158,0.08)] h-[19.336px] left-0 rounded-[4px] top-[26.5px] w-[35.961px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#b8ad9e] text-[11px] text-nowrap top-[1.11px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[46.039px] relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Text14 />
    </div>
  );
}

function DraggableWord8() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.535px] items-start pb-px pt-[9.248px] px-[13.17px] relative rounded-[10px] w-[73.605px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container72 />
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-[#c5ad9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.246px]" />
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[23.837px] relative shrink-0 w-[33.32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.837px] relative w-[33.32px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.13px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">时光</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.396px] h-[24.424px] items-center left-0 pl-[0.345px] pr-0 py-0 top-0 w-[47.308px]" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[rgba(197,173,158,0.08)] h-[20.131px] left-[1.11px] rounded-[4px] top-[26.93px] w-[36.359px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#c5ad9e] text-[11px] text-nowrap top-[1.25px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[47.06px] relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <Text15 />
    </div>
  );
}

function DraggableWord9() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.133px] items-start pb-px pt-[9.536px] px-[13.365px] relative rounded-[10px] w-[74.987px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container76 />
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-[#8b7d9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.063px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[22.838px] relative shrink-0 w-[32.64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.838px] relative w-[32.64px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.03px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">配乐</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[23.286px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.85px] h-[23.286px] items-center pl-[0.086px] pr-0 py-0 relative w-full">
          <Container77 />
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[rgba(139,125,158,0.08)] h-[19.028px] left-0 rounded-[4px] top-[0.41px] w-[35.803px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b7d9e] text-[11px] text-nowrap top-[1.06px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[rgba(139,125,158,0.08)] h-[19.028px] left-[39.61px] rounded-[4px] top-0 w-[35.803px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b7d9e] text-[11px] text-nowrap top-[1.06px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[19.443px] relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[45.941px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.212px] h-[45.941px] items-start pl-0 pr-[0.237px] py-0 relative w-full">
          <Container79 />
          <Container80 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord10() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.213px] items-start pb-px pt-[9.136px] px-[13.094px] relative rounded-[10px] w-[101.875px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container81 />
    </div>
  );
}

function Container82() {
  return (
    <div className="bg-[#9e7d8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.124px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.124px]" />
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[23.174px] relative shrink-0 w-[32.87px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.174px] relative w-[32.87px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.09px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">特写</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[24.07px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.7px] h-[24.07px] items-center pl-[0.173px] pr-0 py-0 relative w-full">
          <Container82 />
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[rgba(158,125,139,0.08)] h-[19.398px] left-0 rounded-[4px] top-0 w-[35.992px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#9e7d8b] text-[11px] text-nowrap top-[1.13px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[rgba(158,125,139,0.08)] h-[19.398px] left-[39.6px] rounded-[4px] top-[0.83px] w-[35.992px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#9e7d8b] text-[11px] text-nowrap top-[1.13px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[20.227px] relative shrink-0 w-full" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[46.722px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.424px] h-[46.722px] items-start pl-[0.474px] pr-0 py-0 relative w-full">
          <Container84 />
          <Container85 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord11() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.262px] items-start pb-px pt-[9.27px] px-[13.186px] relative rounded-[10px] w-[102.519px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container86 />
    </div>
  );
}

function Container87() {
  return (
    <div className="bg-[#7d6b8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.256px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.256px]" />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[23.892px] relative shrink-0 w-[33.357px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.892px] relative w-[33.357px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.13px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">剪辑</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[25.76px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.371px] h-[25.76px] items-center pl-[0.36px] pr-0 py-0 relative w-full">
          <Container87 />
          <Container88 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[rgba(125,107,139,0.08)] h-[20.192px] left-0 rounded-[4px] top-[1.73px] w-[36.389px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#7d6b8b] text-[11px] text-nowrap top-[1.26px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[rgba(125,107,139,0.08)] h-[20.192px] left-[39.57px] rounded-[4px] top-0 w-[36.389px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#7d6b8b] text-[11px] text-nowrap top-[1.26px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[21.919px] relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[48.394px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[0.715px] h-[48.394px] items-start pl-0 pr-[0.988px] py-0 relative w-full">
          <Container89 />
          <Container90 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord12() {
  return (
    <div className="box-border content-stretch flex flex-col h-[67.511px] items-start pb-px pt-[9.558px] px-[13.38px] relative rounded-[10px] w-[103.877px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container91 />
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-[#ad8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.083px]" />
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[23.177px] relative shrink-0 w-[48.919px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.177px] relative w-[48.919px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.06px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">音乐盒</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[23.548px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.8px] h-[23.548px] items-center pl-[0.115px] pr-0 py-0 relative w-full">
          <Container92 />
          <Container93 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[rgba(173,139,158,0.08)] h-[19.152px] left-0 rounded-[4px] top-0 w-[35.866px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#ad8b9e] text-[11px] text-nowrap top-[1.08px] tracking-[0.8px] whitespace-pre">生活</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[rgba(173,139,158,0.08)] h-[19.152px] left-[39.61px] rounded-[4px] top-[0.55px] w-[35.866px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#ad8b9e] text-[11px] text-nowrap top-[1.08px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[19.705px] relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[46.202px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.949px] h-[46.202px] items-start pl-[0.316px] pr-0 py-0 relative w-full">
          <Container94 />
          <Container95 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord13() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.563px] items-start pb-px pt-[9.181px] px-[13.124px] relative rounded-[10px] w-[102.091px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container96 />
    </div>
  );
}

function Container97() {
  return (
    <div className="bg-[#5c6b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.226px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.226px]" />
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[23.727px] relative shrink-0 w-[33.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.727px] relative w-[33.246px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.17px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">钢笔</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[25.371px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.447px] h-[25.371px] items-center pl-[0.317px] pr-0 py-0 relative w-full">
          <Container97 />
          <Container98 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[rgba(92,107,125,0.08)] h-[20.01px] left-0 rounded-[4px] top-0 w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#5c6b7d] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">生活</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[rgba(92,107,125,0.08)] h-[20.01px] left-[39.58px] rounded-[4px] top-[1.52px] w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#5c6b7d] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[21.53px] relative shrink-0 w-full" data-name="Container">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[48.01px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.11px] h-[48.01px] items-start pl-[0.87px] pr-0 py-0 relative w-full">
          <Container99 />
          <Container100 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord14() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.995px] items-start pb-px pt-[9.492px] px-[13.336px] relative rounded-[10px] w-[103.569px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container101 />
    </div>
  );
}

function Container102() {
  return (
    <div className="bg-[#f0b89e] relative rounded-[3.35544e+07px] shrink-0 size-[6.135px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.135px]" />
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[23.229px] relative shrink-0 w-[32.908px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.229px] relative w-[32.908px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.1px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">期待</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.675px] h-[23.547px] items-center left-[0.51px] pl-[0.187px] pr-0 py-0 top-0 w-[46.905px]" data-name="Container">
      <Container102 />
      <Container103 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[rgba(240,184,158,0.08)] h-[19.459px] left-0 rounded-[4px] top-[26.49px] w-[36.023px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#f0b89e] text-[11px] text-nowrap top-[1.14px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[46.198px] relative shrink-0 w-full" data-name="Container">
      <Container104 />
      <Text26 />
    </div>
  );
}

function DraggableWord15() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.783px] items-start pb-px pt-[9.293px] px-[13.201px] relative rounded-[10px] w-[73.82px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container105 />
    </div>
  );
}

function Container106() {
  return (
    <div className="bg-[#9e8b7d] relative rounded-[3.35544e+07px] shrink-0 size-[6.052px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.052px]" />
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[22.782px] relative shrink-0 w-[32.601px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.782px] relative w-[32.601px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.03px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">遗憾</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.875px] h-[22.904px] items-center left-0 pl-[0.072px] pr-0 py-0 top-0 w-[46.601px]" data-name="Container">
      <Container106 />
      <Container107 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[rgba(158,139,125,0.08)] h-[18.966px] left-[0.23px] rounded-[4px] top-[26.59px] w-[35.771px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#9e8b7d] text-[11px] text-nowrap top-[1.05px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container109() {
  return (
    <div className="h-[45.559px] relative shrink-0 w-full" data-name="Container">
      <Container108 />
      <Text27 />
    </div>
  );
}

function DraggableWord16() {
  return (
    <div className="box-border content-stretch flex flex-col h-[63.786px] items-start pb-px pt-[9.113px] px-[13.078px] relative rounded-[10px] w-[72.955px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container109 />
    </div>
  );
}

function Container110() {
  return (
    <div className="bg-[#ad9e8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.246px]" />
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[23.837px] relative shrink-0 w-[33.32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.837px] relative w-[33.32px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.19px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">感怀</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.396px] h-[24.424px] items-center left-[0.95px] pl-[0.346px] pr-0 py-0 top-0 w-[47.308px]" data-name="Container">
      <Container110 />
      <Container111 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-[rgba(173,158,139,0.08)] h-[20.131px] left-0 rounded-[4px] top-[26.48px] w-[36.359px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#ad9e8b] text-[11px] text-nowrap top-[1.25px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[47.06px] relative shrink-0 w-full" data-name="Container">
      <Container112 />
      <Text28 />
    </div>
  );
}

function DraggableWord17() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.133px] items-start pb-px pt-[9.536px] px-[13.365px] relative rounded-[10px] w-[74.987px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container113 />
    </div>
  );
}

function Container114() {
  return (
    <div className="bg-[#b8c5ad] relative rounded-[3.35544e+07px] shrink-0 size-[6.196px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.196px]" />
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[23.562px] relative shrink-0 w-[33.134px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.562px] relative w-[33.134px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.1px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">释然</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.523px] h-[24.026px] items-center left-0 pl-[0.274px] pr-0 py-0 top-0 w-[47.127px]" data-name="Container">
      <Container114 />
      <Container115 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[rgba(184,197,173,0.08)] h-[19.827px] left-[0.88px] rounded-[4px] top-[26.84px] w-[36.208px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#b8c5ad] text-[11px] text-nowrap top-[1.2px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[46.67px] relative shrink-0 w-full" data-name="Container">
      <Container116 />
      <Text29 />
    </div>
  );
}

function DraggableWord18() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.522px] items-start pb-px pt-[9.426px] px-[13.291px] relative rounded-[10px] w-[74.46px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container117 />
    </div>
  );
}

function Container118() {
  return (
    <div className="bg-[#9e8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.063px]" />
    </div>
  );
}

function Container119() {
  return (
    <div className="h-[22.838px] relative shrink-0 w-[32.64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.838px] relative w-[32.64px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.05px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">怅然</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.85px] h-[22.985px] items-center left-[0.24px] pl-[0.086px] pr-0 py-0 top-0 w-[46.639px]" data-name="Container">
      <Container118 />
      <Container119 />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute bg-[rgba(158,139,158,0.08)] h-[19.028px] left-0 rounded-[4px] top-[26.5px] w-[35.803px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#9e8b9e] text-[11px] text-nowrap top-[1.06px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[45.64px] relative shrink-0 w-full" data-name="Container">
      <Container120 />
      <Text30 />
    </div>
  );
}

function DraggableWord19() {
  return (
    <div className="box-border content-stretch flex flex-col h-[63.911px] items-start pb-px pt-[9.136px] px-[13.094px] relative rounded-[10px] w-[73.064px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container121 />
    </div>
  );
}

function Container122() {
  return (
    <div className="bg-[#f0ad8b] relative rounded-[3.35544e+07px] shrink-0 size-[6.226px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.226px]" />
    </div>
  );
}

function Container123() {
  return (
    <div className="h-[23.727px] relative shrink-0 w-[33.246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.727px] relative w-[33.246px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.12px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">欢喜</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.447px] h-[24.265px] items-center left-0 pl-[0.317px] pr-0 py-0 top-0 w-[47.236px]" data-name="Container">
      <Container122 />
      <Container123 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[rgba(240,173,139,0.08)] h-[20.009px] left-[1.02px] rounded-[4px] top-[26.89px] w-[36.299px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#f0ad8b] text-[11px] text-nowrap top-[1.23px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container125() {
  return (
    <div className="h-[46.904px] relative shrink-0 w-full" data-name="Container">
      <Container124 />
      <Text31 />
    </div>
  );
}

function DraggableWord20() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.889px] items-start pb-px pt-[9.492px] px-[13.336px] relative rounded-[10px] w-[74.777px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container125 />
    </div>
  );
}

function Container126() {
  return (
    <div className="bg-[#f0c5a8] relative rounded-[3.35544e+07px] shrink-0 size-[6.165px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.165px]" />
    </div>
  );
}

function Container127() {
  return (
    <div className="h-[23.396px] relative shrink-0 w-[33.022px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.396px] relative w-[33.022px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.08px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">黎明</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="h-[24.591px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.599px] h-[24.591px] items-center pl-[0.23px] pr-0 py-0 relative w-full">
          <Container126 />
          <Container127 />
        </div>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute bg-[rgba(240,197,168,0.08)] h-[19.643px] left-0 rounded-[4px] top-[1.11px] w-[36.116px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#f0c5a8] text-[11px] text-nowrap top-[1.17px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute bg-[rgba(240,197,168,0.08)] h-[19.643px] left-[39.59px] rounded-[4px] top-0 w-[36.116px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#f0c5a8] text-[11px] text-nowrap top-[1.17px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container129() {
  return (
    <div className="h-[20.749px] relative shrink-0 w-full" data-name="Container">
      <Text32 />
      <Text33 />
    </div>
  );
}

function Container130() {
  return (
    <div className="h-[47.239px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.898px] h-[47.239px] items-start pl-0 pr-[0.633px] py-0 relative w-full">
          <Container128 />
          <Container129 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord21() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.958px] items-start pb-px pt-[9.359px] px-[13.246px] relative rounded-[10px] w-[102.943px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container130 />
    </div>
  );
}

function Container131() {
  return (
    <div className="bg-[#d6e6f0] relative rounded-[3.35544e+07px] shrink-0 size-[6.216px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.216px]" />
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[23.672px] relative shrink-0 w-[33.209px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.672px] relative w-[33.209px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.16px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">雪花</p>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="h-[25.241px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.473px] h-[25.241px] items-center pl-[0.302px] pr-0 py-0 relative w-full">
          <Container131 />
          <Container132 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute bg-[rgba(214,230,240,0.08)] h-[19.949px] left-0 rounded-[4px] top-0 w-[36.269px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#d6e6f0] text-[11px] text-nowrap top-[1.22px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[rgba(214,230,240,0.08)] h-[19.949px] left-[39.58px] rounded-[4px] top-[1.45px] w-[36.269px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.06px] not-italic text-[#d6e6f0] text-[11px] text-nowrap top-[1.22px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[21.4px] relative shrink-0 w-full" data-name="Container">
      <Text34 />
      <Text35 />
    </div>
  );
}

function Container135() {
  return (
    <div className="h-[47.882px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1.241px] h-[47.882px] items-start pl-[0.83px] pr-0 py-0 relative w-full">
          <Container133 />
          <Container134 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord22() {
  return (
    <div className="box-border content-stretch flex flex-col h-[66.823px] items-start pb-px pt-[9.47px] px-[13.321px] relative rounded-[10px] w-[103.465px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container135 />
    </div>
  );
}

function Container136() {
  return (
    <div className="bg-[#b8d6e6] relative rounded-[3.35544e+07px] shrink-0 size-[6.073px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.073px]" />
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[22.894px] relative shrink-0 w-[32.679px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.894px] relative w-[32.679px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.04px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">霜冻</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[23.417px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.825px] h-[23.417px] items-center pl-[0.101px] pr-0 py-0 relative w-full">
          <Container136 />
          <Container137 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="absolute bg-[rgba(184,214,230,0.08)] h-[19.09px] left-0 rounded-[4px] top-[0.48px] w-[35.835px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#b8d6e6] text-[11px] text-nowrap top-[1.07px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute bg-[rgba(184,214,230,0.08)] h-[19.09px] left-[39.61px] rounded-[4px] top-0 w-[35.834px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#b8d6e6] text-[11px] text-nowrap top-[1.07px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="h-[19.574px] relative shrink-0 w-full" data-name="Container">
      <Text36 />
      <Text37 />
    </div>
  );
}

function Container140() {
  return (
    <div className="h-[46.072px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.081px] h-[46.072px] items-start pl-0 pr-[0.277px] py-0 relative w-full">
          <Container138 />
          <Container139 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord23() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.388px] items-start pb-px pt-[9.158px] px-[13.109px] relative rounded-[10px] w-[101.983px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container140 />
    </div>
  );
}

function Container141() {
  return (
    <div className="bg-[#c4895c] relative rounded-[3.35544e+07px] shrink-0 size-[6.236px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.236px]" />
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[23.782px] relative shrink-0 w-[33.283px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.782px] relative w-[33.283px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.12px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">落叶</p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="h-[25.501px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.422px] h-[25.501px] items-center pl-[0.331px] pr-0 py-0 relative w-full">
          <Container141 />
          <Container142 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute bg-[rgba(196,137,92,0.08)] h-[20.07px] left-0 rounded-[4px] top-[1.59px] w-[36.329px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#c4895c] text-[11px] text-nowrap top-[1.24px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute bg-[rgba(196,137,92,0.08)] h-[20.07px] left-[39.58px] rounded-[4px] top-0 w-[36.329px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.04px] not-italic text-[#c4895c] text-[11px] text-nowrap top-[1.24px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[21.66px] relative shrink-0 w-full" data-name="Container">
      <Text38 />
      <Text39 />
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[48.139px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[0.978px] h-[48.139px] items-start pl-0 pr-[0.909px] py-0 relative w-full">
          <Container143 />
          <Container144 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord24() {
  return (
    <div className="box-border content-stretch flex flex-col h-[67.167px] items-start pb-px pt-[9.514px] px-[13.351px] relative rounded-[10px] w-[103.672px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container145 />
    </div>
  );
}

function Container146() {
  return (
    <div className="bg-[#7d9e9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.155px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.155px]" />
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[23.341px] relative shrink-0 w-[32.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.341px] relative w-[32.984px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.08px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">雨天</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="h-[24.461px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.624px] h-[24.461px] items-center pl-[0.216px] pr-0 py-0 relative w-full">
          <Container146 />
          <Container147 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute bg-[rgba(125,158,158,0.08)] h-[19.582px] left-0 rounded-[4px] top-[1.04px] w-[36.085px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#7d9e9e] text-[11px] text-nowrap top-[1.16px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute bg-[rgba(125,158,158,0.08)] h-[19.582px] left-[39.6px] rounded-[4px] top-0 w-[36.086px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#7d9e9e] text-[11px] text-nowrap top-[1.16px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container149() {
  return (
    <div className="h-[20.619px] relative shrink-0 w-full" data-name="Container">
      <Text40 />
      <Text41 />
    </div>
  );
}

function Container150() {
  return (
    <div className="h-[47.11px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.03px] h-[47.11px] items-start pl-0 pr-[0.593px] py-0 relative w-full">
          <Container148 />
          <Container149 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord25() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.784px] items-start pb-px pt-[9.337px] px-[13.231px] relative rounded-[10px] w-[102.837px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container150 />
    </div>
  );
}

function Container151() {
  return (
    <div className="bg-[#9e7d6b] relative rounded-[3.35544e+07px] shrink-0 size-[6.104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.104px]" />
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[23.062px] relative shrink-0 w-[32.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.062px] relative w-[32.794px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.05px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">镜头</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="h-[23.809px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.75px] h-[23.809px] items-center pl-[0.144px] pr-0 py-0 relative w-full">
          <Container151 />
          <Container152 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute bg-[rgba(158,125,107,0.08)] h-[19.275px] left-0 rounded-[4px] top-[0.69px] w-[35.929px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#9e7d6b] text-[11px] text-nowrap top-[1.1px] tracking-[0.8px] whitespace-pre">电影</p>
    </div>
  );
}

function Text43() {
  return (
    <div className="absolute bg-[rgba(158,125,107,0.08)] h-[19.275px] left-[39.6px] rounded-[4px] top-0 w-[35.93px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.02px] not-italic text-[#9e7d6b] text-[11px] text-nowrap top-[1.1px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container154() {
  return (
    <div className="h-[19.966px] relative shrink-0 w-full" data-name="Container">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Container155() {
  return (
    <div className="h-[46.462px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[2.687px] h-[46.462px] items-start pl-0 pr-[0.395px] py-0 relative w-full">
          <Container153 />
          <Container154 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord26() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.913px] items-start pb-px pt-[9.225px] px-[13.155px] relative rounded-[10px] w-[102.306px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container155 />
    </div>
  );
}

function Container156() {
  return (
    <div className="bg-[#8b9ead] relative rounded-[3.35544e+07px] shrink-0 size-[6.052px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.052px]" />
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[22.782px] relative shrink-0 w-[32.601px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.782px] relative w-[32.601px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.03px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">月光</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[23.156px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[7.875px] h-[23.156px] items-center pl-[0.072px] pr-0 py-0 relative w-full">
          <Container156 />
          <Container157 />
        </div>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute bg-[rgba(139,158,173,0.08)] h-[18.966px] left-0 rounded-[4px] top-[0.35px] w-[35.771px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b9ead] text-[11px] text-nowrap top-[1.05px] tracking-[0.8px] whitespace-pre">自然</p>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute bg-[rgba(139,158,173,0.08)] h-[18.966px] left-[39.61px] rounded-[4px] top-0 w-[35.771px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.01px] not-italic text-[#8b9ead] text-[11px] text-nowrap top-[1.05px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[19.312px] relative shrink-0 w-full" data-name="Container">
      <Text44 />
      <Text45 />
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[45.811px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[3.343px] h-[45.811px] items-start pl-0 pr-[0.198px] py-0 relative w-full">
          <Container158 />
          <Container159 />
        </div>
      </div>
    </div>
  );
}

function DraggableWord27() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.037px] items-start pb-px pt-[9.113px] px-[13.078px] relative rounded-[10px] w-[101.766px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container160 />
    </div>
  );
}

function Container161() {
  return (
    <div className="bg-[#d49e5c] relative rounded-[3.35544e+07px] shrink-0 size-[6.104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.104px]" />
    </div>
  );
}

function Container162() {
  return (
    <div className="h-[23.062px] relative shrink-0 w-[32.794px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.062px] relative w-[32.794px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.08px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">温暖</p>
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.75px] h-[23.306px] items-center left-[0.4px] pl-[0.144px] pr-0 py-0 top-0 w-[46.792px]" data-name="Container">
      <Container161 />
      <Container162 />
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute bg-[rgba(212,158,92,0.08)] h-[19.275px] left-0 rounded-[4px] top-[26.5px] w-[35.93px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#d49e5c] text-[11px] text-nowrap top-[1.1px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container164() {
  return (
    <div className="h-[45.959px] relative shrink-0 w-full" data-name="Container">
      <Container163 />
      <Text46 />
    </div>
  );
}

function DraggableWord28() {
  return (
    <div className="box-border content-stretch flex flex-col h-[64.41px] items-start pb-px pt-[9.226px] px-[13.155px] relative rounded-[10px] w-[73.498px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container164 />
    </div>
  );
}

function Container165() {
  return (
    <div className="bg-[#6b8b9e] relative rounded-[3.35544e+07px] shrink-0 size-[6.206px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[6.206px]" />
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[23.617px] relative shrink-0 w-[33.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.617px] relative w-[33.172px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[22.5px] left-[0.1px] not-italic text-[#1a2e29] text-[15px] text-nowrap top-[-1px] tracking-[1.2px] whitespace-pre">忧郁</p>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.498px] h-[24.106px] items-center left-0 pl-[0.288px] pr-0 py-0 top-0 w-[47.163px]" data-name="Container">
      <Container165 />
      <Container166 />
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute bg-[rgba(107,139,158,0.08)] h-[19.888px] left-[0.92px] rounded-[4px] top-[26.86px] w-[36.239px]" data-name="Text">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[14.667px] left-[6.03px] not-italic text-[#6b8b9e] text-[11px] text-nowrap top-[1.21px] tracking-[0.8px] whitespace-pre">心情</p>
    </div>
  );
}

function Container168() {
  return (
    <div className="h-[46.748px] relative shrink-0 w-full" data-name="Container">
      <Container167 />
      <Text47 />
    </div>
  );
}

function DraggableWord29() {
  return (
    <div className="box-border content-stretch flex flex-col h-[65.645px] items-start pb-px pt-[9.448px] px-[13.306px] relative rounded-[10px] w-[74.566px]" data-name="DraggableWord">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container168 />
    </div>
  );
}

function Container169() {
  return (
    <div className="h-[205.469px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex h-[69.864px] items-center justify-center left-[-1.02px] top-[-5.08px] w-[105.404px]" style={{ "--transform-inner-width": "103.25", "--transform-inner-height": "66.46875" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.1deg]">
          <DraggableWord />
        </div>
      </div>
      <div className="absolute flex h-[68.459px] items-center justify-center left-[105.68px] top-[-1.31px] w-[77.032px]" style={{ "--transform-inner-width": "74.671875", "--transform-inner-height": "65.765625" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.1deg]">
          <DraggableWord1 />
        </div>
      </div>
      <div className="absolute flex h-[68.806px] items-center justify-center left-[188.76px] top-[-4.28px] w-[104.744px]" style={{ "--transform-inner-width": "102.9375", "--transform-inner-height": "65.953125" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.4deg]">
          <DraggableWord2 />
        </div>
      </div>
      <div className="absolute flex h-[66.336px] items-center justify-center left-[297.34px] top-[-0.79px] w-[103.203px]" style={{ "--transform-inner-width": "102.1875", "--transform-inner-height": "64.734375" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.9deg]">
          <DraggableWord3 />
        </div>
      </div>
      <div className="absolute flex h-[70.922px] items-center justify-center left-[406.89px] top-[-5.9px] w-[106.064px]" style={{ "--transform-inner-width": "103.5625", "--transform-inner-height": "66.984375" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.8deg]">
          <DraggableWord4 />
        </div>
      </div>
      <div className="absolute flex h-[67.703px] items-center justify-center left-[514.25px] top-[-1.12px] w-[76.372px]" style={{ "--transform-inner-width": "74.34375", "--transform-inner-height": "65.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.8deg]">
          <DraggableWord5 />
        </div>
      </div>
      <div className="absolute flex h-[68.454px] items-center justify-center left-[596.88px] top-[-4.01px] w-[104.524px]" style={{ "--transform-inner-width": "102.828125", "--transform-inner-height": "65.78125" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.5deg]">
          <DraggableWord6 />
        </div>
      </div>
      <div className="absolute flex h-[65.178px] items-center justify-center left-[706.47px] top-[-1.53px] w-[74.17px]" style={{ "--transform-inner-width": "73.265625", "--transform-inner-height": "64.15625" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.2deg]">
          <DraggableWord7 />
        </div>
      </div>
      <div className="absolute flex h-[65.936px] items-center justify-center left-[785.47px] top-[-0.69px] w-[74.831px]" style={{ "--transform-inner-width": "73.59375", "--transform-inner-height": "64.53125" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.1deg]">
          <DraggableWord8 />
        </div>
      </div>
      <div className="absolute flex h-[69.215px] items-center justify-center left-[866.43px] top-[-4.63px] w-[77.691px]" style={{ "--transform-inner-width": "74.984375", "--transform-inner-height": "66.125" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.6deg]">
          <DraggableWord9 />
        </div>
      </div>
      <div className="absolute flex h-[65.276px] items-center justify-center left-[947.8px] top-[-1.6px] w-[102.541px]" style={{ "--transform-inner-width": "101.875", "--transform-inner-height": "64.203125" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.4deg]">
          <DraggableWord10 />
        </div>
      </div>
      <div className="absolute flex h-[67.395px] items-center justify-center left-[1055.33px] top-[-1.05px] w-[103.864px]" style={{ "--transform-inner-width": "102.515625", "--transform-inner-height": "65.25" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.2deg]">
          <DraggableWord11 />
        </div>
      </div>
      <div className="absolute flex h-[71.978px] items-center justify-center left-[1165.23px] top-[-6.71px] w-[106.723px]" style={{ "--transform-inner-width": "103.875", "--transform-inner-height": "67.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.5deg]">
          <DraggableWord12 />
        </div>
      </div>
      <div className="absolute flex h-[65.982px] items-center justify-center left-[1274.44px] top-[-0.7px] w-[102.982px]" style={{ "--transform-inner-width": "102.078125", "--transform-inner-height": "64.5625" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.8deg]">
          <DraggableWord13 />
        </div>
      </div>
      <div className="absolute flex h-[70.922px] items-center justify-center left-[-3.75px] top-[69.24px] w-[106.064px]" style={{ "--transform-inner-width": "103.5625", "--transform-inner-height": "66.984375" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.2deg]">
          <DraggableWord14 />
        </div>
      </div>
      <div className="absolute flex h-[66.441px] items-center justify-center left-[107.04px] top-[70.34px] w-[75.271px]" style={{ "--transform-inner-width": "73.8125", "--transform-inner-height": "64.78125" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.3deg]">
          <DraggableWord15 />
        </div>
      </div>
      <div className="absolute flex h-[64.42px] items-center justify-center left-[189.35px] top-[70.2px] w-[73.508px]" style={{ "--transform-inner-width": "72.953125", "--transform-inner-height": "63.78125" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.5deg]">
          <DraggableWord16 />
        </div>
      </div>
      <div className="absolute flex h-[69.215px] items-center justify-center left-[265.97px] top-[69.67px] w-[77.691px]" style={{ "--transform-inner-width": "74.984375", "--transform-inner-height": "66.125" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.4deg]">
          <DraggableWord17 />
        </div>
      </div>
      <div className="absolute flex h-[67.955px] items-center justify-center left-[349.41px] top-[67.5px] w-[76.592px]" style={{ "--transform-inner-width": "74.453125", "--transform-inner-height": "65.515625" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.1deg]">
          <DraggableWord18 />
        </div>
      </div>
      <div className="absolute flex h-[64.673px] items-center justify-center left-[429.85px] top-[70.78px] w-[73.729px]" style={{ "--transform-inner-width": "73.0625", "--transform-inner-height": "63.90625" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.6deg]">
          <DraggableWord19 />
        </div>
      </div>
      <div className="absolute flex h-[68.711px] items-center justify-center left-[510.06px] top-[66.92px] w-[77.252px]" style={{ "--transform-inner-width": "74.765625", "--transform-inner-height": "65.875" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.8deg]">
          <DraggableWord20 />
        </div>
      </div>
      <div className="absolute flex h-[68.806px] items-center justify-center left-[590.79px] top-[66.88px] w-[104.744px]" style={{ "--transform-inner-width": "102.9375", "--transform-inner-height": "65.953125" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.4deg]">
          <DraggableWord21 />
        </div>
      </div>
      <div className="absolute flex h-[70.569px] items-center justify-center left-[697.3px] top-[69.32px] w-[105.844px]" style={{ "--transform-inner-width": "103.453125", "--transform-inner-height": "66.8125" } as React.CSSProperties}>
        <div className="flex-none rotate-[2.1deg]">
          <DraggableWord22 />
        </div>
      </div>
      <div className="absolute flex h-[65.629px] items-center justify-center left-[809.71px] top-[69.29px] w-[102.762px]" style={{ "--transform-inner-width": "101.96875", "--transform-inner-height": "64.375" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.3deg]">
          <DraggableWord23 />
        </div>
      </div>
      <div className="absolute flex h-[71.274px] items-center justify-center left-[918.09px] top-[64.99px] w-[106.284px]" style={{ "--transform-inner-width": "103.671875", "--transform-inner-height": "67.15625" } as React.CSSProperties}>
        <div className="flex-none rotate-[357.7deg]">
          <DraggableWord24 />
        </div>
      </div>
      <div className="absolute flex h-[68.454px] items-center justify-center left-[1027.72px] top-[67.15px] w-[104.524px]" style={{ "--transform-inner-width": "102.828125", "--transform-inner-height": "65.78125" } as React.CSSProperties}>
        <div className="flex-none rotate-[358.5deg]">
          <DraggableWord25 />
        </div>
      </div>
      <div className="absolute flex h-[66.689px] items-center justify-center left-[1137.21px] top-[68.49px] w-[103.423px]" style={{ "--transform-inner-width": "102.296875", "--transform-inner-height": "64.90625" } as React.CSSProperties}>
        <div className="flex-none rotate-[359deg]">
          <DraggableWord26 />
        </div>
      </div>
      <div className="absolute flex h-[64.923px] items-center justify-center left-[1246.7px] top-[69.83px] w-[102.321px]" style={{ "--transform-inner-width": "101.765625", "--transform-inner-height": "64.03125" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.5deg]">
          <DraggableWord27 />
        </div>
      </div>
      <div className="absolute flex h-[65.683px] items-center justify-center left-[1354.52px] top-[70.53px] w-[74.61px]" style={{ "--transform-inner-width": "73.484375", "--transform-inner-height": "64.40625" } as React.CSSProperties}>
        <div className="flex-none rotate-[1deg]">
          <DraggableWord28 />
        </div>
      </div>
      <div className="absolute flex h-[68.207px] items-center justify-center left-[-1.08px] top-[138.47px] w-[76.812px]" style={{ "--transform-inner-width": "74.5625", "--transform-inner-height": "65.640625" } as React.CSSProperties}>
        <div className="flex-none rotate-[358deg]">
          <DraggableWord29 />
        </div>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="h-[253.469px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[253.469px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container169 />
        </div>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex flex-col h-[532.5px] items-start left-0 overflow-clip top-[602.5px] w-[1531px]" data-name="Container">
      <Container170 />
    </div>
  );
}

function Container172() {
  return (
    <div className="[grid-area:1_/_2] overflow-clip place-self-stretch relative shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(232, 244, 240) 0%, rgb(232, 244, 240) 100%)" }}>
      <Container24 />
      <Container28 />
      <Container31 />
      <Container171 />
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

function Container173() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[48px] items-start left-0 top-0 w-[84.813px]" data-name="Container">
      <Heading1 />
      <Paragraph4 />
    </div>
  );
}

function Icon29() {
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

function Button30() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[278px] overflow-clip rounded-[10px] size-[32px] top-[8px]" data-name="Button">
      <Icon29 />
    </div>
  );
}

function Container174() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Container173 />
      <Button30 />
    </div>
  );
}

function Container175() {
  return (
    <div className="h-[97px] relative shrink-0 w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c5dfd6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[97px] items-start pb-px pt-[24px] px-[24px] relative w-[358px]">
        <Container174 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[48.228px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 49">
        <g id="Icon">
          <path d={svgPaths.p1f5f9780} id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.01898" />
          <path d={svgPaths.p2415d580} fill="var(--fill-0, #6B9E8D)" id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.01898" />
        </g>
      </svg>
    </div>
  );
}

function Container176() {
  return (
    <div className="bg-[#6b9e8d] content-stretch flex items-center justify-center opacity-10 relative rounded-[3.35544e+07px] size-[96.456px]" data-name="Container">
      <Icon30 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[36px] left-0 top-[136px] w-[310px]" data-name="Heading 3">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[36px] left-[154.8px] not-italic text-[#1a2e29] text-[30px] text-center text-nowrap top-0 tracking-[1.2px] translate-x-[-50%] whitespace-pre">心情</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute h-[24px] left-[126.19px] overflow-clip rounded-[3.35544e+07px] top-[186px] w-[57.609px]" data-name="Badge">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-[29.5px] not-italic text-[#6b9e8d] text-[12px] text-center text-nowrap top-[4px] tracking-[0.8px] translate-x-[-50%] whitespace-pre">标签</p>
    </div>
  );
}

function Container177() {
  return (
    <div className="h-[234px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute flex items-center justify-center left-[106.31px] size-[96.913px] top-[18.32px]" style={{ "--transform-inner-width": "96.453125", "--transform-inner-height": "96.453125" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.273deg]">
          <Container176 />
        </div>
      </div>
      <Heading6 />
      <Badge1 />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="bg-[#c5dfd6] h-px opacity-50 shrink-0 w-full" data-name="Primitive.div" />;
}

function Icon31() {
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

function Text48() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">词语数量</p>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon31 />
      <Text48 />
    </div>
  );
}

function Container179() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] top-0 tracking-[1.2px] w-[75px]">30 个词语</p>
    </div>
  );
}

function Container180() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container178 />
      <Container179 />
    </div>
  );
}

function Icon32() {
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

function Text49() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">创建时间</p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Text49 />
    </div>
  );
}

function Container182() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">2024年1月1日</p>
    </div>
  );
}

function Container183() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container181 />
      <Container182 />
    </div>
  );
}

function Icon33() {
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

function Text50() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[50.406px]">
        <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#4a6961] text-[12px] text-nowrap top-0 tracking-[0.6px] uppercase whitespace-pre">最后修改</p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center opacity-60 relative shrink-0 w-full" data-name="Container">
      <Icon33 />
      <Text50 />
    </div>
  );
}

function Container185() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Songti_SC:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[0.8px] whitespace-pre">今天</p>
    </div>
  );
}

function Container186() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container184 />
      <Container185 />
    </div>
  );
}

function Container187() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[184px] items-start relative shrink-0 w-full" data-name="Container">
      <Container180 />
      <Container183 />
      <Container186 />
    </div>
  );
}

function Icon34() {
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
      <Icon34 />
      <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">词语分类统计</p>
    </div>
  );
}

function Text51() {
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
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[30.859px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[30.859px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">17</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container188() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text51 />
          <Badge2 />
        </div>
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.406px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">自然</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[24.438px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[24.438px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">7</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container189() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text52 />
          <Badge3 />
        </div>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.406px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">电影</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[24.438px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[24.438px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">4</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container190() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text53 />
          <Badge4 />
        </div>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[24px] relative shrink-0 w-[34.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[34.406px]">
        <p className="absolute font-['STSong:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#1a2e29] text-[16px] text-nowrap top-0 tracking-[1.2px] whitespace-pre">生活</p>
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-neutral-100 h-[22px] relative rounded-[6.8px] shrink-0 w-[24.438px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[24.438px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-900 text-nowrap tracking-[0.8px] whitespace-pre">2</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container191() {
  return (
    <div className="h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[13px] py-px relative w-full">
          <Text54 />
          <Badge5 />
        </div>
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[224px] items-start relative shrink-0 w-full" data-name="Container">
      <Container188 />
      <Container189 />
      <Container190 />
      <Container191 />
    </div>
  );
}

function Container193() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[264px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container192 />
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[828px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[828px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container177 />
          <PrimitiveDiv />
          <Container187 />
          <PrimitiveDiv />
          <Container193 />
        </div>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[358px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[358px]">
        <Container194 />
      </div>
    </div>
  );
}

function Container196() {
  return (
    <div className="[grid-area:1_/_3] place-self-stretch relative shrink-0" data-name="Container" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(245, 250, 248) 0%, rgb(245, 250, 248) 100%)" }}>
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container175 />
        <Container195 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_0px_inset_rgba(255,255,255,0.5),0px_1px_0px_0px_inset_rgba(255,255,255,0.8)]" />
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none shadow-[0px_4px_12px_0px_rgba(107,125,158,0.15)]" />
    </div>
  );
}

function Container197() {
  return (
    <div className="grid grid-cols-[300px_1531px_minmax(0px,_1fr)] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[1264px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container172 />
      <Container196 />
    </div>
  );
}

function App1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1328px] items-start left-0 overflow-clip top-0 w-[2191px]" data-name="App" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(232, 244, 240) 0%, rgb(232, 244, 240) 100%)" }}>
      <Container2 />
      <Container197 />
    </div>
  );
}

function Text55() {
  return <div className="absolute left-0 opacity-0 size-0 top-0" data-name="Text" />;
}

function App2() {
  return <div className="absolute left-0 size-0 top-0" data-name="App" />;
}

function Text56() {
  return <div className="absolute left-0 opacity-0 size-0 top-[1328px]" data-name="Text" />;
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_3_1764)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #6B9E8D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_3_1764">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function App3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[44.406px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[44.406px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#6b9e8d] text-[14px] text-nowrap tracking-[0.8px] whitespace-pre">按时间</p>
      </div>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="bg-[#e8f4f0] h-[32px] relative rounded-[3.6px] shrink-0 w-full" data-name="Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[32px] items-center pl-[8px] pr-0 py-0 relative w-full">
          <Icon35 />
          <App3 />
        </div>
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_3855)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #4A6961)" id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_3855">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function App4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[44.406px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[44.406px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-nowrap tracking-[0.8px] whitespace-pre">按标签</p>
      </div>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="h-[32px] relative rounded-[3.6px] shrink-0 w-full" data-name="Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[32px] items-center pl-[8px] pr-0 py-0 relative w-full">
          <Icon36 />
          <App4 />
        </div>
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #4A6961)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[44.406px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[44.406px]">
        <p className="font-['Songti_SC:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1a2e29] text-[14px] text-nowrap tracking-[0.8px] whitespace-pre">按名称</p>
      </div>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="h-[32px] relative rounded-[3.6px] shrink-0 w-full" data-name="Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[32px] items-center pl-[8px] pr-0 py-0 relative w-full">
          <Icon37 />
          <App5 />
        </div>
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute h-[106px] left-[1547px] rounded-[6.8px] top-[657px] w-[128px]" data-name="Primitive.div" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(107, 158, 141, 0.08) 100%), linear-gradient(90deg, rgb(245, 250, 248) 0%, rgb(245, 250, 248) 100%)" }}>
      <div className="box-border content-stretch flex flex-col h-[106px] items-start overflow-clip pb-px pt-[5px] px-[5px] relative rounded-[inherit] w-[128px]">
        <MenuItem />
        <MenuItem1 />
        <MenuItem2 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_0px_inset_rgba(255,255,255,0.5),0px_1px_0px_0px_inset_rgba(255,255,255,0.8)]" />
      <div aria-hidden="true" className="absolute border border-[#c5dfd6] border-solid inset-0 pointer-events-none rounded-[6.8px] shadow-[0px_4px_12px_0px_rgba(107,125,158,0.15)]" />
    </div>
  );
}

export default function Wordfall() {
  return (
    <div className="bg-white relative size-full" data-name="Wordfall">
      <App1 />
      <Text55 />
      <App2 />
      <Text56 />
      <PrimitiveDiv1 />
    </div>
  );
}