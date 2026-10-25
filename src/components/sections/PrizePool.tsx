import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { boltOnReveal, popIn } from "../../lib/animations";

interface PrizeCardData {
	amount: string;
	title: string;
	fileId: string;
	accessLevel: string;
	icon: string;
	isGrand?: boolean;
	fontSize?: string;
}

const prizes: PrizeCardData[] = [
	{
		amount: "Certificates",
		title: "COMPETITIONS",
		fileId: "#FILE_001",
		accessLevel: "ACCESS_LEVEL: ALPHA",
		icon: "/images/prize-icon-1.png",
		fontSize: "text-2xl sm:text-3xl md:text-4xl lg:text-[26px] xl:text-4xl 2xl:text-5xl",
	},
	{
		amount: "₹5,00,000+",
		title: "",
		fileId: "#SYSTEM_ROOT",
		accessLevel: "TOTAL_POOL_RESERVE",
		icon: "/images/prize-icon-2.png",
		isGrand: true,
		fontSize: "text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
	},
	{
		amount: "Goodies",
		title: "FUN EVENTS",
		fileId: "#FILE_003",
		accessLevel: "ACCESS_LEVEL: BETA",
		icon: "/images/prize-icon-3.png",
		fontSize: "text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
	},
];

function PrizeCard({ prize, index }: { prize: PrizeCardData; index: number }) {
	const cardRef = useRef<HTMLDivElement>(null);
	const inView = useInView(cardRef, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={cardRef}
			custom={index}
			variants={boltOnReveal}
			initial="hidden"
			animate={inView ? "visible" : "hidden"}
			whileHover={{ y: -8, transition: { duration: 0.2 } }}
			className={`
        border-4 border-hack-black h-80 md:h-[404px] relative p-6 md:p-8 flex flex-col justify-between
        transition-transform
        ${prize.isGrand ? "bg-hack-red shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000]" : "bg-hack-yellow"}
      `}
		>
			{/* HUD bracket — top left */}
			<div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-hack-black pointer-events-none" />
			{/* HUD bracket — bottom right */}
			<div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-hack-black pointer-events-none" />

			{/* Top row: icon + file ID */}
			<div className="flex justify-between items-start">
				<motion.img
					src={prize.icon}
					alt=""
					className="h-8 md:h-[50px] w-auto opacity-90"
					variants={popIn}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
				/>
				{prize.isGrand ? (
					<div className="bg-white px-2 py-0.5">
						<span className="font-mono font-bold text-[10px] md:text-xs text-hack-black">{prize.fileId}</span>
					</div>
				) : (
					<span className="font-mono text-[10px] md:text-xs text-black/40">{prize.fileId}</span>
				)}
			</div>

			{/* Middle: Amount + Title */}
			<div className="my-auto flex flex-col justify-center">
				<div
					className={`font-display font-bold tracking-tight leading-none ${prize.fontSize}
            ${prize.isGrand ? "text-white" : "text-hack-black"}`}
				>
					{prize.amount}
				</div>
				{prize.title && (
					<div
						className={`font-body font-black text-[10px] sm:text-xs md:text-sm lg:text-base tracking-widest uppercase mt-3 md:mt-4
            ${prize.isGrand ? "text-white" : "text-hack-black"}`}
					>
						{prize.title}
					</div>
				)}
			</div>

			{/* Bottom: Access level */}
			<div className="mt-auto">
				{prize.isGrand ? (
					<div className="bg-hack-black inline-block px-3 md:px-4 py-1.5 md:py-2">
						<span className="font-body font-black text-[10px] md:text-sm text-hack-yellow uppercase">{prize.accessLevel}</span>
					</div>
				) : (
					<div className="border-t-2 border-black/20 pt-3 md:pt-[18px]">
						<span className="font-mono text-[10px] md:text-xs text-black/60">{prize.accessLevel}</span>
					</div>
				)}
			</div>
		</motion.div>
	);
}

export default function PrizePool() {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			id="prize-pool"
			className="bg-white border-t-[8px] md:border-t-[16px] border-b-[8px] md:border-b-[16px] border-hack-black
        py-16 md:py-28 px-4 md:px-6"
		>
			<div className="max-w-7xl w-full mx-auto">
				{/* Heading row */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-20 gap-4">
					<motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.12 }}>
						<h2
							className="font-display font-bold text-[40px] sm:text-[60px] md:text-[9vw] lg:text-[120px] xl:text-[160px]
              leading-none tracking-tighter uppercase text-hack-black"
						>
							REWARD_FILES
						</h2>
					</motion.div>

					{/* Encryption metadata */}
					<div className="font-mono text-[10px] md:text-xs text-black/50 md:text-right leading-relaxed pb-2 md:pb-4 shrink-0">
						<div>ENCRYPTION:</div>
						<div>AES_256</div>
						<div>SOURCE:</div>
						<div>CENTRAL_VAULT</div>
					</div>
				</div>

				{/* Prize cards grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{prizes.map((prize, i) => (
						<PrizeCard key={prize.title} prize={prize} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
