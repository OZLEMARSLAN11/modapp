import { modlar } from "./veri.js";

function UIGoster() {
    // state değişkenleri oluşturuluyor.
    let premiumKullanici = false;
    let calmaListesi = [];

    const kokEleman = document.querySelector("#root");
    const baslikElemani = document.createElement("h1");
    const filtreElemani = document.createElement("button");
    const modListesiElemani = document.createElement("div");
    modListesiElemani.id = "mod-listesi";
    filtreElemani.textContent = "Filtrele";
    baslikElemani.textContent = "ModApp v.1.0.0";

    kokEleman.append(baslikElemani);
    kokEleman.append(filtreElemani);
    kokEleman.append(modListesiElemani);

    const bodyElemani = document.querySelector("body");
    const calmaListesiElemani = document.createElement("div");
    calmaListesiElemani.id = "calma-listesi";
    bodyElemani.append(calmaListesiElemani);

    modListesiGoster(modListesiElemani, calmaListesi);
}


UIGoster();


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

function modListesiGoster(modListesiElemani, calmaListesi) {

    modlar.forEach((mod) => {
        // Mod resmi ve ismi için div elemanı oluşturuluyor.
        const modElemani = document.createElement("div");
        modElemani.className = "mod";
        modListesiElemani.append(modElemani);
    
        // Mod ismi için h2 elemanı oluşturuluyor.
        const modAdiElemani = document.createElement("h2");
        modAdiElemani.textContent = mod.modAdi;
        modElemani.append(modAdiElemani);
    
        // Mod resmi için img elemanı oluşturuluyor.
        const modGorselElemani = document.createElement("img");
        modGorselElemani.src = `./img/${mod.modAdi}.jpg`;
        modElemani.append(modGorselElemani);
    
        // Mod sesi için audio elemanı oluşturuluyor.
        const sesElemani = document.createElement("audio");
        sesElemani.src = `./audio/${mod.modAdi}-sound.mp3`;
        sesElemani.loop = true; // Sesi sürekli çalması için loop özelliği ekleniyor.
    
        // Mod div elemanı için tıklama olayı ekleniyor.
        modElemani.addEventListener("click", () => {
            if (sesElemani.paused) {
                sesElemani.play();
                modElemani.classList.add("aktif-mod"); // Mod div elemanına .aktif-mod css classı ekleniyor.
                calmaListesi.push(mod.modAdi); // Çalma listesine mod adı ekleniyor.                
            } else {
                sesElemani.pause();
                modElemani.classList.remove("aktif-mod"); // Mod div elemanından .aktif-mod css classı kaldırılıyor.
                calmaListesi = calmaListesi.filter((calinanMod) => calinanMod !== mod.modAdi); // Çalma listesinden mod adı çıkarılıyor.                
            }

            calmaListesiGoster(calmaListesi);
            // console.log(calmaListesi);
        });
    });

}