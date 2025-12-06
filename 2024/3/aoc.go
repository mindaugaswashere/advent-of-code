package main

import (
	"errors"
	"fmt"
	"os"
	"strings"
)

func main() {
	lines, err := ReadLines("", false)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println(ErrNotFound)
			os.Exit(1)
		}
		panic(err)
	}
	fmt.Printf("Read %d lines\n", len(lines))
	fmt.Println(lines[1])
	blocks := SplitBlocks(strings.Join(lines, "\n"))
	_ = blocks // use blocks for puzzle parts as needed
	if len(lines) > 0 {
		line := lines[0]
		digitCount := 0
		// Iterate over each byte (ASCII assumed)
		for i := 0; i < len(line); i++ {
			b := line[i]
			if b >= '0' && b <= '9' { digitCount++ }
			// Example: print first 20 chars positions
			if i < 20 {
				fmt.Printf("[%d]%c ", i, b)
			}
		}
		if len(line) > 20 { fmt.Print("...") }
		fmt.Printf("\nDigits in first line: %d\n", digitCount)
	}
}

