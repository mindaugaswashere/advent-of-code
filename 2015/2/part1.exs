defmodule MyTestScript do

  def say_hi do
    read_file() |> IO.inspect()
  end

  def read_file do
    case File.read("input.txt") do
      {:ok, body} ->
        body
        |> String.split("x")
      {:error, reason} -> reason |> IO.puts()
    end
  end
end

MyTestScript.say_hi
