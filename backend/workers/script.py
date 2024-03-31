import sys
from lucidsonicdreams import LucidSonicDream


def process_audio(input_file, output_file, style):
    L = LucidSonicDream(song=input_file, style=style)
    L.hallucinate(file_name=output_file)


if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    style = sys.argv[3]
    process_audio(input_file, output_file, style)
