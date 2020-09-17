'use strict';

const sf_tab = {
    "130": [
        [2, 0], [4, 0], [6, 0], [8, 0], [10, 0],
        [13, 0], [16, 0], [19, 0], [22, 0], [25, 0],
        [28, 0], [31, 0], [34, 0], [37, 0], [40, 0],
        [48, 8], [56, 17], [64, 27], [72, 38], [80, 50],
        [88, 63], [96, 78],
    ],
    "140": [
        [2, 0], [4, 0], [6, 0], [8, 0], [10, 0],
        [13, 0], [16, 0], [19, 0], [22, 0], [25, 0],
        [28, 0], [31, 0], [34, 0], [37, 0], [40, 0],
        [49, 9], [58, 19], [67, 30], [76, 42], [85, 55],
        [94, 69], [103, 85],
    ],
    "150": [
        [2, 0], [4, 0], [6, 0], [8, 0], [10, 0],
        [13, 0], [16, 0], [19, 0], [22, 0], [25, 0],
        [28, 0], [31, 0], [34, 0], [37, 0], [40, 0],
        [51, 10], [62, 21], [73, 33], [84, 46], [95, 60],
        [106, 75], [117, 92],
    ],
    "160": [
        [2, 0], [4, 0], [6, 0], [8, 0], [10, 0],
        [13, 0], [16, 0], [19, 0], [22, 0], [25, 0],
        [28, 0], [31, 0], [34, 0], [37, 0], [40, 0],
        [53, 11], [66, 23], [79, 36], [92, 50], [105, 65],
        [118, 81], [131, 99],
    ],
    "200": [
        [2, 0], [4, 0], [6, 0], [8, 0], [10, 0],
        [13, 0], [16, 0], [19, 0], [22, 0], [25, 0],
        [28, 0], [31, 0], [34, 0], [37, 0], [40, 0],
        [55, 14], [70, 29], [85, 45], [100, 62], [115, 80],
        [130, 99], [145, 122],
    ],
    "tyrant": [
        [22, 0], [44, 0], [66, 0], [88, 0], [110, 0],
        [110, 8], [110, 17], [110, 27], [110, 38], [110, 50],
        [110, 63], [110, 77], [110, 92], [110, 108], [110, 125],
    ],
    "gloves": [
        [0, 0], [0, 0], [0, 0], [0, 0], [0, 1], 
        [0, 1], [0, 2], [0, 2], [0, 3], [0, 3], 
        [0, 4], [0, 4], [0, 5], [0, 6], [0, 7], 
        [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], 
        [0, 7], [0, 7], 
    ]
};
function ChangeEquipType() {
    const equip_type = document.getElementById('equip_type').value;
    const scroll_ags = document.getElementById('scroll_ags');
    const scroll_ss = document.getElementById('scroll_ss');
    if (equip_type === "150" || equip_type === "140") {
        scroll_ags.disabled = false;
    } else {
        scroll_ags.disabled = true;
        scroll_ss.checked = true;
    }
    ChangeStar();
}
function ChangeStar() {
    const star = document.getElementById('star');
    const star_val = parseInt(star.value);
    const equip_type = document.getElementById('equip_type').value;
    const max_threshold = 22;
    const min_threshold = 0;
    if (equip_type === "tyrant") {
        max_threshold = 15;
    }
    if (star_val > max_threshold) {
        star.value = max_threshold;
    } else if (star_val < min_threshold) {
        star.value = min_threshold;
    }
}
function AddSign(num) {
    if (num < 0) {
        return String(num);
    } else {
        return '+' + String(num);
    }
}
function Calculate() {
    const star = parseInt(document.getElementById('star').value)-1;
    const equip_type = document.getElementById('equip_type').value;
    const is_tyrant = equip_type == "tyrant";
    const ug = parseInt(document.getElementById('ug').value);
    const scroll_type = document.getElementById('scroll').scroll.value;
    const is_glove = document.getElementById('equip_subtype').equip_subtype.value == "gloves";
    const is_shoulder = document.getElementById('equip_subtype').equip_subtype.value == "shoulder";
    let stat = parseInt(document.getElementById('stat').value);
    let atk = parseInt(document.getElementById('atk').value);

    if (star > 0) {
        stat -= sf_tab[equip_type][star][0];
        atk -= sf_tab[equip_type][star][1];
        if (!is_tyrant && is_glove) {
            stat -= sf_tab["gloves"][star][0];
            atk -= sf_tab["gloves"][star][1];
        }
    }
    if (ug > 0) {
        if (scroll_type === "SS") {
            if (is_glove) {
                atk -= 4 * ug;
            } else {
                stat -= 9 * ug;
            }
            if (is_shoulder) {
                if (ug >= 4) {
                    atk--;
                }
            }
        } else if (scroll_type === "AGS") {
            atk -= 4 * ug;
            stat -= 3 * ug;
        }
    }

    let text = "<p>" + scroll_type + "埋めとの比較： Main stats " + AddSign(stat) + ", ATK " + AddSign(atk) + "</p><br>Mchaos候補";
    let begin = Math.round(atk / 9);
    if (scroll_type === "SS") {
        if (is_glove) {
            atk += begin * 4;
        } else {
            stat += begin * 9;
        }
    } else if (scroll_type === "AGS") {
        atk += begin * 4;
        stat += begin * 3;
    }
    for (let i = 0; i < 3; i++) {
        let n = begin + i;
        if (n > ug) {
            break;
        }
        text += "<p>" + n + " slot： Main stats " + AddSign(stat) + ", ATK " + AddSign(atk) + "</p>";
        if (scroll_type === "SS") {
            if (is_glove) {
                atk += 4;
            } else {
                stat += 9;
            }
        } else if (scroll_type === "AGS") {
            atk += 4;
            stat += 3;
        }
    }
    let result = document.getElementById('result');
    result.innerHTML = text;
}