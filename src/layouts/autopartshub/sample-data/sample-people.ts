import anaSilva from "./images/person-ana-silva.jpg";
import diegoAlvarez from "./images/person-diego-alvarez.jpg";
import ethanBrooks from "./images/person-ethan-brooks.jpg";
import graceOkafor from "./images/person-grace-okafor.jpg";
import jamesWhitaker from "./images/person-james-whitaker.jpg";
import lucasFerreira from "./images/person-lucas-ferreira.jpg";
import marcusLee from "./images/person-marcus-lee.jpg";
import mayaPatel from "./images/person-maya-patel.jpg";
import oliviaBennett from "./images/person-olivia-bennett.jpg";
import priyaShah from "./images/person-priya-shah.jpg";
import sofiaReyes from "./images/person-sofia-reyes.jpg";
import tomBecker from "./images/person-tom-becker.jpg";

/*
 * Photos of some of the made-up people at AutoParts Co., by name, so the avatars mix photos and initials as a real
 * company's would. Everyone else shows their initials. The same person has the same photo everywhere: Share, "@" in
 * comments, the reviewers' comments and the notifications. Credits in `images/CREDITS.md`.
 */
const photos: Record<string, string> = {
	"Priya Shah": priyaShah,
	"Marcus Lee": marcusLee,
	"Tom Becker": tomBecker,
	"Ana Silva": anaSilva,
	"Diego Alvarez": diegoAlvarez,
	"Lucas Ferreira": lucasFerreira,
	"Maya Patel": mayaPatel,
	"Sofia Reyes": sofiaReyes,
	"Ethan Brooks": ethanBrooks,
	"Grace Okafor": graceOkafor,
	"Olivia Bennett": oliviaBennett,
	"James Whitaker": jamesWhitaker,
};

/** The person's photo, or `undefined` (their initials show). */
export const samplePersonPhoto = (name: string): string | undefined => photos[name];
