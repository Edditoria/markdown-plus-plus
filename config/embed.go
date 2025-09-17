package config

import "embed"

//go:embed *.config.json
var ConfigFS embed.FS
