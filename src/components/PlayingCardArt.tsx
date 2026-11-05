// Original object studies drawn for this deck. No stock icons or generated images.
export function CardArtwork({ index }: { index: number }) {
  return (
    <svg
      className={`card-art art-${index}`}
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {index === 0 && (
          <>
            {/* An index cabinet, with real enclosing sides and two record drawers. */}
            <path className="art-tone" d="m40 68 67-23 36 26-68 24Z" />
            <path className="art-solid" d="m75 95 68-24v75l-68 25Z" />
            <path className="art-paper" d="m40 68 35 27v76l-35-28Z" />
            <path
              className="art-paper"
              d="m83 94 51-18v27l-51 18Zm0 32 51-18v29l-51 18Z"
            />
            <path d="m99 94 19-7v8l-19 7Zm0 33 19-7v8l-19 7Z" />
            <path
              d="m49 80 17 13m-17-7 17 13m-17-7 17 13m-17-7 17 13m-17-7 17 13"
              className="art-hatch"
            />
            <path
              className="art-paper"
              d="m53 66 1-26 13-5 6 4 35-12 18 13-1 16-50 18Z"
            />
            <path
              d="m61 47 38-13m-38 20 46-16m-38 19 43-14"
              className="art-hatch"
            />
            <path className="art-accent" d="m90 144 5 3 10-12" />
            <path className="art-ground" d="m42 159 32 23 70-26m-60 28 48-17" />
          </>
        )}
        {index === 1 && (
          <>
            {/* Two paper receipts and a single-event stamp. No invented figures. */}
            <path
              className="art-tone"
              d="m47 45 63-12 22 125-8-3-6 6-8-3-6 6-8-3-6 6-8-3-6 6Z"
            />
            <path
              className="art-paper"
              d="m57 30 69 9-15 132-7-5-7 3-6-5-7 3-6-5-7 3-6-5-8 3Z"
            />
            <path d="m70 49 42 5m-44 8 25 3m-27 12 42 5" />
            <path
              d="m65 90 25 3m8 1 8 1m-43 10 25 3m8 1 8 1m-43 10 25 3m8 1 8 1"
              className="art-hatch"
            />
            <path d="m63 133 37 5m-38 4 37 5" />
            <circle className="art-accent art-paper" cx="119" cy="121" r="22" />
            <circle className="art-accent" cx="119" cy="121" r="17" />
            <path
              className="art-accent"
              d="m110 121 6 6 12-13"
              strokeWidth="2.2"
            />
            <path d="m43 71 7 57m-11-41 6 42" className="art-hatch" />
            <path className="art-ground" d="m41 178 68 8 30-10m-85 9 49 6" />
          </>
        )}
        {index === 2 && (
          <>
            {/* A mechanical alarm clock and a folded reminder. */}
            <path
              className="art-tone"
              d="m47 51-8-9c-10-12 7-27 19-18l12 9Zm58-18 12-9c12-9 29 6 19 18l-8 9Z"
            />
            <path d="m46 45 7 9m66 0 8-9M82 25h13m-7 0v11" />
            <circle className="art-tone" cx="87" cy="94" r="54" />
            <circle className="art-paper" cx="84" cy="91" r="49" />
            <circle cx="84" cy="91" r="43" />
            <path d="M84 55v5m0 62v5m-36-36h5m62 0h5M60 67l3 3m42 42 3 3m0-48-3 3m-42 42-3 3" />
            <path d="M84 64v27l19 11" strokeWidth="2.3" />
            <circle className="art-solid" cx="84" cy="91" r="3" />
            <path d="m52 137-8 17h10l10-12m44-3 9 15h11l-13-23" />
            <path className="art-paper" d="m118 112 34 8-10 43-34-8Z" />
            <path
              className="art-accent"
              d="m122 132 5 7 12-12"
              strokeWidth="2"
            />
            <path d="m117 147 17 4" className="art-hatch" />
            <path className="art-ground" d="M37 169h104m-91 6h73" />
          </>
        )}
        {index === 3 && (
          <>
            {/* A solid padlock and cut key, rather than a floating shield. */}
            <path
              className="art-tone"
              d="M51 91V62a36 36 0 0 1 72 0v29h-13V62a23 23 0 0 0-46 0v29Z"
            />
            <path d="M58 81V61a29 29 0 0 1 58 0v20" className="art-hatch" />
            <path className="art-solid" d="m48 91 12-8h78v62l-12 9H48Z" />
            <rect
              className="art-paper"
              x="44"
              y="89"
              width="82"
              height="65"
              rx="5"
            />
            <rect
              x="50"
              y="95"
              width="70"
              height="53"
              rx="2"
              className="art-hatch"
            />
            <path
              className="art-accent art-tone"
              d="M91 112a7 7 0 1 0-11 6l-2 13h15l-3-13a7 7 0 0 0 1-6Z"
            />
            <path d="M108 106v29m4-24v24m4-19v19" className="art-hatch" />
            <g transform="rotate(-29 121 155)">
              <circle className="art-paper" cx="120" cy="144" r="13" />
              <circle cx="120" cy="144" r="6" />
              <path
                className="art-paper"
                d="M116 157v27h15v-7h-7v-6h6v-7h-6v-7Z"
              />
            </g>
            <path className="art-ground" d="M37 169h68m-56 5h43" />
          </>
        )}
        {index === 4 && (
          <>
            {/* A stopwatch with a proper dial and a short timing arc. */}
            <path className="art-tone" d="M78 27h22v13H78Z" />
            <path d="M82 22h14v5m-17 7h20m-18-4v6m4-6v6m5-6v6m5-6v6m21 19 9-11 8 7-8 11" />
            <circle className="art-tone" cx="94" cy="110" r="56" />
            <circle className="art-paper" cx="88" cy="106" r="56" />
            <circle cx="88" cy="106" r="48" />
            <path d="M88 64v7m21-1-3 6m18 9-6 3m12 18h-7m1 21-6-3m-9 18-3-6m-18 12v-7m-21 1 3-6m-18-9 6-3m-12-18h7m-1-21 6 3m9-18 3 6" />
            <path
              className="art-accent"
              d="M88 64a42 42 0 0 1 36 21"
              strokeWidth="4"
            />
            <path d="m88 106 28-22m-28 22-7 6" strokeWidth="2.4" />
            <circle className="art-solid" cx="88" cy="106" r="4" />
            <circle cx="88" cy="129" r="10" />
            <path d="M88 123v7l4 2" strokeWidth="1" />
            <path className="art-ground" d="M41 177h105m-88 6h69" />
          </>
        )}
        {index === 5 && (
          <>
            {/* A bolted rack case: vents, a recessed face and one status lamp. */}
            <path className="art-tone" d="m39 48 70-17 37 26-71 18Z" />
            <path className="art-solid" d="m75 75 71-18v91l-71 21Z" />
            <path className="art-paper" d="m39 48 36 27v94l-36-29Z" />
            <path
              className="art-paper"
              d="m82 81 56-15v22l-56 16Zm0 31 56-16v22l-56 17Zm0 32 56-17v21l-56 17Z"
            />
            <path
              d="m91 84 31-8m-31 13 31-8m-31 34 31-9m-31 14 31-9m-31 35 31-9m-31 14 31-9"
              className="art-hatch"
            />
            <path d="M47 73v53m5-49v53m5-49v53m5-49v53" className="art-hatch" />
            <path
              className="art-accent"
              d="m130 78 3-1v5l-3 1Z"
              strokeWidth="2"
            />
            <path d="m130 109 3-1m-3 32 3-1" />
            <path
              d="m80 78 2-1m57-13 2-1m-61 81 2-1m57-16 2-1"
              strokeWidth="2"
            />
            <path className="art-ground" d="m39 155 35 27 70-21m-62 25 49-15" />
          </>
        )}
      </g>
    </svg>
  );
}
