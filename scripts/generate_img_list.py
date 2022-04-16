from pathlib import Path

images = [x for x in Path.cwd().glob("**/*-*-4*-*-*.webp")]

with open("img-list", "w") as file:
    file.write(",".join([str(x.relative_to(Path.cwd())) for x in images]))
