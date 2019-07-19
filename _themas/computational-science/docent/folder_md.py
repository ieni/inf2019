import os

output_file = "files.md"
relative_path = "docent/"


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
        output.write("* %s [%s](%s){:target=\"_blank\"}\n" % (icon, base_name, file_location))

    output.write("\n")


with open("files.md", 'w+') as output:
    folder_2_md("h1/", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>")

    folder_2_md("h2/NetLogo_uitwerkingen", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>")
    folder_2_md("h2/NetLogo_extra", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>")

    folder_2_md("h3/", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>")
    folder_2_md("h3/NetLogo_uitwerkingen", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>", prefix="H3opg", prefix_replace="Opdracht ")

    folder_2_md("po/", output, icon="<i class=\"fa fa-file\" aria-hidden=\"true\"></i>")
