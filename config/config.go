package config

type Config struct {
	ThemeName     string          `json:"themeName"`
	Default       ColorsCfgStrict `json:"default"`
	UnorderedList ColorsCfgAlt    `json:"unorderedList"`
}

type ColorsCfgStrict struct {
	FgColor string `json:"fgColor"`
	BgColor string `json:"bgColor"`
}

type ColorsCfgAlt struct {
	FgColor string `json:"fgColor"`
	BgColor string `json:"bgColor,omitempty"`
}

var ConfigTpl = Config{
	ThemeName: "{theme_name}",
	Default: ColorsCfgStrict{
		FgColor: "{hex_color}",
		BgColor: "{hex_color}",
	},
	UnorderedList: ColorsCfgAlt{
		FgColor: "{hex_color}",
	},
}
