import {
	ETWalkSprite_A0,
	ETWalkSprite_A1,
	ETWalkSprite_A2,
	ETWalkSprite_B0,
	ETWalkSprite_B1,
	ETWalkSprite_B2,
	ETExtensionSprite_A0,
	ETExtensionSprite_A1,
	ETExtensionSprite_A2,
	ETExtensionSprite_B0,
	ETExtensionSprite_B1,
	ETExtensionSprite_B2,
} from "./assets/visual";
import { byteToBinaryString } from "./lib/utils";

/****************************************
 * ET Walk Animation
 */

const ET_Walk_A0 = byteToBinaryString(ETWalkSprite_A0)
const ET_Walk_A1 = byteToBinaryString(ETWalkSprite_A1)
const ET_Walk_A2 = byteToBinaryString(ETWalkSprite_A2)

const ET_Walk_B0 = byteToBinaryString(ETWalkSprite_B0)
const ET_Walk_B1 = byteToBinaryString(ETWalkSprite_B1)
const ET_Walk_B2 = byteToBinaryString(ETWalkSprite_B2)

const ET_Walk_combined_0: string[][] = []
for (let i = 0; i < ET_Walk_A0.length; i++) {
	ET_Walk_combined_0.push(ET_Walk_A0[i], ET_Walk_B0[i]);
}

const ET_Walk_combined_1: string[][] = []
for (let i = 0; i < ET_Walk_A1.length; i++) {
	ET_Walk_combined_1.push(ET_Walk_A1[i], ET_Walk_B1[i]);
}

const ET_Walk_combined_2: string[][] = []
for (let i = 0; i < ET_Walk_A2.length; i++) {
	ET_Walk_combined_2.push(ET_Walk_A2[i], ET_Walk_B2[i]);
}

export const ET_Walk = [ET_Walk_combined_0, ET_Walk_combined_1, ET_Walk_combined_2];

/****************************************
 * ET Head Extension animation
 */

const ET_Extension_A0 = byteToBinaryString(ETExtensionSprite_A0)
const ET_Extension_A1 = byteToBinaryString(ETExtensionSprite_A1)
const ET_Extension_A2 = byteToBinaryString(ETExtensionSprite_A2)

const ET_Extension_B0 = byteToBinaryString(ETExtensionSprite_B0)
const ET_Extension_B1 = byteToBinaryString(ETExtensionSprite_B1)
const ET_Extension_B2 = byteToBinaryString(ETExtensionSprite_B2)

const ET_Extension_combined_0: string[][] = []
for (let i = 0; i < ET_Extension_A0.length; i++) {
	ET_Extension_combined_0.push(ET_Extension_A0[i], ET_Extension_B0[i]);
}

const ET_Extension_combined_1: string[][] = []
for (let i = 0; i < ET_Extension_A1.length; i++) {
	ET_Extension_combined_1.push(ET_Extension_A1[i], ET_Extension_B1[i]);
}

const ET_Extension_combined_2: string[][] = []
for (let i = 0; i < ET_Extension_A2.length; i++) {
	ET_Extension_combined_2.push(ET_Extension_A2[i], ET_Extension_B2[i]);
}

export const ET_Extension = [
	ET_Extension_combined_0,
	ET_Extension_combined_1,
	ET_Extension_combined_2,
	ET_Extension_combined_1,
	ET_Extension_combined_0,
];