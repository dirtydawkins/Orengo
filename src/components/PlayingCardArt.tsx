// Original, code-drawn artwork. All six designs share an engraved line language.
export function CardArtwork({ index }: { index: number }) {
  return (
    <svg
      className={`card-art art-${index}`}
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="art-frame" strokeWidth=".7">
        <path d="M90 8 166 100 90 192 14 100Z" />
        <path d="M90 17 158 100 90 183 22 100Z" />
        <path d="M90 0v14M90 186v14M0 100h20M160 100h20" />
        <circle cx="90" cy="100" r="70" />
      </g>
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {index === 0 && (
          <>
            <path d="M90 35v24M90 141v24M42 100H25M138 100h17" />
            <path d="M52 78V66l38-18 38 18v12M52 122v12l38 18 38-18v-12" />
            <ellipse cx="90" cy="76" rx="34" ry="12" />
            <path d="M56 76v46c0 16 68 16 68 0V76M56 91c0 16 68 16 68 0M56 107c0 16 68 16 68 0" />
            <path d="M42 66 27 52M138 66l15-14M42 134l-15 14M138 134l15 14" />
            <circle cx="24" cy="49" r="5" />
            <circle cx="156" cy="49" r="5" />
            <circle cx="24" cy="151" r="5" />
            <circle cx="156" cy="151" r="5" />
            <path className="art-cobalt" d="m78 109 8 8 17-20" />
          </>
        )}
        {index === 1 && (
          <>
            <path d="m61 48-7-22 23 13 13-23 13 23 23-13-7 22ZM63 55h54M64 145h52l8 24-21-12-13 23-13-23-21 12Z" />
            <path d="m90 63 35 37-35 37-35-37Z" />
            <path d="m90 77 22 23-22 23-22-23Z" />
            <path d="M31 79h22M127 79h22M31 121h22M127 121h22" />
            <circle cx="28" cy="79" r="4" />
            <circle cx="152" cy="79" r="4" />
            <circle cx="28" cy="121" r="4" />
            <circle cx="152" cy="121" r="4" />
            <path
              className="art-cobalt"
              d="m83 99 6 6 12-13M33 100h12m-5-5 5 5-5 5M147 100h-12m5-5-5 5 5 5"
            />
          </>
        )}
        {index === 2 && (
          <>
            <path d="m62 42-7-18 23 13 12-20 12 20 23-13-7 18ZM64 49h52" />
            <path d="M90 63c-15-19-34-2-25 12l25 24 25-24c9-14-10-31-25-12Z" />
            <path d="M90 102v17M70 134H48v-34H29M110 134h22v-34h19M90 152v23M48 134v29M132 134v29" />
            <circle cx="90" cy="135" r="17" />
            <path className="art-cobalt" d="M90 125v11l8 5" />
            <circle cx="48" cy="170" r="6" />
            <circle cx="132" cy="170" r="6" />
            <circle cx="24" cy="100" r="5" />
            <circle cx="156" cy="100" r="5" />
            <path d="M43 64v13H29M137 64v13h14" />
          </>
        )}
        {index === 3 && (
          <>
            <path d="m90 33 49 21v44c0 32-24 55-49 70-25-15-49-38-49-70V54Z" />
            <path d="m90 43 39 17v38c0 26-19 47-39 60-20-13-39-34-39-60V60Z" />
            <rect x="69" y="84" width="42" height="37" rx="3" />
            <path d="M77 84V72a13 13 0 0 1 26 0v12" />
            <circle className="art-cobalt" cx="90" cy="100" r="4" />
            <path className="art-cobalt" d="M90 104v7" />
            <path d="M24 70h10M146 70h10M26 130h12M142 130h12M90 18v8M90 174v8" />
            <path d="m16 100 8-8 8 8-8 8Zm132 0 8-8 8 8-8 8Z" />
          </>
        )}
        {index === 4 && (
          <>
            <path d="M51 79c-3-27-17-36-26-35 18-19 36-10 42 9 1-23 12-36 23-42 11 6 22 19 23 42 6-19 24-28 42-9-9-1-23 8-26 35Z" />
            <circle cx="22" cy="43" r="5" />
            <circle cx="90" cy="13" r="5" />
            <circle cx="158" cy="43" r="5" />
            <path d="M53 84h74M57 89c0 39 15 50 33 59 18-9 33-20 33-59" />
            <path d="m66 104 12-6 7 13M114 104l-12-6-7 13M72 122q18 21 36 0" />
            <path d="m90 153-17 20 17 18 17-18ZM49 143l-18 18 13 15M131 143l18 18-13 15" />
            <path
              className="art-cobalt"
              d="m41 130 18-15 15 6 20-34 15 5 23-28M124 64h8v8"
            />
          </>
        )}
        {index === 5 && (
          <>
            <path d="M70 41c-10-16-29-5-26 8-16-4-19 19-5 21h102c14-2 11-25-5-21 3-13-16-24-26-8-4-20-36-20-40 0Z" />
            <path className="art-cobalt" d="M90 60v25m-7-8 7 8 7-8" />
            <rect x="48" y="94" width="84" height="22" rx="2" />
            <rect x="48" y="123" width="84" height="22" rx="2" />
            <path d="M64 101h26M64 130h26M59 155h62M90 146v24M60 177h60" />
            <circle cx="114" cy="105" r="3" />
            <circle cx="114" cy="134" r="3" />
            <path d="M30 94v51M150 94v51M23 104h14M143 135h14" />
            <path d="m84 177 6-6 6 6-6 6Z" />
          </>
        )}
      </g>
      <g className="art-filigree" strokeWidth=".7">
        <path d="M42 36C17 47 9 67 8 84M138 36c25 11 33 31 34 48M42 164c-25-11-33-31-34-48M138 164c25-11 33-31 34-48" />
        <path d="M90 4 86 8l4 4 4-4ZM90 188l-4 4 4 4 4-4Z" />
      </g>
    </svg>
  );
}
