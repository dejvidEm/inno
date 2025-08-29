import { Footer } from "@/components/client-page"
import { SharedHeader } from "@/components/shared-header"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <SharedHeader />
      <main className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="w-full max-w-3xl text-left space-y-8">
          <h1 className="text-4xl font-bold mt-20 mb-4">Zásady ochrany osobných údajov</h1>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Informácie o spracúvaní osobných údajov</h2>
            <p>
              podľa čl. 13 a 14 Nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 z 27. apríla 2016 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto údajov, ktorým sa zrušuje smernica 95/46/ES („Nariadenie“), určené pre Vás ako tzv. dotknuté osoby, ktorých osobné údaje získavame a spracúvame ako tzv. prevádzkovateľ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Prevádzkovateľ, kontaktné údaje</h2>
            <p>
              Prevádzkovateľom je spoločnosť <strong>RYCAS ACADEMY s. r. o.</strong> so sídlom Doležalova 3424/15C, Bratislava - mestská časť Ružinov, 821 04, Vložka č.: 148711/B, („Prevádzkovateľ“).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Osobné údaje, ktoré sú predmetom spracúvania</h2>
            <p>Spracúvame nasledujúce kategórie Vašich osobných údajov:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>identifikačné údaje (napríklad meno, priezvisko)</li>
              <li>kontaktné údaje (napríklad doručovacia adresa, fakturačná adresa, emailová adresa, telefónne číslo)</li>
              <li>demografické údaje (napríklad pohlavie, dátum narodenia)</li>
              <li>platobné údaje o Vašich objednávkach (napríklad zoznam nakúpeného tovaru, preferovaný spôsob doručenia tovaru, preferovaný spôsob platby za tovar, údaje o reklamácií tovaru)</li>
              <li>nastavenia Vášho účtu a využívanie funkcionalít našich webových stránok (napríklad heslo, zoznam obľúbeného tovaru, odoberanie noviniek, sledovanie vypredaného tovaru, hodnotenia a recenzie)</li>
              <li>údaje o Vašom správaní na našich webových stránkach (napríklad dátum a čas prístupu, informácie o Vašom internetovom prehliadači, IP adrese, operačnom systéme)</li>
              <li>informácie získané prostredníctvom tzv. súborov cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Účely a právne základy spracúvania osobných údajov</h2>
            <p>Vaše osobné údaje spracúvame obvykle na nasledujúce účely a na základe nasledujúcich právnych základov:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1 text-left">Účel spracúvania</th>
                    <th className="border px-2 py-1 text-left">Právny základ spracúvania</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">Vybavenie Vašej objednávky, resp. plnenie zmluvy uzavretej medzi Vami a Prevádzkovateľom</td>
                    <td className="border px-2 py-1">spracúvanie je nevyhnutné na plnenie zmluvy uzavretej medzi Vami a Prevádzkovateľom alebo na vykonanie opatrení pred uzatvorením zmluvy na základe Vašej žiadosti (predzmluvné vzťahy) v zmysle čl. 6 ods. 1 písm. b) Nariadenia</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Spotrebiteľské súťaže</td>
                    <td className="border px-2 py-1">k spracúvaniu dochádza na základe Vášho súhlasu so spracúvaním osobných údajov v zmysle čl. 6 ods. 1 písm. a) Nariadenia</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Marketingová propagácia a komunikácia</td>
                    <td className="border px-2 py-1">spracúvanie je nevyhnutné na účely oprávnených záujmov, ktoré sleduje Prevádzkovateľ v zmysle čl. 6 ods. 1 písm. f) Nariadenia; v odôvodnených prípadoch, napríklad ak ste si od nás doposiaľ žiaden neobjednali tovar ani nie ste registrovaným užívateľom, dochádza k spracúvaniu na základe Vášho súhlasu so spracúvaním osobných údajov v zmysle čl. 6 ods. 1 písm. a) Nariadenia</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Užívateľské nastavenia a funkcionality našich webových stránok</td>
                    <td className="border px-2 py-1">spracúvanie je nevyhnutné na účely oprávnených záujmov, ktoré sleduje Prevádzkovateľ v zmysle čl. 6 ods. 1 písm. f) Nariadenia; v odôvodnených prípadoch, dochádza k spracúvaniu na základe Vášho súhlasu so spracúvaním osobných údajov v zmysle čl. 6 ods. 1 písm. a) Nariadenia</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Plnenie povinností vyplývajúcich z právnych predpisov</td>
                    <td className="border px-2 py-1">spracúvanie je nevyhnutné na splnenie zákonných povinností Prevádzkovateľa v zmysle čl. 6 ods. 1 písm. c) Nariadenia</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Preukazovanie, uplatňovanie a obhajovanie právnych nárokov</td>
                    <td className="border px-2 py-1">spracúvanie je nevyhnutné na účely oprávnených záujmov, ktoré sleduje Prevádzkovateľ v zmysle čl. 6 ods. 1 písm. f) Nariadenia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Oprávnené záujmy</h2>
            <p>
              Oprávnené záujmy Prevádzkovateľa alebo oprávnené záujmy tretej strany na spracúvaní Vašich osobných údajov spočívajú obvykle vo využití osobných údajov na účely marketingovej komunikácie, propagácie a prezentácie Prevádzkovateľa a ním ponúkaného tovaru, na účely umožnenia využitia funkcionalít Vášho účtu a webových stránkok Prevádzkovateľa a na účely uplatňovania (žalovania), vymáhania alebo ochrany práv, oprávnených záujmov a nárokov Prevádzkovateľa alebo tretích strán.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Doba uchovávania osobných údajov</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>ak sa osobné údaje spracúvajú z dôvodu splnenia povinnosti vyplývajúcej zo zákona – po dobu vyžadovanú príslušným zákonom</li>
              <li>ak sa osobné údaje spracúvajú z dôvodu plnenia zmluvy – po dobu plnenia zmluvy (vrátane predzmluvných rokovaní) a počas doby, po ktorú je možné uplatňovať (žalovať), preukazovať alebo obhajovať práva a nároky zo zmluvy alebo súvisiace so zmluvou</li>
              <li>ak sa osobné údaje spracúvajú z dôvodu oprávnených záujmov, ktoré sleduje Prevádzkovateľ alebo tretia strana – po dobu trvania príslušného oprávneného záujmu a počas doby, po ktorú je možné uplatňovať (žalovať), preukazovať alebo obhajovať práva a nároky z oprávneného záujmu alebo súvisiace s oprávneným záujmom</li>
              <li>ak sa osobné údaje spracúvajú na základe súhlasu – po dobu, na ktorú bol súhlas udelený alebo do času odvolania súhlasu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Príjemcovia osobných údajov</h2>
            <p>Neposkytujeme Vaše osobné údaje tretím stranám okrem prípadov, ak ste udelili súhlas na sprístupnenie svojich osobných údajov tretej strane alebo existuje iný právny základ na poskytnutie Vašich osobných údajov tretej strane, napríklad, ak ide o splnenie zákonnej povinnosti Prevádzkovateľa, alebo ak je poskytnutie osobných údajov nevyhnutné na účely splnenia zmluvy s dotknutou osobou, alebo ak je poskytnutie osobných údajov nevyhnutné na účely ochrany oprávnených záujmov Prevádzkovateľa spočívajúcich napríklad v uplatňovaní (žalovaní), vymáhaní alebo obrane právnych nárokov Prevádzkovateľa.</p>
            <p>V uvedených prípadoch môžu byť osobné údaje dotknutej osoby poskytnuté najmä nasledujúcim príjemcom alebo kategóriám príjemcov:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>zmluvní partneri (napríklad dodávatelia tovaru, poskytovatelia služieb)</li>
              <li>sprostredkovatelia, ktorí spracúvajú osobné údaje v mene Prevádzkovateľa</li>
              <li>spoloční prevádzkovatelia, ktorí spracúvajú osobné údaje spolu s Prevádzkovateľom (napríklad spoločnosť Facebook Ireland Limited alebo Google Ireland Limited)</li>
              <li>súdy, orgány štátnej správy a samosprávy, verejnoprávne inštitúcie, orgány činné v trestnom konaní, daňové úrady, colné úrady a orgány finančnej správy, notárske úrady, exekútorské úrady</li>
              <li>kontrolné a dozorné orgány</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Prenos osobných údajov do tretích krajín</h2>
            <p>V rámci spracúvania Vašich osobných údajov nedochádza k ich prenosu do tretích krajín mimo územie Európskej únie, ani do medzinárodných organizácií.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Vaše práva v súvislosti so spracúvaním osobných údajov</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Právo na prístup k údajom:</strong> Dotknutá osoba má právo získať od Prevádzkovateľa potvrdenie o tom, či sa spracúvajú osobné údaje, ktoré sa jej týkajú, a ak tomu tak je, má právo získať prístup k týmto osobným údajom a dodatočné informácie vyplývajúce z čl. 15 Nariadenia.</li>
              <li><strong>Právo na opravu údajov:</strong> Dotknutá osoba má právo požadovať, aby Prevádzkovateľ bez zbytočného odkladu opravil jej nesprávne osobné údaje a/alebo aby boli jej osobné údaje doplnené.</li>
              <li><strong>Právo na vymazanie osobných údajov:</strong> Dotknutá osoba má právo požadovať, aby Prevádzkovateľ bez zbytočné odkladu vymazal jej osobné údaje, ak budú splnené podmienky čl. 17 Nariadenia (napr. pominul účel, na ktorý sa osobné údaje spracúvali; bol odvolaný súhlas so spracúvaním osobných údajov a neexistuje iný právny základ pre spracúvanie osobných údajov).</li>
              <li><strong>Právo na obmedzenie spracúvania osobných údajov:</strong> Dotknutá osoba má právo domáhať sa obmedzenia spracúvania jej osobných údajov, ak budú splnené podmienky čl. 18 Nariadenia (napr. dotknutá osoba napadne správnosť osobných údajov; spracúvanie osobných údajov by bolo protizákonné; Prevádzkovateľ už nepotrebuje osobné údaje na účely spracúvania, ale potrebuje ich dotknutá osoba na preukázanie, uplatňovanie alebo obhajovanie právnych nárokov).</li>
              <li><strong>Právo namietať voči spracúvaniu osobných údajov:</strong> Dotknutá osoba má právo kedykoľvek namietať z dôvodov týkajúcich sa jej konkrétnej situácie voči spracúvaniu osobných údajov, ktoré Prevádzkovateľ vykonáva z dôvodu plnenia úlohy realizovanej vo verejnom záujme alebo pri výkone verejnej moci zverenej Prevádzkovateľovi alebo ak je spracúvanie vykonávané na základe oprávneného záujmu Prevádzkovateľa alebo tretej strany, vrátane namietania proti s tým súvisiacemu profilovaniu. Dotknutá osoba má tiež právo namietať voči spracúvaniu osobných údajov na účely priameho marketingu vrátane profilovania v rozsahu, v akom súvisí s takýmto priamym marketingom.</li>
              <li><strong>Právo na prenosnosť údajov:</strong> Dotknutá osoba má právo získať od Prevádzkovateľa osobné údaje, ktoré mu poskytla, a to v štruktúrovanom, bežne používanom a strojovo čitateľnom formáte. Takto získané osobné údaje má dotknutá osoba právo preniesť ďalšiemu prevádzkovateľovi bez toho, aby jej v tom Prevádzkovateľ bránil. Takáto prenosnosť osobných údajov je možná, ak sa osobné údaje dotknutej osoby spracúvali na základe poskytnutého súhlasu alebo na základe zmluvy a ak sa spracúvanie vykonávalo automatizovanými prostriedkami. Ak je to technicky možné, má dotknutá osoba právo na priamy prenos od jedného prevádzkovateľa (od Prevádzkovateľa) inému prevádzkovateľovi.</li>
              <li><strong>Právo odvolať súhlas so spracúvaním:</strong> Ak sú osobné údaje spracúvané na základe súhlasu dotknutej osoby, je dotknutá osoba oprávnená tento súhlas kedykoľvek odvolať. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania osobných údajov dotknutej osoby pred odvolaním tohto súhlasu.</li>
            </ul>
            <p>Ak sa dotknutá osoba rozhodne uplatniť niektoré z vyššie uvedených práv voči Prevádzkovateľovi v súvislosti so spracúvaním jej osobných údajov, môže tak urobiť písomne na adrese sídla Prevádzkovateľa alebo elektronicky na emailovej adrese: <a href="mailto:innomenstudio@gmail.com" className="text-blue-600 underline">innomenstudio@gmail.com</a></p>
            <p>Dotknutá osoba má právo podať sťažnosť dozornému orgánu príslušnému na dohľad nad spracúvaním osobných údajov. Na území Slovenskej republiky je týmto orgánom Úrad na ochranu osobných údajov Slovenskej republiky, so sídlom Hraničná 4826/12, 820 07 Bratislava.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Povinnosť/dobrovoľnosť poskytnúť osobné údaje</h2>
            <p>Ak Prevádzkovateľ spracúva Vaše osobné údaje z dôvodu splnenia zákonnej povinnosti, ste povinný takéto údaje Prevádzkovateľovi poskytnúť.</p>
            <p>Pokiaľ je poskytnutie osobných údajov zmluvnou požiadavkou alebo požiadavkou, ktorá je potrebná na uzavretie zmluvy medzi Vami a Prevádzkovateľom, je poskytnutie osobných údajov dobrovoľné.</p>
            <p>Ak odmietnete Prevádzkovateľovi poskytnúť osobné údaje požadované na základe právnych predpisov alebo osobné údaje, ktoré sú potrebné na uzavretie a plnenie zmluvy alebo na vykonanie požadovaného úkonu, Prevádzkovateľ má právo odmietnuť vstúpiť do zmluvného vzťahu s Vami alebo vykonať požadovaný úkon.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Automatizované rozhodovanie/profilovanie</h2>
            <p>Prevádzkovateľ nevyužíva rozhodovanie založené na automatizovanom spracúvaní Vašich osobných údajov vrátane profilovania, ktoré by malo právne účinky, ktoré sa Vás týkajú alebo inak významne ovplyvňujú.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Zdroje osobných údajov</h2>
            <p>Prevádzkovateľ získava osobné údaje v prvom rade od Vás ako dotknutých osôb (priamo alebo prostredníctvom sprostredkovateľov, ktorí osobné údaje spracúvajú v mene a na základe pokynov Prevádzkovateľa). Prevádzkovateľ môže získavať Vaše osobné údaje taktiež z verejných prístupných zdrojov a registrov, alebo od tretích osôb, a to predovšetkým v súvislosti s uzavretím alebo plnením zmluvy s Prevádzkovateľom.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Cookies</h2>
            <h3 className="text-lg font-semibold mt-4 mb-1">Čo sú cookies?</h3>
            <p>Cookies sú malé zašifrované textové súbory, ktoré sa ukladajú vo Vašom počítači alebo na inom zariadení, ktoré používate pri návšteve webových stránok. Cookies sú prostredníctvom webových stránok zasielané a ukladané vo Vášom prehliadači. Keď webové stránky navštívite znova, Váš prehliadač odošle cookies späť na našu webovú stránku, takže Vaše zariadenie je možné rozpoznať a vďaka tomu prispôsobiť webové stránky podľa Vašich preferencií.</p>
            <h3 className="text-lg font-semibold mt-4 mb-1">Aké cookies používame?</h3>
            <p>Cookies, ktoré používame nám okrem zabezpečenia základnej funkcionality našich webových stránok umožňujú najmä rozpoznať Vás pri prihlasovaní do užívateľského prostredia, zapamätať si Vašu predchádzajúcu voľbu pri otváraní nového okna, najmä obsah nákupného košíka, merať návštevnosť našej webovej stránky a analyzovať spôsob jej využívania, prepojiť Vás so sociálnymi sieťami, vrátane automatického prihlásenia do sociálnych sietí, ako aj prispôsobiť obsah našej reklamy zobrazovanej na webových stránkach a sociálnych sieťach tretích osôb.</p>
            <p>Konkrétne používame nasledovné cookies:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Základné cookies.</strong> Tieto sú nevyhnutné na fungovanie našich webových stránok. Na používanie týchto cookies sa Váš súhlas nevyžaduje.</li>
              <li><strong>Funkčné cookies.</strong> Tieto sú dôležité, avšak nie nevyhnutné pre fungovanie našich webových stránok.  Na používanie týchto cookies sa vyžaduje Váš súhlas. V prípade jeho neudelenia naše webové stránky nemusia fungovať správne.</li>
              <li><strong>Výkonnostné cookies.</strong> Tieto cookies nám umožňujú merať a neustále zlepšovať výkonnosť našich webových stránok a poskytovať Vám tak čo najzaujímavejší obsah. Na používanie týchto cookies sa vyžaduje Váš súhlas.</li>
              <li><strong>Marketingové cookies.</strong> Tieto cookies nám pomáhajú zamerať sa konkrétne na Vás a zabezpečiť Vám tak čo najrelevantnejšiu reklamu. Na používanie týchto cookies sa vyžaduje Váš súhlas.</li>
              <li><strong>Cookies tretích strán.</strong> Prostredníctvom našich webových stránok môžu byť do Vášho zariadenia ukladané cookies prevádzkovateľov marketingových nástrojov, ktoré na našich stránkach používame, prípadne môžeme s týmito prevádzkovateľmi zdieľať informácie, ktoré nám boli pomocou cookies poskytnuté. Cookies používané tretími stranami a spôsob použitia údajov získaných prostredníctvom nich sa riadi zásadami ochrany osobných údajov príslušných tretích strán. Súhlas s používaním týchto cookies udeľujete na našich webových stránkach.</li>
            </ul>
            <p>Naše webové stránky využívajú na marketingové účely aj reklamné a tzv. affiliate systémy zabezpečované prostredníctvom [Facebook, Heureka, Google AdWords, …]. Ak kliknete na odkaz alebo banner na stránkach niektorého z našich reklamných alebo affiliate partnerov, tento odkaz Vás privedie na naše webové stránky a uloží do Vášho zariadenia cookies, ktoré rozpoznajú, že ste na naše stránky prišli práve prostredníctvom affiliate partnera. Súhlas s používaním týchto cookies udeľujete na stránkach nášho affiliate partnera.</p>
            <p>Okrem toho, naše webové stránky používajú aj tzv. sociálne pluginy, ktoré sú na našich webových stránkach označené logami. Keď navštívite našu webovú stránku, Váš prehliadač vytvorí priame spojenie so servermi, na ktorých sa tieto pluginy spúšťajú. Obsah pluginov je prenesený priamo do Vášho prehliadača, ktorý ho potom integruje na naše webové stránky. Integrácia pluginov spôsobuje, že sociálny plugin dostane informácie, ktoré ste sprístupnili na našich webových stránkach. Pokiaľ budete prihlásený do sociálnych sietí, bude možné priradiť Vašu návštevu k Vášmu účtu v týchto sociálnych sieťach. Ak nechcete, aby sociálne siete zhromažďovali údaje o Vás prostredníctvom našich webových stránok, musíte sa pred tým, než navštívite naše webové stránky, zo sociálnych sietí odhlásiť.</p>
            <h3 className="text-lg font-semibold mt-4 mb-1">Ako môžete udeliť alebo odvolať súhlas s používaním cookies?</h3>
            <p>Pri návšteve našich webových stránok Vás informujeme o používaní cookies prostredníctvom bannera umiestneného v dolnej časti našej webovej stránky. Nastavením Vášho webového prehliadača môžete kedykoľvek udeliť alebo odvolať už udelený súhlas s používaním cookies – v zmysle § 55 ods. 5 Zákona č. 351/2011 Z. z. o elektronických komunikáciách sa za súhlas s používaním cookies považuje nastavenie Vášho webového prehliadača.</p>
            <p>Váš webový prehliadač môžete taktiež nastaviť tak, aby ukladanie cookies do Vášho zariadenia blokoval. Tiež je možné zablokovať alebo povoliť ukladanie cookies len pre určité webové stránky. Cookies, ktoré už sú vo Vašom zariadení uložené, potom môžete kedykoľvek zmazať.</p>
            <p>Konkrétny postup pre najpoužívanejšie webové prehliadače nájdete tu:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Chrome</li>
              <li>Safari</li>
              <li>Mozilla</li>
              <li>Internet Explorer</li>
              <li>Android</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Zmeny pravidiel, aktuálne znenie</h2>
            <p>Prevádzkovateľ môže z času na čas zmeniť alebo upraviť tieto informácie o spracúvaní osobných údajov, najmä za účelom ich zosúladenia v prípade zmien príslušných právnych predpisov alebo zapracovania zmien účelov, právnych základov alebo prostriedkov spracúvania osobných údajov. Aktuálne znenie týchto informácií (vrátane akýchkoľvek vykonaných zmien) je dostupné na webovej stránke Prevádzkovateľa <a href="https://www.innostudio.sk" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.innostudio.sk</a>, ako aj v papierovej podobe na adrese sídla Prevádzkovateľa.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 