package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func main() {
	password := "password123"
	hash := sha256.Sum256([]byte(password))
	fmt.Printf("SHA256 of '%s': %s\n", password, hex.EncodeToString(hash[:]))
}
