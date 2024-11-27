//@ts-nocheck

import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Box, SxProps } from "@mui/material";
interface ClockProps {
	className?: string;
	sx?: SxProps
	deadline?: string
	setExpiry?: any
}
export default function CountdownClock(props: ClockProps) {
	const { className, sx, deadline, setExpiry } = props;
	
	const ref = useRef();
	const spanRef = useRef();
	useEffect(() => {
		console.clear();
		function CountdownTracker(label, value) {
			let el = document.createElement("span");
			el.className = "flip-clock__piece";
			el.innerHTML =
				'<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
				'<span class="flip-clock__slot">' +
				label +
				"</span>";
			this.el = el;
			let top = el.querySelector(".card__top"),
				bottom = el.querySelector(".card__bottom"),
				back = el.querySelector(".card__back"),
				backBottom = el.querySelector(".card__back .card__bottom");
			this.update = function (val) {
				val = ("0" + val).slice(-2);
				if (val !== this.currentValue) {
					if (this.currentValue >= 0) {
						back.setAttribute("data-value", this.currentValue);
						bottom.setAttribute("data-value", this.currentValue);
					}
					this.currentValue = val;
					top.innerText = this.currentValue;
					backBottom.setAttribute("data-value", this.currentValue);

					this.el.classList.remove("flip");
					void this.el.offsetWidth;
					this.el.classList.add("flip");
				}
			};

			this.update(value);
		}

		function getTimeRemaining(endtime) {
			let t = Date.parse(endtime) - Date.parse(new Date());
			return {
				Total: t,
				Days: Math.floor(t / (1000 * 60 * 60 * 24)),
				Hours: Math.floor((t / (1000 * 60 * 60)) % 24),
				Mins: Math.floor((t / 1000 / 60) % 60),
				Secs: Math.floor((t / 1000) % 60),
			};
		}

		function getTime() {
			let t = new Date();
			return {
				Total: t,
				Hours: t.getHours() % 12,
				Minutes: t.getMinutes(),
				Seconds: t.getSeconds(),
			};
		}

		function Clock(countdown, callback) {
			countdown = countdown ? new Date(Date.parse(countdown)) : false;
			callback = callback || function () { };

			let updateFn = countdown ? getTimeRemaining : getTime;

			this.el = ref.current;
			this.el.className = "flip-clock";

			let trackers = {},
				t = updateFn(countdown),
				key,
				timeinterval;
			for (key in t) {
				if (key === "Total") {
					continue;
				}
				trackers[key] = new CountdownTracker(key, t[key]);
				this.el.appendChild(trackers[key].el);
			}
			let i = 0;
			function updateClock() {
				timeinterval = requestAnimationFrame(updateClock);

				if (i++ % 10) {
					return;
				}

				let t = updateFn(countdown);
				if (t.Total < 0) {
					cancelAnimationFrame(timeinterval);
					for (key in trackers) {
						trackers[key].update(0);
					}
					callback();
					return;
				}

				for (key in trackers) {
					trackers[key].update(t[key]);
				}
			}

			setTimeout(updateClock, 500);
		}
		const date = new Date(Number(deadline));
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hour = String(date.getHours()).padStart(2, '0');
		const minute = String(date.getMinutes()).padStart(2, '0');
		const second = String(date.getSeconds()).padStart(2, '0');
		const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
		
		let c = new Clock(dateString, function () {
			setExpiry(true);
		});

	}, []);
	return (
		<Box className={className}>
			<Box className={className} sx={{ width: "100%", ...sx }} ref={ref} id="cus-clock" />
		</Box>

	);
}
