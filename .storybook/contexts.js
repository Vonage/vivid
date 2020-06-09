import { ThemeProvider } from "style-components";
import { defaultTheme, darkTheme } from "";

export const contexts = [
	(icon: "box"),
	(title: "Themes"),
	(components: [ThemeProvider]),
	(params: [
		{
			name: "Default theme",
			props: { theme: defaultTheme, default: true },
		}
	]),
	(options: {
		deep: true,
		disable: false,
		cancelable: false,
	}),
];
