#!/bin/bash
BASE="https://thewalkerschool.static.amais.com"
mkdir -p images

# Deduplicated list of all walker images
download() {
  local url="$1"
  local filename=$(echo "$url" | sed 's/.*\/\([^\?]*\).*/\1/' | sed 's/%20/-/g' | sed 's/_[0-9]*-/_/g')
  local filepath="images/$filename"
  if [ ! -f "$filepath" ]; then
    echo "Downloading: $filename"
    curl -sL "$url" -o "$filepath" --max-time 15
    sleep 0.3
  else
    echo "Exists: $filename"
  fi
}

# We Value carousel images
download "$BASE/Curiosity-310-optimized.webp?version=638609592204830000"
download "$BASE/dignity-311-optimized.webp?version=638609592208530000"
download "$BASE/Honor-312-optimized.webp?version=638609592209330000"
download "$BASE/Kindness-309-optimized.webp?version=638609592207600000"

# Hero and video
download "$BASE/videocover2-812-optimized.webp?version=638624539321470000"

# Cutout images
download "$BASE/Emmy_Cutout-813.png?version=638624571268800000"
download "$BASE/athleticscutout-825.png?version=638625223688800000"

# We Value nav/bottom banners
download "$BASE/wevalue1_1-92-optimized.webp?version=638581952097800000"
download "$BASE/wevalue2-104-Navigation-Image_316.webp?version=638581926013630000"
download "$BASE/wevalue3-103-Bottom-Banner_315.webp?version=638581925531400000"

# Experience grid images
download "$BASE/experiencegridhomevollyball-671.jpg?version=638622691518400000"
download "$BASE/ExperienceGridPhotosHomecheercamp-673.png?version=638622691519530000"
download "$BASE/experiencegridhomeprimaryschool-672.jpg?version=638622691520430000"
download "$BASE/experiencegridhomelillilyanna-664.jpg?version=638622691521030000"
download "$BASE/experiencegridhomemiddleschoolclassroom-663.jpg?version=638622691521730000"
download "$BASE/experiencegridhomejacob-662.jpg?version=638622691522500000"
download "$BASE/experiencegridhomeavi-661.jpg?version=638622691523130000"
download "$BASE/experiencegrdhomefootballmiddleschool-660.jpg?version=638622691523730000"
download "$BASE/experiencegridhomeprimaryschoolboy-667.jpg?version=638622691525430000"
download "$BASE/experiencegridhomeupperschool-668.jpg?version=638622691526170000"
download "$BASE/experiencegridlowerschool-670.jpg?version=638622691527430000"
download "$BASE/experiencegridhomemiddleschoollocker-665.jpg?version=638622691528130000"
download "$BASE/experiencegridhomemiddleschoolcourtyard-666.jpg?version=638622691529930000"

# Campus/staff images
download "$BASE/220816_CLS_Walker_FirstDay_1429__1_min_1-316-optimized.webp?version=638609592213070000"
download "$BASE/tws_fall2022298min_1-317-optimized.webp?version=638609592214070000"
download "$BASE/tws_winterbandconcert20-563-Experience-Grid_1953.webp?version=638617421780470000"
download "$BASE/lowerschoolsciencemyles-537-Experience-Grid_1849.webp?version=638617261845170000"
download "$BASE/middleschoolboys-617-Experience-Grid_2147.webp?version=638617525839930000"
download "$BASE/tws_fall2448-980-optimized.webp?version=638677957492700000"
download "$BASE/sambradford-393.jpg?version=638612322090900000"
download "$BASE/tws_commencement-99-optimized.webp?version=638581897554100000"

# Admission gallery
download "$BASE/Admission_Gallery_2-406-Experience-Grid_1364.webp?version=638614979230400000"
download "$BASE/Admission_Gallery_3-408-Experience-Grid_1373.webp?version=638614979232530000"
download "$BASE/Admission_Gallery_6-412-Experience-Grid_1390.webp?version=638614979235700000"
download "$BASE/Admission_Gallery_7-413-Experience-Grid_1391.webp?version=638614979234730000"
download "$BASE/Admission_Gallery_8-407-Experience-Grid_1369.webp?version=638614979229630000"
download "$BASE/Admission_Gallery_10-411-Experience-Grid_1392.webp?version=638614979236370000"
download "$BASE/220816_CLS_Walker_FirstDay_1664__1___1_-421-Experience-First-Image_1417.webp?version=638614979247270000"
download "$BASE/jan-385-Experience-Grid_1302.webp?version=638612349898470000"
download "$BASE/kimmoore-389-Experience-Grid_1299.webp?version=638612349901770000"
download "$BASE/pamellakelly-388-Experience-Grid_1298.webp?version=638612349900830000"
download "$BASE/tiffanyklein-386-Experience-Grid_1301.webp?version=638612349899470000"
download "$BASE/homecoming_updated2-965.jpg?version=638627149933230000"
download "$BASE/soccergirlscelebrating-683-Experience-Grid_2371.webp?version=638622787592870000"

# Admission landing staff gallery
download "$BASE/Admission_Landing_Staff_Gallery_001-805-optimized.webp?version=638624531756630000"
download "$BASE/Admission_Landing_Staff_Gallery_002-806-optimized.webp?version=638624531755600000"
download "$BASE/Admission_Landing_Staff_Gallery_003-803-optimized.webp?version=638624531758130000"
download "$BASE/Admission_Landing_Staff_Gallery_004-804-optimized.webp?version=638624531757370000"
download "$BASE/Admission_Landing_Staff_Gallery_005-802-optimized.webp?version=638624531760370000"

# Admission experience grid
download "$BASE/admissionexperiencegrid-686-optimized.webp?version=638622787598070000"
download "$BASE/admissionexperiencegridben-685.png?version=638622787600400000"
download "$BASE/admissionexperiencegridclassroom-693.png?version=638622787599130000"
download "$BASE/admissionexperiencegridkaylin-684.png?version=638622787595000000"
download "$BASE/admissionexperiencegridlowerschool-689.png?version=638622787593600000"
download "$BASE/admissionexperiencegridprimaryschool-690.png?version=638622787596070000"
download "$BASE/admissionexperiencegridpshighfive-692.png?version=638622787599770000"
download "$BASE/admissionexperiencegridsoftball-691-optimized.webp?version=638622787597430000"
download "$BASE/admissionexperiencegridupperschool-687.png?version=638622787594200000"
download "$BASE/admissionexperiencegridus-688-optimized.webp?version=638622787596730000"
download "$BASE/tws_fall24283__1_-640.jpg?version=638622647643500000"
download "$BASE/Bitmap12-11-optimized.webp?version=638399855992230000"

# Logo
download "$BASE/WALK_2024_Logo_Horiz_Maroon_2-639-optimized.webp?version=638620945428030000"

echo "Done! Total files:"
ls -1 images/ | wc -l
