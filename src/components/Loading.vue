/*
 *
 * Copyright (c) 2019-present for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
<template>
	<div class="box_loader">
		<div class="pos-center" :class="{'small': small, 'big': !small}">
			<div class="spinner">
				<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle
						class="length"
						fill="none"
						stroke-width="8"
						stroke-linecap="round"
						cx="33"
						cy="33"
						r="28"
					/>
				</svg>
				<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28" />
				</svg>
				<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28" />
				</svg>
				<svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		small: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
*, *::before, *::after {
    box-sizing: border-box;
    position: relative;
}

.small {
    transform: scale(0.5, 0.5);
}

.big {
    height: 100%;
}

.box_loader {
    width: 100%;
    position: absolute;
    z-index: 999;
    background: rgba(255, 255, 255, 0.87);
    top: 0;
    left: 0;
    bottom: 0;
    text-align: center;
}

.pos-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner {
    width: 33px;
    height: 36px;
    -webkit-animation: contanim 2s linear infinite;
    animation: contanim 2s linear infinite;
    display: inline-block;
    position: relative;
}

svg {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

svg:nth-child(1) circle {
    stroke: #84ebbd;
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
    -webkit-animation: strokeanim 3s calc(0.2s * (1)) ease infinite;
    animation: strokeanim 3s calc(0.2s * (1)) ease infinite;
    -webkit-transform-origin: center center;
    transform-origin: center center;
}

svg:nth-child(2) circle {
    stroke: #67b2e7;
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
    -webkit-animation: strokeanim 3s calc(0.2s * (2)) ease infinite;
    animation: strokeanim 3s calc(0.2s * (2)) ease infinite;
    -webkit-transform-origin: center center;
    transform-origin: center center;
}

svg:nth-child(3) circle {
    stroke: #f7a800;
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
    -webkit-animation: strokeanim 3s calc(0.2s * (3)) ease infinite;
    animation: strokeanim 3s calc(0.2s * (3)) ease infinite;
    -webkit-transform-origin: center center;
    transform-origin: center center;
}

svg:nth-child(4) circle {
    stroke: #0997a6;
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
    -webkit-animation: strokeanim 3s calc(0.2s * (4)) ease infinite;
    animation: strokeanim 3s calc(0.2s * (4)) ease infinite;
    -webkit-transform-origin: center center;
    transform-origin: center center;
}

@-webkit-keyframes strokeanim {
    0% {
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 120, 300;
        stroke-dashoffset: -58.548324585;
    }

    100% {
        stroke-dasharray: 120, 300;
        stroke-dashoffset: -175.6449737549;
    }
}

@keyframes strokeanim {
    0% {
        stroke-dasharray: 1, 300;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 120, 300;
        stroke-dashoffset: -58.548324585;
    }

    100% {
        stroke-dasharray: 120, 300;
        stroke-dashoffset: -175.6449737549;
    }
}

@-webkit-keyframes contanim {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes contanim {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
