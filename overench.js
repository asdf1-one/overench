// 43個
const enchants = [
  "aqua_affinity",
  "binding_curse",
  "bane_of_arthropods",
  "blast_protection",
  "breach",
  "channeling",
  "density",
  "depth_strider",
  "efficiency",
  "feather_falling",
  "fire_aspect",
  "fire_protection",
  "flame",
  "fortune",
  "frost_walker",
  "impaling",
  "infinity",
  "knockback",
  "looting",
  "loyalty",
  "luck_of_the_sea",
  "lunge",
  "lure",
  "mending",
  "multishot",
  "piercing",
  "power",
  "projectile_protection",
  "protection",
  "punch",
  "quick_charge",
  "respiration",
  "riptide",
  "sharpness",
  "silk_touch",
  "smite",
  "soul_speed",
  "sweeping_edge",
  "swift_sneak",
  "thorns",
  "unbreaking",
  "vanishing_curse",
  "wind_burst",
]

function seisei() {
  const id = document.getElementById("id").value;
  
  // id入力しろ
  if (id === "") {
    document.getElementById("error").textContent = "idを入力してください";
    return;
  }
  const count = document.getElementById("count").value;

  // 個数が小さすぎるわボケ
  if (count !== "") {
    if (parseInt(count) < 1) {
      document.getElementById("error").textContent = "個数は1以上にしてください";
      return;
    }
  }

  // e
  if (count.includes("e") || count.includes("E")) {
    document.getElementById("error").textContent = "個数が変です eは使用できません";
    return;
  }

  // 小数
  if (count.includes(".")) {
    document.getElementById("error").textContent = "個数は整数で入力してください";
    return;
  }

  const name = document.getElementById("name").value;
  let cmdcount;
  // 個数1省略
  if (["1", ""].includes(count)) {
    cmdcount = "";
  } else {
    cmdcount = parseInt(count);
  }

  let components = [];
  // 名前追加
  if (name !== "") components.push(`item_name="${name}"`);

  // エンチャント追加
  let cmdenchjson = "{";
  for (let i = 0; i < enchants.length; i++) {
    cmdenchjson += `${enchants[i]}:255`;
    if (i < enchants.length - 1) cmdenchjson += ",";
  }
  cmdenchjson += "}";

  components.push(`enchantments=${cmdenchjson}`);

  // コンポーネントをコマンド用に変換
  let cmdcomponents = "";
  if (components.length >= 1) {
    cmdcomponents = `[${components.join(",")}]`;
  } else {
    cmdcomponents = "";
  }
  
  // 合成して生成
  const result = `/give @p ${id}${cmdcomponents} ${cmdcount}`;

  // 更新
  document.getElementById("result").textContent = result;
  document.getElementById("error").textContent = "生成しました";
  document.getElementById("counter").textContent = `${result.length}文字`;
}

function copyresult() {
  const result = document.getElementById("result").textContent;
  if (result === "") {
    document.getElementById("error").textContent = "コピーできません";
    return;
  }
  navigator.clipboard.writeText(result).then(() => {
    document.getElementById("error").textContent = "出力をコピーしました";
  }).catch((err) => {
    document.getElementById("error").textContent = "コピーに失敗しました: " + err;
  });
}

function copycmdblock() {
  navigator.clipboard.writeText("/give @p command_block").then(() => {
    document.getElementById("error").textContent = "コマンドをコピーしました";
  }).catch((err) => {
    document.getElementById("error").textContent = "コピーに失敗しました: " + err;
  });
}

document.getElementById("count").addEventListener("input", e => {
  let v = Number(e.target.value);

  if (v < 1) e.target.value = 1;
  if (v > 9999) e.target.value = 9999;
});
