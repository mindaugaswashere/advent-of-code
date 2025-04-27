const std = @import("std");
const ArrayList = std.ArrayList;
const print = std.debug.print;

const Pair = struct { first: i32, second: i32 };

pub fn main() !void {
    // Get an allocator
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Create an ArrayList to store the pairs
    var pairs = ArrayList(Pair).init(allocator);
    defer pairs.deinit();

    // Open file
    const file = try std.fs.cwd().openFile("input.txt", .{});
    defer file.close();

    var buf_reader = std.io.bufferedReader(file.reader());
    var in_stream = buf_reader.reader();

    // Buffer for long reading lines
    var buf: [1024]u8 = undefined;

    while (try in_stream.readUntilDelimiterOrEof(&buf, '\n')) |line| {
        // Print the raw line
        print("Line: '{s}'\n", .{line});

        var iter = std.mem.tokenizeAny(u8, line, " \t");

        // Parse the first number
        const first_str = iter.next() orelse continue;
        print("First token: '{s}'\n", .{first_str});
        const first = try std.fmt.parseInt(i32, first_str, 10);

        // Parse the second number
        const second_str = iter.next() orelse continue;
        print("Second token: '{s}', length: {d}\n", .{ second_str, second_str.len });

        // Print each character code for debugging
        for (second_str, 0..) |char, index| {
            print("  Char at {d}: '{c}' (code: {d})\n", .{ index, char, char });
        }

        const second = try std.fmt.parseInt(i32, second_str, 10);

        // Add the pair to our list
        try pairs.append(Pair{ .first = first, .second = second });
    }

    for (pairs.items, 0..) |pair, i| {
        print("Pair {d}: {d}, {d}\n", .{ i, pair.first, pair.second });
    }
}
