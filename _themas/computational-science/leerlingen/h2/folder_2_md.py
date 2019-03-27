import os

output_file = "files.md"
relative_path = "leerlingen/h2/"

def folder_2_md(path, output, icon=None, prefix="", prefix_replace=""):
    clean_names = []
    for file_name in os.listdir(path):
        base, ext = os.path.splitext(file_name)
        clean_name = base.replace(prefix, "").split("_")
        clean_name[0] = clean_name[0].zfill(2)
        base = " ".join(clean_name)
        clean_names.append(prefix_replace + base + ext)

    folder = zip(clean_names, os.listdir(path))
    for clean_name, file_location in sorted(folder):
        base_name, extension = os.path.splitext(clean_name)
        if icon is None:
            icon = extension
        file_location = relative_path + path + file_location
        output.write("* %s [%s](%s)\n" % (icon, base_name, file_location))


with open("files.md", 'w+') as output:
    folder_2_md("NetLogo_opdrachten/", output, prefix="H2opg", prefix_replace="Opgave ")
    output.write("\n")
    folder_2_md("video/", output, "VID", prefix="H2opg", prefix_replace="Opgave ")
 
