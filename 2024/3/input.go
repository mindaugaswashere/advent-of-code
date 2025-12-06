package main

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

// openFile tries to open a path relative to the executable working directory.
// If the provided path is a directory, it appends "input.txt" which is the common AoC pattern.
func openFile(path string) (*os.File, error) {
	if path == "" { // default convention: local input.txt
		path = "input.txt"
	}
	info, err := os.Stat(path)
	if err == nil && info.IsDir() {
		path = filepath.Join(path, "input.txt")
	}
	f, err := os.Open(path) // #nosec G304 -- acceptable for AoC convenience
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err)
	}
	return f, nil
}

// ReadAll returns the whole file contents as a string. Trims a single trailing newline for convenience.
func ReadAll(path string) (string, error) {
	f, err := openFile(path)
	if err != nil {
		return "", err
	}
	defer f.Close()
	b, err := io.ReadAll(f)
	if err != nil {
		return "", err
	}
	s := string(b)
	s = strings.TrimSuffix(s, "\n")
	return s, nil
}

// MustReadAll panics on error. Handy for quick puzzle scripts.
func MustReadAll(path string) string {
	s, err := ReadAll(path)
	if err != nil { panic(err) }
	return s
}

// ReadLines reads the file and returns non-empty lines (keeping empty if keepEmpty=true).
func ReadLines(path string, keepEmpty bool) ([]string, error) {
	f, err := openFile(path)
	if err != nil { return nil, err }
	defer f.Close()
	var lines []string
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		line := sc.Text()
		if !keepEmpty && line == "" { continue }
		lines = append(lines, line)
	}
	if err := sc.Err(); err != nil { return nil, err }
	if lines == nil { return []string{}, nil }
	return lines, nil
}

// MustReadLines panics on error.
func MustReadLines(path string, keepEmpty bool) []string {
	l, err := ReadLines(path, keepEmpty)
	if err != nil { panic(err) }
	return l
}

// SplitBlocks splits input into blocks separated by blank lines.
func SplitBlocks(s string) []string {
	if s == "" { return []string{} }
	parts := strings.Split(s, "\n\n")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.Trim(p, "\n")
		if p != "" { out = append(out, p) }
	}
	return out
}

// ErrNotFound indicates file missing convenience.
var ErrNotFound = errors.New("input file not found")

// Exists returns true if the path exists.
func Exists(path string) bool {
	if path == "" { path = "input.txt" }
	_, err := os.Stat(path)
	return err == nil
}
