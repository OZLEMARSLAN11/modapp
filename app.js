import { modlar } from "./veri.js";

function UIGöster() {
  // state değişkenleri oluşturuluyor
  let premiumKullanici = false;
  let calmaListesi = [];

  // modlar dizisindeki her bir mod için aşağıdaki işlemler yapılacak
  const kokEleman = document.querySelector("#root");
  const baslikElemani = document.createElement("h1");
  const modListesiElemani = document.createElement("div");
  modListesiElemani.id = "mod-listesi";

  baslikElemani.textContent = "ModApp v.1.0.0";
  kokEleman.append(baslikElemani);
  kokEleman.append(modListesiElemani);

  const bodyElemani = document.querySelector("body");
  const calmaListesiElemani = document.createElement("div");
  calmaListesiElemani.id = "calma-listesi";
  bodyElemani.append(calmaListesiElemani);

  modlar.forEach((mod) => {
    // mod resmi ve ismi için div oluşturuldu

    const modElemani = document.createElement("div");
    modElemani.className = "mod";

    // mod ismi için h2 oluşturuldu

    const modAdiElemani = document.createElement("h2");
    modListesiElemani.append(modElemani);
    modElemani.append(modAdiElemani);
    modAdiElemani.textContent = mod.modAdi;

    // mod resmi için img oluşturuldu

    const modGorselElemani = document.createElement("img");
    modGorselElemani.src = `./img/${mod.modAdi}.jpg`;
    modElemani.append(modGorselElemani);

    // ses dosyası için audio oluşturuldu
    const sesElemani = document.createElement("audio");
    sesElemani.src = `./audio/${mod.modAdi}-sound.mp3`;
    sesElemani.loop = true; // sesin sürekli çalması sağlandı

    // mod resmine tıklanınca müziği başlatması sağlandı
    modElemani.addEventListener("click", () => {
      if (sesElemani.paused) {
        sesElemani.play();
        modElemani.classList.add("aktif-mod"); // Mod div elemanına .aktif-mod css classı ekleniyor.
        calmaListesi.push(mod.modAdi); // Çalma listesine modun adı ekleniyor.
        
      } else {
        sesElemani.pause();
        modElemani.classList.remove("aktif-mod"); // Mod div elemanından .aktif-mod css classı kaldırılıyor.
        calmaListesi = calmaListesi.filter((calinanMod) => calinanMod !== mod.modAdi); // Çalma listesinden modun adı çıkarılıyor.
      }
      calmaListesiGoster(calmaListesi); 
    //   console.log(calmaListesi); 
    });
  });
}

UIGöster();


    function calmaListesiGoster(calmaListesi) {
        const calmaListesiElemani = document.querySelector("#calma-listesi");
        calmaListesiElemani.innerHTML = ""; // Çalma listesi elemanının içeriği temizleniyor.
        calmaListesi.forEach((calinanMod) => {
            const calinanModElemani = document.createElement("p"); // Çalma listesi elemanı için p elemanı oluşturuluyor.
            calinanModElemani.textContent = calinanMod; // Çalınan modun adı p elemanına ekleniyor.
            calmaListesiElemani.append(calinanModElemani); // Çalma listesi elemanına p elemanı ekleniyor.
        });
    
        const toplamModElemani = document.createElement("p"); 
        toplamModElemani.className = "mod-sayisi";
        toplamModElemani.textContent = calmaListesi.length + " mod çalıyor."; 
        calmaListesiElemani.append(toplamModElemani);
    }

