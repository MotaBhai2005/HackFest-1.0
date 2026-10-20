import { useState } from 'react';

// Chamfer, hard-step wipe, border flash, and CRT cursor from the original event cards.
export default function ProtocolLink({ href, children }: { href: string; children: string }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className="relative mt-4 pt-2 cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
			{/* Outer red border + chamfer — hard yellow outline pulse on hover */}
			<div
				className="bg-hack-red p-[2px]"
				style={{
					clipPath: hovered ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)" : "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
					transition: "clip-path 0ms step-end",
					animation: hovered ? "protocol-border-flash 0.45s steps(2, end) infinite" : "none",
				}}
			>
				<a
                    href={href}
                    aria-label={children}
					className="relative w-full block font-mono font-bold text-xs sm:text-sm
            py-3 md:py-3.5 uppercase overflow-hidden outline-none"
					style={{
						clipPath: hovered ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)" : "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
						background: "#000",
						color: hovered ? "#ffffff" : "#c00100",
						transition: "color 0ms step-end",
					}}
				>
					{/* Step-wipe red fill — animates scaleX 0→1 on hover */}
					<div
						aria-hidden
						style={{
							position: "absolute",
							inset: 0,
							background: "#c00100",
							transformOrigin: "left center",
							animation: hovered ? "protocol-fill-wipe 0.08s steps(8, end) forwards" : "none",
							transform: hovered ? undefined : "scaleX(0)",
							zIndex: 0,
						}}
					/>

					{/* Scanline sweep bar */}
					<div
						aria-hidden
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: 3,
							height: "100%",
							background: "rgba(255,255,255,0.5)",
							zIndex: 2,
							pointerEvents: "none",
							animation: hovered ? "protocol-scanbar 0.1s steps(10, end) forwards" : "none",
							transform: "translateX(-100%)",
						}}
					/>

					{/* Text layer — always above fill */}
					<span style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "0.1em" }}>
						{!hovered && <span>{children} ↗</span>}
						{hovered && (
							<span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#ffffff", letterSpacing: "0.12em" }}>
								ACCESSING
								{/* CRT block cursor — hard blink */}
								<span
									style={{
										display: "inline-block",
										width: 7,
										height: "1em",
										background: "#ffffff",
										verticalAlign: "text-bottom",
										marginLeft: 1,
										flexShrink: 0,
										animation: "protocol-crt-blink 0.5s steps(1, end) infinite",
									}}
								/>
							</span>
						)}
					</span>
				</a>
			</div>
		</div>
	);
}
